import React, { useEffect, useState } from 'react';

// Components
import YoutubeVideo from './YoutubeVideo';
import { bemClass, getBemModifier, getFrameFromTimestamp } from '../../utils';
import Avatar from '../Avatar';

function LineDistribution({ playerRef, members, bars, lyrics, framerate = 30 }) {
  const [intervalId, setIntervalId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRank, setCurrentRank] = useState(bars[0]);

  useEffect(() => {
    setCurrentRank(bars[0]);
  }, [bars]);

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

    if (currentTime < 0.5 || !currentRank) {
      setCurrentRank(bars[0]);
    }

    if (bars[frameIndex]) {
      setCurrentRank(bars[frameIndex]);
    }
  }, [currentRank, currentTime, bars, framerate]);

  return (
    <section className="line-distribution__container">
      <YoutubeVideo
        playerRef={playerRef}
        width="320"
        height="180"
        className="line-distribution__video"
        onStateChange={onStateChange}
      />
      <RankingBars members={members} currentRank={currentRank} />
      <LyricsScroller currentTime={currentTime} lyrics={lyrics} />
    </section>
  );
}

function RankingBars({ members, currentRank }) {
  return (
    <ul className="line-distribution__live-ranking">
      {members?.map((member) => (
        <RankEntry key={`rank-entry-${member.key}`} member={member} rank={currentRank[member.key]} />
      ))}
    </ul>
  );
}

function RankEntry({ member, rank }) {
  const onClass = getBemModifier(rank.on, 'active');

  return (
    <li className={bemClass('rank-entry', onClass, rank.position)}>
      <Avatar
        name={member.name}
        className="rank-entry__avatar"
        style={{ borderColor: member.color ?? 'black' }}
      />
      <div className="rank-entry__name">{member.name}</div>
      <div className="rank-entry__progress">
        <span
          className="rank-entry__progress-bar"
          style={{ width: `${rank.percentage}%`, backgroundColor: rank.on ? member.color : 'white' }}
        />
      </div>
      <div className="rank-entry__timestamp">{rank.value}s</div>
    </li>
  );
}

function LyricsScroller({ currentTime, lyrics }) {
  // console.log({ currentTime });
  // console.log({ lyrics });
  return (
    <div className="line-distribution__live-lyrics">
      <p>Lyrics will come here.</p>
    </div>
  );
}

export default LineDistribution;
