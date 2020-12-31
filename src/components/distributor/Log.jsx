import React from 'react';

// Design Resources
import { Button, Tooltip } from 'antd';
import { MessageFilled, NotificationFilled, DatabaseFilled } from '@ant-design/icons';

// Global State
import useDistributorState from '../../states/useDistributorState';

function Part({ part }) {
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const activeClass = activeInstance?.id === part.id ? 'log__part--active' : '';
  const buttonType = part.isComplete ? 'default' : 'dashed';

  return (
    <Tooltip title="Open Part Options">
      <Button
        icon={<MessageFilled />}
        className={`log__part ${activeClass}`}
        size="small"
        shape="round"
        type={buttonType}
        onClick={() => setActiveInstance(part)}
      >
        {part.text}
      </Button>
    </Tooltip>
  );
}

function Line({ line }) {
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const activeClass = activeInstance?.id === line.id ? 'log__line--active' : '';

  return (
    <li className={`log__line ${activeClass}`}>
      <Tooltip title="Open Line Options">
        <Button
          type="default"
          shape="circle"
          size="small"
          icon={<NotificationFilled />}
          onClick={() => setActiveInstance(line)}
        />
      </Tooltip>
      <ul>{line.parts && line.parts.map((part) => <Part key={part.id} part={part} />)}</ul>
    </li>
  );
}

function Section({ section }) {
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');

  const activeClass = activeInstance?.id === section.id ? 'log__section--active' : '';

  return (
    <li className={`log__section ${activeClass}`}>
      <Button
        type="default"
        shape="circle"
        size="small"
        icon={<DatabaseFilled />}
        onClick={() => setActiveInstance(section)}
        className="log__section-button-upwards"
      >
        {section.kind} {section.number}
      </Button>
      <ul>{section.lines && section.lines.map((line) => <Line key={line.id} line={line} />)}</ul>
    </li>
  );
}

function Log() {
  const [unassignedParts] = useDistributorState('unassignedParts');
  const [song] = useDistributorState('song');

  return (
    <div className="distributor-grid__log">
      <h3>Unassigned Parts ({unassignedParts && unassignedParts.length})</h3>
      <ul className="current-log">
        {unassignedParts && unassignedParts.map((part) => <Part key={part.id} part={part} />)}
      </ul>

      <ul className="full-log">
        {song && song.sections.map((section) => <Section key={section.id} section={section} />)}
      </ul>
    </div>
  );
}

export default Log;
