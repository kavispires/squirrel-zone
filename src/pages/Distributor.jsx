import React, { useRef } from 'react';

// Design Resources
import { Layout, Typography } from 'antd';
// State
import useDistributorState from '../states/useDistributorState';
// Components
import StepperProgress from '../components/distributor/StepperProgress';
import LoadSong from '../components/distributor/LoadSong';
import LyricsAndSections from '../components/distributor/LyricsAndSections';
import TimeAndSync from '../components/distributor/TimeAndSync';
import Preview from '../components/distributor/Preview';
import SongMetadata from '../components/distributor/SongMetadata';
import DrawerOptions from '../components/distributor/DrawerOptions';
import Adjustments from '../components/distributor/Adjustments';

function Distributor() {
  const [step, setStep] = useDistributorState('step');
  const [videoId] = useDistributorState('videoId');
  const [song] = useDistributorState('song');
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const playerRef = useRef();

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
          {step === 3 && (
            <Preview
              playerRef={playerRef}
              playVideo={playVideo}
              pauseVideo={pauseVideo}
              seekAndPlay={seekAndPlay}
            />
          )}
          {step === 4 && <Adjustments />}
          {step === 5 && <SongMetadata />}
        </div>

        <DrawerOptions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />
      </main>
    </Layout.Content>
  );
}

export default Distributor;
