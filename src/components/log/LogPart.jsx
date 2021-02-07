import React, { useCallback, useEffect, useState } from 'react';

// Design Resources
import { Button, Checkbox } from 'antd';
import { NotificationFilled, CheckCircleOutlined, ApiOutlined } from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import LogAssignees from './LogAssignees';

function LogPartEdit({ part, onShowModal, onCheckboxChange }) {
  const [selectedTimestamps, setSelectedTimestamps] = useDistributorState('selectedTimestamps');
  const [unassignedTimestamps, setUnassignedTimestamps] = useDistributorState('unassignedTimestamps');
  const [selection] = useDistributorState('selection');

  // CSS Classes
  const baseClass = 'log-part';
  const assigneeClass = `assignee-background--${part.assignee}`;

  const attachTimestamp = useCallback(() => {
    const selectedTimestampsCopy = [...selectedTimestamps];
    const firstTimestamp = selectedTimestampsCopy.shift();
    part.updateTimestamp(firstTimestamp);
    // Remove timestamp from options
    setUnassignedTimestamps((state) => {
      delete state[firstTimestamp.id];
      return state;
    });
    setSelectedTimestamps(selectedTimestampsCopy);
  }, [part, selectedTimestamps, setSelectedTimestamps, setUnassignedTimestamps]);

  const checkedIndex = selection.indexOf(part.key);

  return (
    <li className={`${baseClass} ${assigneeClass}`}>
      <Checkbox id={part.key} name="part" onChange={onCheckboxChange} checked={checkedIndex !== -1} />
      <Button
        type="text"
        icon={part.isComplete ? <CheckCircleOutlined className="icon--green" /> : <NotificationFilled />}
        onClick={() => onShowModal(part)}
        size="small"
      >
        {part.text}
        {Boolean(Object.keys(unassignedTimestamps).length) && checkedIndex !== -1 && (
          <span className="log-part__button-index">({checkedIndex + 1})</span>
        )}
      </Button>
      {Boolean(selectedTimestamps?.length) && (
        <Button
          shape="circle"
          type="default"
          size="small"
          icon={<ApiOutlined />}
          className="log-part__connect-icon"
          onClick={attachTimestamp}
        />
      )}
    </li>
  );
}

function LogPartCompact({ part, seekAndPlay, onCheckboxChange }) {
  const [selectedTimestamps, setSelectedTimestamps] = useDistributorState('selectedTimestamps');
  const [unassignedTimestamps, setUnassignedTimestamps] = useDistributorState('unassignedTimestamps');
  const [selection] = useDistributorState('selection');
  const [checkedIndex, setCheckedIndex] = useState(-1);

  useEffect(() => {
    setCheckedIndex(selection.indexOf(part.key));
  }, [selection, checkedIndex, setCheckedIndex, part.key]);

  // CSS Classes
  const baseClass = 'log-part';
  const assigneeClass = `assignee-background--${part.assignee}`;

  const attachTimestamp = useCallback(() => {
    const selectedTimestampsCopy = [...selectedTimestamps];
    const firstTimestamp = selectedTimestampsCopy.shift();
    part.updateTimestamp(firstTimestamp);
    // Remove timestamp from options
    setUnassignedTimestamps((state) => {
      delete state[firstTimestamp.id];
      return state;
    });
    setSelectedTimestamps(selectedTimestampsCopy);
  }, [part, selectedTimestamps, setSelectedTimestamps, setUnassignedTimestamps]);

  const onPlayPart = useCallback(() => {
    seekAndPlay(part.startTime / 1000);
  }, [part.startTime, seekAndPlay]);

  return (
    <li className={`${baseClass} ${assigneeClass}`}>
      <Checkbox id={part.key} name="part" onChange={onCheckboxChange} checked={checkedIndex !== -1} />
      <Button
        type="text"
        icon={part.isComplete ? <CheckCircleOutlined className="icon--green" /> : <NotificationFilled />}
        onClick={onPlayPart}
        size="small"
      >
        {part.text}
        {Boolean(Object.keys(unassignedTimestamps).length) && checkedIndex !== -1 && (
          <span className="log-part__button-index">({checkedIndex + 1})</span>
        )}
      </Button>
      {Boolean(selectedTimestamps?.length) && (
        <Button
          shape="circle"
          type="default"
          size="small"
          icon={<ApiOutlined />}
          className="log-part__connect-icon"
          onClick={attachTimestamp}
        />
      )}
    </li>
  );
}

function LogPartDistribute({ part, assignMembers }) {
  return (
    <li className="log-part assignee-background--none">
      <Button
        type="text"
        onClick={() => assignMembers(part.id)}
        size="small"
        className="log-part__distribute"
      >
        {part.text}
        <LogAssignees partId={part.id} />
      </Button>
    </li>
  );
}

const LogPart = {
  Compact: LogPartCompact, // identical except for click action
  Distribute: LogPartDistribute, // identical except for click action
  Edit: LogPartEdit,
};

export default LogPart;
