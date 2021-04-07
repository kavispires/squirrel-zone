import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { getFrameFromTimestamp } from '../../utils';
// Components
import YoutubeVideo from '../YoutubeVideo';
import RankingBars from './RankingBars';
import LyricsScroller from './LyricsScroller';

function AnimatedBars({ playerRef, videoId, members, bars, lyrics, framerate = 30, className = '' }) {
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
    <section className={`line-distribution__container ${className}`}>
      <YoutubeVideo
        playerRef={playerRef}
        videoId={videoId}
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

AnimatedBars.propTypes = {
  playerRef: PropTypes.any,
  videoId: PropTypes.string,
  members: PropTypes.array,
  bars: PropTypes.array,
  lyrics: PropTypes.array,
  framerate: PropTypes.number,
  className: PropTypes.string,
};

AnimatedBars.defaultValues = {
  videoId: undefined,
  framerate: 30,
  className: '',
};

export default AnimatedBars;
