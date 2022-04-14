import React from 'react';

// Design Resources
import { Button } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Components
import KeyCapture from './KeyCapture';
import Log from '../log/Log';
import Controls from './Controls';
import TimestampsBank from './TimestampsBank';
import YoutubeVideo from '../YoutubeVideo';
import StepActions from './StepActions';
import SongProgress from './SongProgress';

function TimeAndSync({ playerRef, playVideo, pauseVideo, seekAndPlay }) {
  const [isRecording] = useDistributorState('isRecording');
  const [, setStep] = useDistributorState('step');
  const [isPlaying] = useDistributorState('isPlaying');

  return (
    <section className="distributor-grid time-and-sync">
      {isRecording && <KeyCapture.Keyboard playerRef={playerRef} isPlaying={isPlaying} />}

      <YoutubeVideo
        playerRef={playerRef}
        width={320}
        height={180}
        className="distributor-grid__video-container"
      />

      <Controls playerRef={playerRef} playVideo={playVideo} pauseVideo={pauseVideo} />

      <TimestampsBank />

      <Log seekAndPlay={seekAndPlay} className="distributor-grid__log log-full-width" />

      <SongProgress />

      <StepActions className="distributor-grid__actions">
        <Button type="primary" onClick={() => setStep(3)}>
          Next Step: Preview
        </Button>
      </StepActions>
    </section>
  );
}

export default TimeAndSync;
