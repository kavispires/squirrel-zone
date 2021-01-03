import React, { useState } from 'react';
import YouTube from 'react-youtube';

// Design Resources
import { Button, Divider, Progress, Tooltip } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Components
import KeyCapture from './KeyCapture';
import Log from './Log';
import Controls from './Controls';
import TimestampsBank from './TimestampsBank';

function TimeAndSync({ playerRef }) {
  const [videoId] = useDistributorState('videoId');
  const [isRecording, setIsRecording] = useDistributorState('isRecording');
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');

  const [isPlaying, setIsPlaying] = useState(false);

  const videoOptions = {
    height: '180',
    width: '320',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const playVideo = () => {
    playerRef?.current?.internalPlayer?.playVideo();
    // setIsPlaying(true);
  };

  const pauseVideo = () => {
    playerRef?.current?.internalPlayer?.pauseVideo();
    // setIsPlaying(false);
  };

  const seekAndPlay = (timestamp) => {
    playerRef?.current?.internalPlayer?.seekTo(timestamp);
    playerRef?.current?.internalPlayer?.playVideo();
    // setIsPlaying(true);
  };

  const onStateChange = (e) => {
    console.log('onStateChange', e);
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

  const nextStepSongsOptions = () => {
    console.log(song.serialize());
    setStep(3);
  };

  return (
    <section className="distributor-grid time-and-sync">
      {isRecording && <KeyCapture.Keyboard videoRef={playerRef} isPlaying={isPlaying} />}

      <YouTube
        videoId={videoId}
        id={videoId}
        key={videoId}
        className="video"
        containerClassName="distributor-grid__video-container"
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

      <Controls videoRef={playerRef} playVideo={playVideo} pauseVideo={pauseVideo} />

      <TimestampsBank />

      {/* <LogCaptureContainer seekAndPlay={seekAndPlay} /> */}
      <Log seekAndPlay={seekAndPlay} className="distributor-grid__log log-full-width" />

      <div className="distributor-grid__actions">
        <Divider />
        <Tooltip title="Sections Completion Rate">
          <Progress percent={song?.relationshipsCompletion} />
        </Tooltip>
        <Divider />
        <div className="time-and-sync__action">
          <Button type="primary" disabled={!song?.relationshipsCompletion} onClick={nextStepSongsOptions}>
            Next Step: Preview
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TimeAndSync;
