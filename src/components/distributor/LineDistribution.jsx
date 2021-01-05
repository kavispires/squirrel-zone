import React, { useEffect, useState } from 'react';

// Components
import YoutubeVideo from './YoutubeVideo';
import { bemClass, getBemModifier, getFrameFromTimestamp } from '../../utils';

function LineDistribution({
  playerRef,
  playVideo,
  pauseVideo,
  seekAndPlay,
  lineDistributionData,
  framerate = 30,
}) {
  const [intervalId, setIntervalId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRank, setCurrentRank] = useState(lineDistributionData[0]);
  const [positionOrder, setPositionOrder] = useState({});

  useEffect(() => {
    setCurrentTime(lineDistributionData[0]);
  }, [lineDistributionData]);

  const onStateChange = (e) => {
    if (e.data === 1) {
      setIntervalId(
        setInterval(() => {
          setCurrentTime(e.target.getCurrentTime());
        }, 1000 / framerate)
      );
    } else {
      // Kill interval
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    // Every time change update current ranking if id exists according to framerate
    const frameIndex = getFrameFromTimestamp(currentTime * 1000, framerate);

    if (!currentRank) {
      setCurrentRank(lineDistributionData[0]);
    }

    if (lineDistributionData[frameIndex]) {
      const sortedRank = lineDistributionData[frameIndex].sort((a, b) =>
        a.value < b.value ? 1 : a.label > b.label ? 1 : -1
      );
      const sortedPositionOrder = sortedRank.reduce((acc, entry, index) => {
        acc[entry.id] = entry.value > 0 ? index : 30;
        return acc;
      }, {});
      setPositionOrder(sortedPositionOrder);
      // Sort positions

      setCurrentRank(lineDistributionData[frameIndex]);
    }
  }, [currentRank, currentTime, lineDistributionData, framerate]);

  return (
    <section className="line-distribution__container">
      <YoutubeVideo
        playerRef={playerRef}
        width="320"
        height="180"
        className="line-distribution__video"
        onStateChange={onStateChange}
      />
      <ul className="line-distribution__live-ranking">
        {currentRank?.map((entry) => (
          <RankEntry key={entry.id} entry={entry} positionOrder={positionOrder} />
        ))}
      </ul>
      <div className="line-distribution__live-lyrics">Lyrics will come here.</div>
    </section>
  );
}

function RankEntry({ entry, positionOrder }) {
  const onClass = getBemModifier(entry.on, 'active');

  return (
    <li className={bemClass('rank-entry', onClass)} style={{ order: positionOrder[entry.id] ?? 30 }}>
      <div className={'rank-entry__avatar'}>{entry.label[0]}</div>
      <div className="rank-entry__name">{entry.label}</div>
      <div className="rank-entry__progress">
        <span
          className="rank-entry__progress-bar"
          style={{ width: `${entry.percentage}%`, backgroundColor: entry.on ? entry.color : 'white' }}
        />
      </div>
      <div className="rank-entry__timestamp">{Number(entry.value / 1000).toFixed(1)}s</div>
    </li>
  );
}

export default LineDistribution;
