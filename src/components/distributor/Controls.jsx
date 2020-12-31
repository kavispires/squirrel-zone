import React, { useState } from 'react';

// Design Resources
import { Button, Radio } from 'antd';
import { PlayCircleOutlined, PlusSquareFilled, PlusCircleFilled } from '@ant-design/icons';

import useDistributorState from '../../states/useDistributorState';
import { Section, Line } from '../../utils/distributor';

function Controls({ playerRef, playVideo, pauseVideo }) {
  const [isRecording, setIsRecording] = useDistributorState('isRecording');
  const [assignee, setAssignee] = useDistributorState('assignee');
  const [song] = useDistributorState('song');
  const [currentLine, setCurrentLine] = useDistributorState('currentLine');
  const [currentSection, setCurrentSection] = useDistributorState('currentSection');

  const options = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
  ];

  const onRadioGroupChange = (e) => {
    setAssignee(e.target.value);
  };

  const toggleRecording = (e) => {
    if (isRecording) {
      pauseVideo();
      setIsRecording(false);
    } else {
      playVideo();
      setIsRecording(true);
      e.currentTarget.blur();
    }
  };

  const addNewLine = () => {
    // Add current line to section
    currentSection.addLine(currentLine);
    // Create new line
    const newLine = new Line();
    // Activate new line
    setCurrentLine(newLine);
  };

  const addNewSection = () => {
    // Add current section to song
    song.addSection(currentSection);
    // Create new section
    const newSection = new Section();
    // Activate new section
    setCurrentSection(newSection);
  };

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

      <Radio.Group
        options={options}
        onChange={onRadioGroupChange}
        value={assignee}
        optionType="button"
        className="distributor-controls__assignees"
      />

      <Button icon={<PlusSquareFilled />} onClick={addNewSection} className="distributor-controls__button">
        Add Section
      </Button>
      <Button icon={<PlusCircleFilled />} className="distributor-controls__button" onClick={addNewLine}>
        Add Line
      </Button>
    </div>
  );
}

export default Controls;
