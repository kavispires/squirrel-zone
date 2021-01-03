import React, { useState, useEffect, useCallback } from 'react';

// Design Resources
import { Button } from 'antd';
import { ClockCircleOutlined, DeleteFilled } from '@ant-design/icons';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import { bemClass, getBemModifier, getTimestampDuration } from '../../utils';
import { deserializeKey } from '../../utils/distributor';

function TimestampsBank() {
  const [unassignedTimestamps, setUnassignedTimestamps] = useDistributorState('unassignedTimestamps');
  const [selection, setSelection] = useDistributorState('selection');
  const [selectedTimestamps, setSelectedTimestamps] = useDistributorState('selectedTimestamps');
  const [parts] = useDistributorState('parts');

  const [isPointAndClickOn, setIsPointClickOn] = useState(false);
  const [isOnlyPartsSelection, setIsOnlyPartsSelection] = useState(false);
  const [isTimestampDeleteOn, setIsTimestampDeleteOn] = useState(false);

  // Check if selection exists and it is only parts
  useEffect(() => {
    setIsOnlyPartsSelection(Boolean(selection && selection?.[0]?.startsWith('part')));
  }, [selection, setIsOnlyPartsSelection]);

  useEffect(() => {
    if (selectedTimestamps.length === 0) {
      setIsPointClickOn(false);
      setIsTimestampDeleteOn(false);
    }
  }, [selectedTimestamps]);

  const onToggleTimestampSelection = useCallback(
    (timestamp, selectedClass) => {
      setSelectedTimestamps((sts) => {
        if (selectedClass) {
          return [...sts].filter((ts) => ts.id !== timestamp.id);
        }
        const arr = [...sts];
        arr.push(timestamp);

        return arr;
      });
    },
    [setSelectedTimestamps]
  );

  const unassignedTimestampsArray = Object.values(unassignedTimestamps);

  const onToggleSequentialPointAndClick = useCallback(() => {
    if (isPointAndClickOn) {
      setSelectedTimestamps([]);
      setIsPointClickOn(false);
    } else {
      setSelectedTimestamps(unassignedTimestampsArray);
      setIsPointClickOn(true);
    }
  }, [isPointAndClickOn, setSelectedTimestamps, unassignedTimestampsArray]);

  const deleteAllUnassignedTimestamps = useCallback(() => {
    const confirmation = window.confirm('Are you sure you want to delete all unassigned timestamps?');
    if (confirmation) {
      setUnassignedTimestamps({});
    }
  }, [setUnassignedTimestamps]);

  const onToggleTimestampDelete = useCallback(() => {
    setIsTimestampDeleteOn((state) => !state);
  }, []);

  const onTimestampClick = useCallback(
    (timestamp, selectedClass) => {
      if (isTimestampDeleteOn) {
        setUnassignedTimestamps((state) => {
          const obj = { ...state };
          delete obj[timestamp.id];
          return obj;
        });
      } else {
        onToggleTimestampSelection(timestamp, selectedClass);
      }
    },
    [isTimestampDeleteOn, setUnassignedTimestamps, onToggleTimestampSelection]
  );

  const onPerformLinearSync = useCallback(() => {
    // Loop through unassigned timestamps and assigned to each selection
    const complete = unassignedTimestampsArray.map((timestamp, index) => {
      const partKey = selection[index];
      const [, partId] = deserializeKey(partKey);
      const part = parts[partId];
      part.updateTimestamp(timestamp);
      return true;
    });

    if (complete.length === unassignedTimestampsArray.length) {
      // Deselect all
      setUnassignedTimestamps({});
      setSelection([]);
    }
  }, [parts, selection, setSelection, setUnassignedTimestamps, unassignedTimestampsArray]);

  return (
    <div className="distributor-grid__timestamps timestamps-bank">
      <h4 className="timestamps-bank__title">Available Timestamps ({unassignedTimestampsArray.length})</h4>

      <ul className="timestamps-bank__list">
        {unassignedTimestampsArray.map((timestamp) => {
          const selectedIndex = selectedTimestamps?.findIndex((ts) => ts.id === timestamp.id);

          const selectedClass = getBemModifier(selectedIndex !== -1, 'selected');

          const activeClass = getBemModifier(selectedTimestamps[0]?.id === timestamp.id, 'active');

          return (
            <li key={timestamp.id} className="timestamps-bank__item">
              <Button
                shape="round"
                size="small"
                icon={isTimestampDeleteOn ? <DeleteFilled /> : <ClockCircleOutlined />}
                className={bemClass('timestamps-bank__button', selectedClass, activeClass)}
                onClick={() => onTimestampClick(timestamp, selectedClass)}
              >
                {getTimestampDuration(timestamp)} ms
                {selectedIndex !== -1 && (
                  <span className="timestamps-bank__button-index">({selectedIndex + 1})</span>
                )}
              </Button>
            </li>
          );
        })}
      </ul>

      <h4 className="timestamps-bank__title">Syncing Options</h4>
      <p className="timestamps-bank__description">
        You may click on a timestamp and then click on a part to attach it automatically.
      </p>
      <Button
        type="default"
        block
        disabled={!isOnlyPartsSelection || selection.length !== unassignedTimestampsArray.length}
        onClick={onPerformLinearSync}
      >
        Linear Sync to Selected Parts
        {isOnlyPartsSelection && `(${selection.length}-${unassignedTimestampsArray.length})`}
      </Button>
      <p className="timestamps-bank__description">
        Select Part checkboxes on the Lyrics on the right. All timestamps will be automatically synced in the
        order checkboxes were selected.
      </p>
      <Button
        type="default"
        block
        onClick={onToggleSequentialPointAndClick}
        className={isPointAndClickOn ? 'timestamps-bank__point-and-click-button' : ''}
        disabled={!unassignedTimestampsArray.length}
      >
        Sequential Point and Click Sync{isPointAndClickOn && ': ON'}
      </Button>
      <p className="timestamps-bank__description">
        Engine will activate each timestamp in sequence and will select the next timestamp after you click on
        a part to attach it.
      </p>

      <Button
        type="default"
        danger
        block
        onClick={onToggleTimestampDelete}
        className={isTimestampDeleteOn ? 'timestamps-bank__delete-button' : ''}
        disabled={!unassignedTimestampsArray.length}
      >
        Toggle Timestamp Deletion
      </Button>
      <p className="timestamps-bank__description">Instantly delete timestamps by clicking on them.</p>
      <Button
        type="primary"
        danger
        block
        onClick={deleteAllUnassignedTimestamps}
        disabled={!unassignedTimestampsArray.length}
      >
        Delete All Unassigned Timestamps
      </Button>
      <p className="timestamps-bank__description">Deletes all unassigned timestamps at once. Be careful.</p>
    </div>
  );
}

export default TimestampsBank;
