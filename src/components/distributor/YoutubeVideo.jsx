import React from 'react';
import YouTube from 'react-youtube';

// State
import useDistributorState from '../../states/useDistributorState';

function YoutubeVideo({
  playerRef,
  height = '180',
  width = '320',
  className = '',
  onStateChange = () => {},
}) {
  const [videoId] = useDistributorState('videoId');
  const [, setIsRecording] = useDistributorState('isRecording');
  const [, setIsPlaying] = useDistributorState('isPlaying');

  const videoOptions = {
    height: height ?? '180',
    width: width ?? '320',
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
      videoId={videoId}
      id={videoId}
      key={videoId}
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

export default YoutubeVideo;
