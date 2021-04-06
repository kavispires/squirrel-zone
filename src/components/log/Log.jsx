import React, { useState, useCallback } from 'react';

// Design Resources
import { Button, Switch } from 'antd';

// State
import useDistributorState from '../../states/useDistributorState';

// Engine and utilities
import {
  deserializeKey,
  getDuplicatedData,
  batchDeserializeInstancesSameData,
  serializeKey,
  bemClassConditionalModifier,
} from '../../utils';
// Components
import LogSection from './LogSection';

function Log({
  seekAndPlay,
  className = '',
  defaultCompactSetting = true,
  locked = false,
  assignMembers = () => {},
}) {
  const [song] = useDistributorState('song');
  const [sections] = useDistributorState('sections');
  const [lines] = useDistributorState('lines');
  const [parts] = useDistributorState('parts');
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
          part: parts,
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
  }, [parts, lines, sections, selection, setActiveInstance, setSelection]);

  const handleDeselectAll = () => {
    setSelection([]);
  };

  const handleMergeAll = () => {
    const [type, id] = deserializeKey(selection[0]);

    if (type === 'part') {
      alert('Parts can not be merged!');
      return;
    }

    const confirmation = window.confirm(`Are you sure you want to merge these ${type}s?`);
    if (confirmation) {
      if (type === 'section') {
        // Gather lines from index 1 forward, disconnecting the lines from the section
        selection.reduce((keeper, sectionKey, index) => {
          if (index === 0) return keeper;
          const [, id] = deserializeKey(sectionKey);
          const currentSection = sections[id];
          // Disconnect song
          currentSection.disconnectSong(currentSection.songId);
          // Connect all lines to keeper section0
          currentSection.lines.forEach((line) => line.connectSection(keeper.id));

          return keeper;
        }, sections[id]);
      } else if (type === 'line') {
        // Gather lines from index 1 forward, disconnecting the lines from the section
        selection.reduce((keeper, lineKey, index) => {
          if (index === 0) return keeper;
          const [, id] = deserializeKey(lineKey);
          const currentLine = lines[id];
          // Disconnect section
          currentLine.disconnectSection(currentLine.sectionId);
          // Connect all parts to keeper line0
          currentLine.parts.forEach((part) => part.connectLine(keeper.id));

          return keeper;
        }, lines[id]);
      }

      setSelection([]);
    }
  };

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

  const onListSelection = useCallback(
    (section) => {
      const partKeys = (section.partsIds ?? []).map((partId) => serializeKey('part', partId));
      setSelection((state) => {
        if (state[0] === partKeys[0]) {
          return [];
        } else {
          return partKeys;
        }
      });
    },
    [setSelection]
  );

  const onLineSelection = useCallback(
    (line) => {
      line.partsIds.forEach((partId) => {
        assignMembers(partId);
      });
    },
    [assignMembers]
  );

  const [selectionType] = selection?.[0] ? deserializeKey(selection[0]) : '';

  const actionSentence =
    selection?.length > 1
      ? `${selection.length} selected ${selectionType}s`
      : `selected ${selectionType || 'instance'}`;

  return (
    <div className={`${bemClassConditionalModifier('log', 'compact', isCompact)} ${className}`}>
      {!locked && (
        <div className="log__editing-actions">
          <Button type="link" size="small" onClick={handleEditAll} disabled={!Boolean(selection?.length)}>
            Edit {actionSentence}
          </Button>
          <Button type="link" size="small" onClick={handleDeselectAll} disabled={!Boolean(selection?.length)}>
            Deselect {actionSentence}
          </Button>
          {!isCompact && (
            <Button
              type="link"
              size="small"
              onClick={handleMergeAll}
              disabled={selection?.length < 2 || selectionType === 'part'}
            >
              Merge {selectionType}s
            </Button>
          )}
          <div>
            Compact View <Switch defaultChecked={isCompact} onChange={onSwitchLogView} size="small" />
          </div>
        </div>
      )}

      <ul className={bemClassConditionalModifier('log__sections', 'compact', isCompact)}>
        {song?.sectionsIds?.map((sectionId) => {
          const section = sections[sectionId];

          if (locked) {
            return (
              <LogSection.Distribute
                key={section.key}
                section={section}
                seekAndPlay={seekAndPlay}
                assignMembers={assignMembers}
                onLineSelection={onLineSelection}
              />
            );
          }

          if (isCompact) {
            return (
              <LogSection.Compact
                key={section.key}
                section={section}
                onCheckboxChange={onCheckboxChange}
                onListSelection={onListSelection}
                seekAndPlay={seekAndPlay}
              />
            );
          }

          return (
            <LogSection.Edit
              key={section.key}
              section={section}
              onCheckboxChange={onCheckboxChange}
              onListSelection={onListSelection}
              onShowModal={onShowModal}
              seekAndPlay={seekAndPlay}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Log;
