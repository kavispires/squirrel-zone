import React, { useState, useCallback } from 'react';

// Design Resources
import { Button, Checkbox, Tooltip, Popover, Switch } from 'antd';
import {
  MessageFilled,
  NotificationFilled,
  DatabaseFilled,
  CheckCircleOutlined,
  ColumnHeightOutlined,
  PlusOutlined,
  UpOutlined,
  DownOutlined,
  ColumnWidthOutlined,
  ApiOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import {
  Line,
  deserializeKey,
  getDuplicatedData,
  batchDeserializeInstancesSameData,
  Part,
} from '../../utils/distributor';
import { bemClass, bemClassConditionalModifier, getBemModifier } from '../../utils';

function Log({ seekAndPlay, className = '', defaultCompactSetting = true }) {
  const [song] = useDistributorState('song');
  const [sections] = useDistributorState('sections');
  const [lines] = useDistributorState('lines');
  const [, setActiveInstance] = useDistributorState('activeInstance');
  const [selection, setSelection] = useDistributorState('selection');
  const [isCompact, setIsCompact] = useState(defaultCompactSetting);

  const onSwitchLogView = (checked) => {
    setIsCompact(checked);
  };

  const handleEditAll = useCallback(() => {
    const [type] = deserializeKey(selection[0]);

    let instance = {
      id: `SELECTION-${selection.length}`,
      type,
      deserialize(data) {
        const dict = {
          line: lines,
          section: sections,
        }[type];

        batchDeserializeInstancesSameData(dict, selection, data, true);
        setSelection([]);
      },
    };
    if (type === 'section') {
      const equalParts = getDuplicatedData(sections, selection, true);

      instance = {
        ...instance,
        name: `SELECTION-${selection.length}`,
        linesIds: [],
        ...equalParts,
      };
    }
    if (type === 'line') {
      const equalParts = getDuplicatedData(lines, selection, true);
      instance = {
        ...instance,
        partsIds: [],
        ...equalParts,
      };
    }

    setActiveInstance(instance);
  }, [lines, sections, selection, setActiveInstance, setSelection]);

  const onShowModal = useCallback(
    (instance) => {
      setActiveInstance(instance);
      if (instance.type === 'part' && seekAndPlay) {
        seekAndPlay(instance.startTime / 1000);
      }
    },
    [seekAndPlay, setActiveInstance]
  );

  const onCheckboxChange = useCallback(
    (e) => {
      const { name, id, checked } = e.target;

      if (checked) {
        setSelection((state) => {
          if (state.length && state[0].startsWith(name)) {
            return [...state, id];
          }

          return [id];
        });
      } else {
        setSelection((state) => {
          if (state.length && state[0].startsWith(name)) {
            return state.filter((i) => i !== id);
          }

          return [];
        });
      }
    },
    [setSelection]
  );

  return (
    <div className={`${bemClassConditionalModifier('log', 'compact', isCompact)} ${className}`}>
      <div className="log__editing-actions">
        <Button type="link" size="small" onClick={handleEditAll} disabled={!Boolean(selection?.length)}>
          Edit All Selected Instances
        </Button>
        <div>
          Compact View <Switch defaultChecked={isCompact} onChange={onSwitchLogView} size="small" />
        </div>
      </div>

      <ul className={bemClassConditionalModifier('log__sections', 'compact', isCompact)}>
        {song?.sectionsIds?.map((sectionId) => {
          const section = sections[sectionId];

          return (
            <LogSection
              key={section.key}
              section={section}
              onCheckboxChange={onCheckboxChange}
              onShowModal={onShowModal}
              seekAndPlay={seekAndPlay}
              isCompact={isCompact}
            />
          );
        })}
      </ul>
    </div>
  );
}

function LogSection({ section, onCheckboxChange, onShowModal, seekAndPlay, isCompact }) {
  const [lines] = useDistributorState('lines');
  const [selection] = useDistributorState('selection');

  // CSS Classes
  const isSectionChecked = selection.includes(section.key);
  const baseClass = 'preview-section';
  const checkedClass = getBemModifier(isSectionChecked, 'checked');
  const compactClass = getBemModifier(isCompact, 'compact');

  // Methods
  const onAddNewLine = useCallback(() => {
    const newLine = new Line({ sectionId: section.id });
    section.addLine(newLine);
  }, [section]);

  const onPlaySection = useCallback(() => {
    seekAndPlay(section.startTime / 1000);
  }, [section.startTime, seekAndPlay]);

  return (
    <li className={bemClass(baseClass, checkedClass, compactClass)}>
      {!isCompact && (
        <div className="preview-section__title">
          <Checkbox id={section.key} name="section" onChange={onCheckboxChange} checked={isSectionChecked} />
          <Button
            type="default"
            shape="round"
            icon={section.isComplete ? <CheckCircleOutlined className="icon--green" /> : <DatabaseFilled />}
            className="preview-section__title-button"
            onClick={() => onShowModal(section)}
          >
            Section {section.kind}
          </Button>
          <Tooltip title="Play song from here">
            <Button
              shape="circle"
              type="default"
              size="small"
              icon={<PlayCircleOutlined />}
              className="preview-section__icon-button"
              onClick={onPlaySection}
            />
          </Tooltip>
          <div className="preview-section__actions">
            <Tooltip title="Add new line to this section">
              <Button
                shape="circle"
                type="default"
                size="small"
                icon={<PlusOutlined />}
                className="preview-section__icon-button"
                onClick={onAddNewLine}
              />
            </Tooltip>
            <Tooltip title="Nudge Section">
              <Button
                shape="circle"
                type="default"
                size="small"
                icon={<ColumnWidthOutlined />}
                className="preview-section__icon-button"
                disabled
                onClick={() => {}}
              />
            </Tooltip>
          </div>
        </div>
      )}

      <ul className={bemClassConditionalModifier('log__lines', 'compact', isCompact)}>
        {section.linesIds.map((lineId) => {
          const line = lines[lineId];
          return (
            <LogLine
              key={line.key}
              line={line}
              section={section}
              onCheckboxChange={onCheckboxChange}
              onShowModal={onShowModal}
              isCompact={isCompact}
            />
          );
        })}
      </ul>
    </li>
  );
}

function LogLine({ line, section, onCheckboxChange, onShowModal, isCompact }) {
  const [parts] = useDistributorState('parts');
  const [selection] = useDistributorState('selection');

  const [popoverContent, setPopoverContent] = useState(null);

  // CSS Classes
  const isLineChecked = selection.includes(line.key);
  const baseClass = 'preview-line';
  const checkedClass = getBemModifier(isLineChecked, 'checked');
  const compactClass = getBemModifier(isCompact, 'compact');

  // TODO
  const onAddNewPart = (line) => {
    console.log(line);
    const newPart = new Part({ lineId: line.id });
    line.addPart(newPart);
  };

  // TODO
  const onMoveSection = (line) => {
    console.log(line);
  };

  // TODO
  const handlePopoverVisibility = (e) => {
    console.log(section);
    if (!e && popoverContent) {
      console.log('remove');
      setPopoverContent(null);
    } else {
      console.log('create');
      return (
        <div className="popover-container">
          <Button
            type="default"
            icon={<UpOutlined />}
            className="popover-container__button"
            onClick={() => onMoveSection('A')}
          >
            Move to previous Section ()
          </Button>
          <Button
            type="default"
            icon={<DownOutlined />}
            className="popover-container__button"
            onClick={() => onMoveSection('B')}
          >
            Move to next Section ()
          </Button>
        </div>
      );
    }
  };

  return (
    <li className={bemClass(baseClass, checkedClass, compactClass)}>
      {!isCompact && (
        <div className="preview-line__title">
          <Checkbox id={line.key} name="line" onChange={onCheckboxChange} checked={isLineChecked} />
          <Tooltip title="Open Line Options">
            <Button
              type="text"
              icon={line.isComplete ? <CheckCircleOutlined className="icon--green" /> : <MessageFilled />}
              className="preview-line__line-button"
              onClick={() => onShowModal(line)}
            >
              <span className="preview-line__title-text">{line.text}</span>
            </Button>
          </Tooltip>
          <div className="preview-line__actions">
            <Tooltip title="Add new part to this line">
              <Button
                shape="circle"
                type="default"
                size="small"
                icon={<PlusOutlined />}
                className="preview-line__icon-button"
                onClick={() => onAddNewPart(line)}
                disabled
              />
            </Tooltip>

            <Tooltip title="Move line to adjacent section">
              <Popover
                content={popoverContent}
                title="Move line"
                trigger="click"
                visible={Boolean(popoverContent)}
                onVisibleChange={handlePopoverVisibility}
              >
                <Button
                  shape="circle"
                  type="default"
                  size="small"
                  icon={<ColumnHeightOutlined />}
                  className="preview-line__icon-button"
                  disabled
                  onClick={() => {}}
                />
              </Popover>
            </Tooltip>

            <Tooltip title="Nudge Line">
              <Button
                shape="circle"
                type="default"
                size="small"
                icon={<ColumnWidthOutlined />}
                className="preview-section__icon-button"
                disabled
                onClick={() => {}}
              />
            </Tooltip>
          </div>
        </div>
      )}

      <ul className={bemClassConditionalModifier('log__parts', 'compact', isCompact)}>
        {line?.partsIds?.map((partId) => {
          const part = parts[partId];
          return (
            <LogPart
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

function LogPart({ part, onCheckboxChange, onShowModal }) {
  const [selectedTimestamps, setSelectedTimestamps] = useDistributorState('selectedTimestamps');
  const [unassignedTimestamps, setUnassignedTimestamps] = useDistributorState('unassignedTimestamps');
  const [selection] = useDistributorState('selection');

  // CSS Classes
  const baseClass = 'preview-part';
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
          <span className="preview-part__button-index">({checkedIndex + 1})</span>
        )}
      </Button>
      {Boolean(selectedTimestamps?.length) && (
        <Button
          shape="circle"
          type="default"
          size="small"
          icon={<ApiOutlined />}
          className="preview-part__connect-icon"
          onClick={attachTimestamp}
        />
      )}
    </li>
  );
}

export default Log;
