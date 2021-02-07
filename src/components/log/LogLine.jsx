import React from 'react';

// Design Resources
import { Button, Checkbox, Tooltip } from 'antd';
import { MessageFilled, CheckCircleOutlined, PlusOutlined, ColumnWidthOutlined } from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';
import useGlobalState from '../../states/useGlobalState';
// Engine and utilities
import { Part } from '../../utils/distributor';
import { bemClass, getBemModifier } from '../../utils';
// Components
import LogPart from './LogPart';

function LogLineEdit({ line, onCheckboxChange, onShowModal }) {
  const [parts] = useDistributorState('parts');
  const [selection] = useDistributorState('selection');

  // CSS Classes
  const isLineChecked = selection.includes(line.key);
  const baseClass = 'log-line';
  const checkedClass = getBemModifier(isLineChecked, 'checked');

  const onAddNewPart = (line) => {
    const newPart = new Part({ lineId: line.id, text: '[missing lyrics]' });
    line.addPart(newPart);
  };

  return (
    <li className={bemClass(baseClass, checkedClass)}>
      <div className="log-line__title">
        <Checkbox id={line.key} name="line" onChange={onCheckboxChange} checked={isLineChecked} />
        <Tooltip title="Open Line Options">
          <Button
            type="text"
            icon={line.isComplete ? <CheckCircleOutlined className="icon--green" /> : <MessageFilled />}
            className="log-line__line-button"
            onClick={() => onShowModal(line)}
          >
            <span
              className={bemClass('log-line__title-text', getBemModifier(line.isDismissible, 'dismissed'))}
            >
              {line.text}
            </span>
          </Button>
        </Tooltip>
        <div className="log-line__actions">
          <Tooltip title="Add new part to this line">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<PlusOutlined />}
              className="log-line__icon-button"
              onClick={() => onAddNewPart(line)}
            />
          </Tooltip>

          <Tooltip title="Nudge Line">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<ColumnWidthOutlined />}
              className="log-line__icon-button"
              disabled
              onClick={() => {}}
            />
          </Tooltip>
        </div>
      </div>

      <ul className="log__parts">
        {line?.partsIds?.map((partId) => {
          const part = parts[partId];
          return (
            <LogPart.Edit
              key={part.key}
              part={part}
              onCheckboxChange={onCheckboxChange}
              onShowModal={onShowModal}
            />
          );
        })}
      </ul>
    </li>
  );
}

function LogLineCompact({ line, onCheckboxChange, seekAndPlay }) {
  const [parts] = useDistributorState('parts');

  return (
    <li className={bemClass('log-line', 'compact')}>
      <ul className={bemClass('log__parts', 'compact')}>
        {line?.partsIds?.map((partId) => {
          const part = parts[partId];
          return (
            <LogPart.Compact
              key={part.key}
              part={part}
              onCheckboxChange={onCheckboxChange}
              seekAndPlay={seekAndPlay}
            />
          );
        })}
      </ul>
    </li>
  );
}

function LogLineDistribute({ line, assignMembers }) {
  const [parts] = useDistributorState('parts');
  const [lineDistribution] = useGlobalState('lineDistribution');

  const isComplete = line?.partsIds?.every((partId) => Boolean(lineDistribution[partId]));
  const incompleteClass = isComplete ? '' : 'incomplete';

  return (
    <li className={bemClass('log-line', 'compact')}>
      <ul className={bemClass('log__parts', 'compact', incompleteClass)}>
        {line?.partsIds?.map((partId) => {
          const part = parts[partId];
          return <LogPart.Distribute key={part.key} part={part} assignMembers={assignMembers} />;
        })}
      </ul>
    </li>
  );
}

const LogLine = {
  Compact: LogLineCompact,
  Distribute: LogLineDistribute,
  Edit: LogLineEdit,
};

export default LogLine;
