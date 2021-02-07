import React, { useCallback } from 'react';

// Design Resources
import { Button, Radio } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import KeyCapture from './KeyCapture';
import { ASSIGNEE, ASSIGNEE_LABEL } from '../../utils/distributor';

const ASSIGNEE_OPTIONS = Object.values(ASSIGNEE ?? {}).map((i) => ({ value: i, label: ASSIGNEE_LABEL[i] }));

function Controls({ playerRef, playVideo, pauseVideo, isPlaying }) {
  const [isRecording, setIsRecording] = useDistributorState('isRecording');
  const [assignee, setAssignee] = useDistributorState('assignee');

  const onRadioGroupChange = useCallback(
    (e) => {
      setAssignee(e.target.value);
    },
    [setAssignee]
  );

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
        danger={isRecording}
        type={isRecording ? 'primary' : null}
        onClick={toggleRecording}
        className="distributor-controls__record"
      >
        {isRecording ? 'Recording' : 'Record'}
      </Button>
      <div className="distributor-controls__other-controls">
        <h4 className="distributor-controls__title">Active Assignee for SPACE bar</h4>

        <Radio.Group
          options={ASSIGNEE_OPTIONS}
          onChange={onRadioGroupChange}
          value={assignee}
          optionType="button"
          className="distributor-controls__assignees assignees-radio-group"
        />
        <p className="distributor-controls__description">
          This indicates what assignee the space bar will assign when recording.
        </p>
        <h4 className="distributor-controls__title">Capture Buttons</h4>
        <p className="distributor-controls__description">
          Click and hold to record. It allows multiple clicks at the same time. You may also use the number
          keys on your keyboard.
        </p>
        <KeyCapture.MouseButtons playerRef={playerRef} isPlaying={isPlaying} />
        <p className="distributor-controls__description">
          Keep it semantic! Use A and B for vocals, C and D for raps, E and F for Ad-libs, G for All, and H
          for None.
        </p>
      </div>
    </div>
  );
}

export default Controls;