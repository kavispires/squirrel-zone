import React, { useRef } from 'react';

// Design Resources
import { Layout, Divider, Collapse } from 'antd';
// State
import useDistributorState from '../states/useDistributorState';
// Components
import StepperProgress from './distributor/StepperProgress';
import LoadSong from './distributor/LoadSong';
import LyricsAndSections from './distributor/LyricsAndSections';
import ModalOptions from './distributor/ModalOptions';
import TimeAndSync from './distributor/TimeAndSync';
import Preview from './distributor/Preview';

const { Panel } = Collapse;

function Distributor() {
  const [step, setStep] = useDistributorState('step');
  const [videoId] = useDistributorState('videoId');
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const playerRef = useRef();

  const changePanel = (key) => {
    setStep(key);
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
              <TimeAndSync playerRef={playerRef} />
            ) : (
              <p>You can't see this step without a video.</p>
            )}
          </Panel>
          <Panel header="Preview" key="3">
            {Boolean(videoId) ? (
              <Preview playerRef={playerRef} />
            ) : (
              <p>You can't see this step without a video.</p>
            )}
          </Panel>
        </Collapse>

        <Divider />

        <ModalOptions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />
      </main>
    </Layout.Content>
  );
}

export default Distributor;
