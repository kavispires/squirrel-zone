import React, { useRef } from 'react';

// Design Resources
import { Layout, Divider, Collapse, Typography, Button } from 'antd';

// State
import useDistributorState from '../states/useDistributorState';
// Components
import StepperProgress from '../components/distributor/StepperProgress';
import LoadSong from '../components/distributor/LoadSong';
import LyricsAndSections from '../components/distributor/LyricsAndSections';
import ModalOptions from '../components/distributor/ModalOptions';
import TimeAndSync from '../components/distributor/TimeAndSync';
import Preview from '../components/distributor/Preview';
import SongMetadata from '../components/distributor/SongMetadata';
import SaveSong from '../components/distributor/SaveSong';
import { DISTRIBUTOR_STEPS } from '../utils/constants';
import DrawerOptions from '../components/distributor/DrawerOptions';

const { Panel } = Collapse;

function Distributor() {
  const [step, setStep] = useDistributorState('step');
  const [videoId] = useDistributorState('videoId');
  const [song] = useDistributorState('song');
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const playerRef = useRef();

  const changePanel = (key) => {
    setStep(key);
  };

  const playVideo = () => {
    playerRef?.current?.internalPlayer?.playVideo();
  };

  const pauseVideo = () => {
    playerRef?.current?.internalPlayer?.pauseVideo();
  };

  const seekAndPlay = (timestamp) => {
    playerRef?.current?.internalPlayer?.seekTo(timestamp);
    playerRef?.current?.internalPlayer?.playVideo();
  };

  const disabledSteps = [
    false,
    !Boolean(song?.id),
    !Boolean(videoId && song?.id),
    !Boolean(videoId && song?.id),
    !Boolean(videoId && song?.id),
    !Boolean(videoId && song?.id),
  ];

  return (
    <Layout.Content className="container">
      <main className="main distributor">
        <Typography.Title>Distributor</Typography.Title>
        <StepperProgress currentStep={step} setStep={setStep} disabledSteps={disabledSteps} />
        <div className="distributor-content">
          {step === 0 && <LoadSong />}
          {step === 1 && <LyricsAndSections />}
          {step === 2 && (
            <TimeAndSync
              playerRef={playerRef}
              playVideo={playVideo}
              pauseVideo={pauseVideo}
              seekAndPlay={seekAndPlay}
            />
          )}
          {step === 3 && <LoadSong />}
          {step === 4 && <LoadSong />}
          {step === 5 && <LoadSong />}
        </div>
        {/* <Divider />
        <nav className="distributor-nav">
          <div className="distributor-nav__left-elements">
            {step > 0 && (
              <Button type="default" onClick={() => setStep(step - 1)} disabled={disabledSteps[step - 1]}>
                « {DISTRIBUTOR_STEPS[step - 1]}
              </Button>
            )}
          </div>
          <div className="distributor-nav__right-elements">
            {step < DISTRIBUTOR_STEPS.length - 1 && (
              <Button type="primary" onClick={() => setStep(step + 1)} disabled={disabledSteps[step + 1]}>
                {DISTRIBUTOR_STEPS[step + 1]} »
              </Button>
            )}
          </div>
        </nav> */}

        {/* <Collapse accordion defaultActiveKey={0} activeKey={step} onChange={changePanel}>
          <Panel header="Load Song" key="0">
            <LoadSong />
          </Panel>
          <Panel header="Lyrics & Sections" key="1">
            <LyricsAndSections />
          </Panel>
          <Panel header="Capture Parts" key="2">
            {Boolean(videoId) && step === '2' ? (
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
            {Boolean(videoId) && step === '3' ? (
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
            {song && step === '4' ? <SongMetadata /> : <p>You can't see this step without a loaded song.</p>}
          </Panel>
          <Panel header="Save" key="5">
            {song ? <SaveSong /> : <p>You can't see this step without a loaded song.</p>}
          </Panel>
        </Collapse> */}

        <DrawerOptions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />

        {/* <ModalOptions activeInstance={activeInstance} setActiveInstance={setActiveInstance} /> */}
      </main>
    </Layout.Content>
  );
}

export default Distributor;
