import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

// Design Resources
import { Layout, Input, Button, Divider } from 'antd';
// Components
import KeyCapture from './distributor/KeyCapture';
import InstanceOptions from './distributor/InstanceOptions';
import Log from './distributor/Log';
import Controls from './distributor/Controls';
import Timeline from './distributor/Timeline';
// State
import useDistributorState from '../states/useDistributorState';
// Engine
import { Song, Section, Line, store } from '../utils/distributor';

function Distributor() {
  const [videoId, setVideoId] = useDistributorState('videoId');
  const [isRecording, setIsRecording] = useDistributorState('isRecording');
  const [, setSong] = useDistributorState('song');
  const [unassignedParts, setUnassignedParts] = useDistributorState('unassignedParts');

  const [currentLine, setCurrentLine] = useDistributorState('currentLine');
  const [, setCurrentSection] = useDistributorState('currentSection');

  const [isPlaying, setIsPlaying] = useState(0);

  useEffect(() => {
    console.log('CLEAR STORE');
    store.clear();
  }, []);

  const playerRef = useRef();

  const onAddVideoId = (event) => {
    const videoId = event.target.value;
    setVideoId(videoId);

    setSong(new Song({ videoId }, store));
    setCurrentLine(new Line());
    setCurrentSection(new Section());
  };

  const playVideo = () => {
    playerRef?.current?.internalPlayer?.playVideo();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    playerRef?.current?.internalPlayer?.pauseVideo();
    setIsPlaying(false);
  };

  const videoOptions = {
    height: '180',
    width: '320',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
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

  return (
    <Layout.Content className="container">
      <main className="main distributor">
        <h1>Distributor</h1>
        <section className="section step step--0">
          <Input
            addonBefore="https://www.youtube.com/watch?v="
            defaultValue={videoId}
            onPressEnter={onAddVideoId}
            placeholder="Insert Youtube video id"
          />
          <span className="separator">or</span>
          <Button type="primary">Load Song</Button>
        </section>

        <Divider />

        {Boolean(videoId) && (
          <section className="distributor-grid">
            {isRecording && <KeyCapture videoRef={playerRef} isPlaying={isPlaying} />}

            <Timeline />

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

            <InstanceOptions />

            <Log />

            <div className="distributor-grid__actions">
              <Divider />

              <Button type="primary">Save</Button>
            </div>
          </section>
        )}
      </main>
    </Layout.Content>
  );
}

export default Distributor;
