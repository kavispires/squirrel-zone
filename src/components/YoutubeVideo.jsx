import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// State
import useDistributorState from '../states/useDistributorState';

function YoutubeVideo({
  className = '',
  height = 180,
  onStateChange = () => {},
  playerRef,
  videoId,
  width = 320,
}) {
  const [videoIdFromState] = useDistributorState('videoId');
  const [, setIsRecording] = useDistributorState('isRecording');
  const [, setIsPlaying] = useDistributorState('isPlaying');
  const [, setHasEnded] = useDistributorState('hasEnded');

  const youtubeId = videoId ?? videoIdFromState;

  const videoOptions = {
    height,
    width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onReady = (e) => {
    setHasEnded(false);
  };

  const onPlay = (e) => {
    setHasEnded(false);
    setIsPlaying(true);
  };

  const onPause = (e) => {
    setIsPlaying(false);
  };

  const onEnd = (e) => {
    setIsRecording(false);
    setIsPlaying(false);
    setHasEnded(true);
  };

  const onPlaybackRateChange = (e) => {
    console.log('onPlaybackRateChange', e);
  };

  return (
    <YouTube
      videoId={youtubeId}
      id={youtubeId}
      key={youtubeId}
      className="video"
      containerClassName={className}
      opts={videoOptions}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onEnd={onEnd}
      onStateChange={onStateChange}
      onPlaybackRateChange={onPlaybackRateChange}
      // onError={func}                    // defaults -> noop
      // onPlaybackQualityChange={func}    // defaults -> noop
      ref={playerRef}
    />
  );
}

YoutubeVideo.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  onStateChange: PropTypes.func,
  playerRef: PropTypes.any,
  videoId: PropTypes.string,
  width: PropTypes.number,
};

YoutubeVideo.defaultProps = {
  className: '',
  height: 180,
  onStateChange: () => {},
  width: 320,
};

export default YoutubeVideo;
