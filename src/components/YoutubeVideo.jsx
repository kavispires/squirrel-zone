import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// State
import useDistributorState from '../states/useDistributorState';

function YoutubeVideo({
  className = '',
  height = '180',
  onStateChange = () => {},
  playerRef,
  videoId,
  width = '320',
}) {
  const [videoIdFromState] = useDistributorState('videoId');
  const [, setIsRecording] = useDistributorState('isRecording');
  const [, setIsPlaying] = useDistributorState('isPlaying');

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
    console.log('onReady', e);
  };

  const onPlay = (e) => {
    console.log('onPlay', e);
    setIsPlaying(true);
  };

  const onPause = (e) => {
    console.log('onPause', e);
    setIsPlaying(false);
  };

  const onEnd = (e) => {
    console.log('onEnd', e);
    setIsRecording(false);
    setIsPlaying(false);
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
  height: PropTypes.string,
  onStateChange: PropTypes.func,
  playerRef: PropTypes.any,
  videoId: PropTypes.string,
  width: PropTypes.string,
};

YoutubeVideo.defaultProps = {
  className: '',
  height: '180',
  onStateChange: () => {},
  width: '320',
};

export default YoutubeVideo;
