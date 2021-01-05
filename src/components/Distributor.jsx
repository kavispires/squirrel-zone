import React, { useRef, useEffect } from 'react';

// Design Resources
import { Layout, Divider, Collapse } from 'antd';
// API
import API from '../api';

// State
import useDistributorState from '../states/useDistributorState';
// Components
import StepperProgress from './distributor/StepperProgress';
import LoadSong from './distributor/LoadSong';
import LyricsAndSections from './distributor/LyricsAndSections';
import ModalOptions from './distributor/ModalOptions';
import TimeAndSync from './distributor/TimeAndSync';
import Preview from './distributor/Preview';
import SongMetadata from './distributor/SongMetadata';

const { Panel } = Collapse;

function Distributor() {
  const [step, setStep] = useDistributorState('step');
  const [videoId] = useDistributorState('videoId');
  const [song] = useDistributorState('song');
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const playerRef = useRef();

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await API.getTest();
        console.log({ response });
      } catch (err) {
        console.error(err);
      }
    }

    fetchTest();
  });

  const changePanel = (key) => {
    setStep(key);
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

  return (
    <Layout.Content className="container">
      <main className="main distributor">
        <h1>Distributor</h1>
        <StepperProgress currentStep={step} />
        <Collapse accordion defaultActiveKey={0} activeKey={step} onChange={changePanel}>
          <Panel header="Load Song" key="0">
            <LoadSong />
          </Panel>
          <Panel header="Lyrics & Sections" key="1">
            <LyricsAndSections />
          </Panel>
          <Panel header="Capture Parts" key="2">
            {Boolean(videoId) ? (
              <TimeAndSync
                playerRef={playerRef}
                playVideo={playVideo}
                pauseVideo={pauseVideo}
                seekAndPlay={seekAndPlay}
              />
            ) : (
              <p>You can't see this step without a video.</p>
            )}
          </Panel>
          <Panel header="Preview" key="3">
            {Boolean(videoId) ? (
              <Preview
                playerRef={playerRef}
                playVideo={playVideo}
                pauseVideo={pauseVideo}
                seekAndPlay={seekAndPlay}
              />
            ) : (
              <p>You can't see this step without a video.</p>
            )}
          </Panel>
          <Panel header="Song Metadata" key="4">
            {song ? <SongMetadata /> : <p>You can't see this step without a loaded song.</p>}
          </Panel>
        </Collapse>

        <Divider />

        <ModalOptions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />
      </main>
    </Layout.Content>
  );
}

export default Distributor;
