import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// Utils
import { getFrameFromTimestamp } from '../../utils';
// Components
import YoutubeVideo from '../YoutubeVideo';
import ViewRankingBars from './ViewRankingBars';
import ViewLyricsScroller from './ViewLyricsScroller';

const getDistributionDimensions = (resolution) => {
  const ratio = 1.777777777777778;
  const index = [1080, 720].indexOf(resolution);

  return {
    container: {
      width: resolution ? `${resolution * ratio}px` : '100%',
      height: `${resolution}px`,
      fontSize: `${[24, 16]?.[index] ?? 16}px`,
    },
    youtubeVideo: {
      width: [640, 320]?.[index] ?? 320,
      height: [360, 180]?.[index] ?? 180,
    },
    avatar: {
      size: [48, 32]?.[index] ?? 32,
      border: [4, 2]?.[index] ?? 2,
      allSize: [32, 18]?.[index] ?? 18,
    },
  };
};

function ViewAnimatedBars({
  playerRef,
  videoId,
  members,
  bars,
  lyrics,
  framerate = 30,
  className = '',
  fixedSize = null,
}) {
  const [intervalId, setIntervalId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRank, setCurrentRank] = useState(bars[0]);

  const dimensions = useMemo(() => getDistributionDimensions(fixedSize), [fixedSize]);

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
    <section className={`line-distribution__container ${className}`} style={dimensions.container}>
      <YoutubeVideo
        playerRef={playerRef}
        videoId={videoId}
        width={dimensions.youtubeVideo.width}
        height={dimensions.youtubeVideo.height}
        className="line-distribution__video"
        onStateChange={onStateChange}
      />
      <ViewRankingBars members={members} currentRank={currentRank} dimensions={dimensions} />
      <ViewLyricsScroller currentTime={currentTime} lyrics={lyrics} dimensions={dimensions} />
    </section>
  );
}

ViewAnimatedBars.propTypes = {
  bars: PropTypes.array,
  className: PropTypes.string,
  fixedSize: PropTypes.number,
  framerate: PropTypes.number,
  lyrics: PropTypes.array,
  members: PropTypes.array,
  playerRef: PropTypes.any,
  videoId: PropTypes.string,
};

ViewAnimatedBars.defaultProps = {
  videoId: undefined,
  framerate: 30,
  className: '',
};

export default ViewAnimatedBars;
