import React, { useCallback } from 'react';

// Design Resources
import { Button, Checkbox, Tooltip } from 'antd';
import {
  DatabaseFilled,
  CheckCircleOutlined,
  PlusOutlined,
  ColumnWidthOutlined,
  PlayCircleOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';

// Engine and utilities
import { Line } from '../../utils/distributor';
import { bemClass, getBemModifier } from '../../utils';
// Components
import LogLine from './LogLine';

function LogSectionEdit({ section, onCheckboxChange, onShowModal, onListSelection, seekAndPlay }) {
  const [lines] = useDistributorState('lines');
  const [selection] = useDistributorState('selection');

  // CSS Classes
  const isSectionChecked = selection.includes(section.key);
  const baseClass = 'log-section';
  const checkedClass = getBemModifier(isSectionChecked, 'checked');

  // Methods
  const onAddNewLine = useCallback(() => {
    const newLine = new Line({ sectionId: section.id });
    section.addLine(newLine);
  }, [section]);

  const onPlaySection = useCallback(() => {
    seekAndPlay(section.startTime / 1000);
  }, [section.startTime, seekAndPlay]);

  return (
    <li className={bemClass(baseClass, checkedClass)}>
      <div className="log-section__title">
        <Checkbox id={section.key} name="section" onChange={onCheckboxChange} checked={isSectionChecked} />
        <Button
          type="default"
          shape="round"
          icon={section.isComplete ? <CheckCircleOutlined className="icon--green" /> : <DatabaseFilled />}
          className="log-section__title-button"
          onClick={() => onShowModal(section)}
        >
          Section {section.kind}
        </Button>
        {Boolean(seekAndPlay) && (
          <Tooltip title="Play song from here">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<PlayCircleOutlined />}
              className="log-section__icon-button"
              onClick={onPlaySection}
            />
          </Tooltip>
        )}
        {Boolean(onListSelection) && (
          <Tooltip title="Select parts on this section in sequence">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<OrderedListOutlined />}
              className="log-section__icon-button"
              onClick={() => onListSelection(section)}
            />
          </Tooltip>
        )}
        <div className="log-section__actions">
          <Tooltip title="Add new line to this section">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<PlusOutlined />}
              className="log-section__icon-button"
              onClick={onAddNewLine}
            />
          </Tooltip>
          <Tooltip title="Nudge Section">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<ColumnWidthOutlined />}
              className="log-section__icon-button"
              disabled
              onClick={() => {}}
            />
          </Tooltip>
        </div>
      </div>

      <ul className="log__lines">
        {section.linesIds.map((lineId) => {
          const line = lines[lineId];
          return (
            <LogLine.Edit
              key={line.key}
              line={line}
              onCheckboxChange={onCheckboxChange}
              onShowModal={onShowModal}
            />
          );
        })}
      </ul>
    </li>
  );
}

function LogSectionCompact({ section, onCheckboxChange, onListSelection, seekAndPlay }) {
  const [lines] = useDistributorState('lines');

  const onPlaySection = useCallback(() => {
    seekAndPlay(section.startTime / 1000);
  }, [section.startTime, seekAndPlay]);

  return (
    <li className={bemClass('log-section', 'compact')}>
      <Button
        shape="circle"
        type="default"
        size="small"
        icon={<PlayCircleOutlined />}
        className="log-section__icon-button"
        onClick={onPlaySection}
        disabled={!Boolean(section.startTime)}
      />
      <Button
        shape="circle"
        type="default"
        size="small"
        icon={<OrderedListOutlined />}
        className="log-section__icon-button"
        onClick={() => onListSelection(section)}
      />
      <span className="log-section__title-compact">{section.name}</span>

      <ul className={bemClass('log__lines', 'compact')}>
        {section.linesIds.map((lineId) => {
          const line = lines[lineId];
          return (
            <LogLine.Compact
              key={line.key}
              line={line}
              section={section}
              onCheckboxChange={onCheckboxChange}
              seekAndPlay={seekAndPlay}
            />
          );
        })}
      </ul>
    </li>
  );
}

function LogSectionDistribute({ section, seekAndPlay, assignMembers, onLineSelection }) {
  const [lines] = useDistributorState('lines');

  const onPlaySection = useCallback(() => {
    seekAndPlay(section.startTime / 1000);
  }, [section.startTime, seekAndPlay]);

  return (
    <li className={bemClass('log-section', 'compact')}>
      <Button
        shape="circle"
        type="default"
        size="small"
        icon={<PlayCircleOutlined />}
        className="log-section__icon-button"
        onClick={onPlaySection}
      />

      <ul className={bemClass('log__lines', 'compact')}>
        {section.linesIds.map((lineId) => {
          const line = lines[lineId];
          return (
            <LogLine.Distribute
              key={line.key}
              line={line}
              assignMembers={assignMembers}
              onLineSelection={onLineSelection}
            />
          );
        })}
      </ul>
    </li>
  );
}

const LogSection = {
  Compact: LogSectionCompact,
  Distribute: LogSectionDistribute,
  Edit: LogSectionEdit,
};

export default LogSection;
