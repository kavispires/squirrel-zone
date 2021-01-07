import React from 'react';

// Design Resources
import { Button, Divider, Progress, Tooltip } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Components
import KeyCapture from './KeyCapture';
import Log from './Log';
import Controls from './Controls';
import TimestampsBank from './TimestampsBank';
import YoutubeVideo from './YoutubeVideo';

function TimeAndSync({ playerRef, playVideo, pauseVideo, seekAndPlay }) {
  const [isRecording] = useDistributorState('isRecording');
  const [song] = useDistributorState('song');
  const [step, setStep] = useDistributorState('step');
  const [isPlaying] = useDistributorState('isPlaying');

  return (
    <section className="distributor-grid time-and-sync">
      {isRecording && <KeyCapture.Keyboard playerRef={playerRef} isPlaying={isPlaying} />}

      {step === 2 && (
        <YoutubeVideo
          playerRef={playerRef}
          width="320"
          height="180"
          className="distributor-grid__video-container"
        />
      )}

      <Controls playerRef={playerRef} playVideo={playVideo} pauseVideo={pauseVideo} />

      <TimestampsBank />

      <Log seekAndPlay={seekAndPlay} className="distributor-grid__log log-full-width" />

      <div className="distributor-grid__actions">
        <Divider />
        <Tooltip title="Sections Completion Rate">
          <Progress percent={song?.relationshipsCompletion} />
        </Tooltip>
        <Divider />
        <div className="time-and-sync__action">
          <Button type="primary" onClick={() => setStep(3)}>
            Next Step: Preview
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TimeAndSync;
