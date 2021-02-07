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
} from '../../utils/distributor';
import { bemClassConditionalModifier } from '../../utils';
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

  const onListSelection = (section) => {
    const partKeys = (section.partsIds ?? []).map((partId) => serializeKey('part', partId));
    setSelection((state) => {
      if (state[0] === partKeys[0]) {
        return [];
      } else {
        return partKeys;
      }
    });
  };

  return (
    <div className={`${bemClassConditionalModifier('log', 'compact', isCompact)} ${className}`}>
      {!locked && (
        <div className="log__editing-actions">
          <Button type="link" size="small" onClick={handleEditAll} disabled={!Boolean(selection?.length)}>
            Edit Selected Instances
          </Button>
          <Button type="link" size="small" onClick={handleDeselectAll} disabled={!Boolean(selection?.length)}>
            Deselect Selected Instances
          </Button>
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
