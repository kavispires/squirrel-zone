import React, { useCallback } from 'react';

// Design Resources
import { Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import KeyCapture from './KeyCapture';

function Controls({ playerRef, playVideo, pauseVideo, isPlaying }) {
  const [isRecording, setIsRecording] = useDistributorState('isRecording');

  const toggleRecording = useCallback(
    (e) => {
      if (isRecording) {
        pauseVideo();
        setIsRecording(false);
      } else {
        playVideo();
        setIsRecording(true);
        e.currentTarget.blur();
      }
    },
    [isRecording, pauseVideo, playVideo, setIsRecording]
  );

  return (
    <div className="distributor-grid__controls distributor-controls">
      <Button
        icon={<PlayCircleOutlined />}
        danger={true}
        type={isRecording ? 'primary' : null}
        onClick={toggleRecording}
        className="distributor-controls__record"
      >
        {isRecording ? 'Recording' : 'Record'}
      </Button>
      <div className="distributor-controls__other-controls">
        <h4 className="distributor-controls__title">Capture Buttons</h4>
        <p className="distributor-controls__description">
          Click and hold to record. It allows multiple clicks at the same time. You may also use the number
          keys on your keyboard.
        </p>
        <KeyCapture.MouseButtons playerRef={playerRef} isPlaying={isPlaying} />
      </div>
    </div>
  );
}

export default Controls;
