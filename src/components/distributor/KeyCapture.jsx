import React, { useEffect } from 'react';

// Design Resources
import { Button } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import { ASSIGNEE, ASSIGNEE_LABEL, convertStoMS, generateTempId } from '../../utils/distributor';
import { useKeyDown, useKeyUp } from '../../utils/useKeypress';
import { KEYS, KEY_ASSIGNEE } from '../../utils/constants';

// These variables are not using state since setState is asynchronous and is messing up with the time tracking
let playing = false;

const temp = {
  keyPressing: {},
  part: {},
};

async function handleActionDown(key, playerRef, assignee) {
  // Don't run if video is not playing
  if (!playing) return;
  // Don't run if this key is being captured
  if (temp.keyPressing[key]) return;
  // Don't run if a part for this key is present
  if (temp.part[key]) return;
  // Not allowed key
  if (!KEY_ASSIGNEE[key]) return;

  temp.keyPressing[key] = true;
  const newTimestamp = {
    startTime: convertStoMS(await playerRef.current.internalPlayer.getCurrentTime()),
    assignee: key === ' ' ? assignee : KEY_ASSIGNEE[key],
    partId: null,
    id: generateTempId(),
  };

  temp.part[key] = newTimestamp;
}

async function handleActionUp(key, playerRef) {
  // Don't run if video is not playing
  if (!playing) return;
  // Don't run if key is not being captured
  if (!temp.keyPressing[key]) return;
  // Don't run if a part is not present
  if (!temp.part[key]) return;
  // Not allowed key
  if (!KEY_ASSIGNEE[key]) return;

  temp.part[key].endTime = convertStoMS(await playerRef.current.internalPlayer.getCurrentTime());

  const copy = { ...temp.part[key] };
  temp.part[key] = null;
  temp.keyPressing[key] = null;
  return copy;
}

const ASSIGNEE_OPTIONS = Object.values(ASSIGNEE ?? {}).map((i) => ({ value: i, label: ASSIGNEE_LABEL[i] }));

function MouseButtons({ playerRef, isPlaying }) {
  const [assignee] = useDistributorState('assignee');
  const [, setUnassignedTimestamps] = useDistributorState('unassignedTimestamps');

  // Work around since useKeyDown is not capturing isPlaying correctly
  useEffect(() => {
    playing = isPlaying;
  }, [isPlaying]);

  // Capture Button Down
  const onCaptureButtonDown = async (key) => {
    await handleActionDown(key, playerRef, assignee);
  };

  const onCaptureButtonUp = async (key) => {
    const result = await handleActionUp(key, playerRef);

    if (result?.endTime) {
      setUnassignedTimestamps((state) => {
        state[result.id] = { ...result };
        return state;
      });
    }
  };

  return (
    <div className="key-capture-capture-buttons distributor-controls__buttons">
      {ASSIGNEE_OPTIONS.map((entry, index) => (
        <Button
          key={entry.value}
          onClick={() => {}}
          className={`distributor-controls__button assignee-background--${entry.value}`}
          onMouseDown={() => onCaptureButtonDown(entry.value)}
          onMouseUp={() => onCaptureButtonUp(entry.value)}
        >
          {index + 1} ({entry.label})
        </Button>
      ))}
    </div>
  );
}

function Keyboard({ playerRef, isPlaying }) {
  const [assignee] = useDistributorState('assignee');
  const [, setUnassignedTimestamps] = useDistributorState('unassignedTimestamps');

  // Work around since useKeyDown is not capturing isPlaying correctly
  useEffect(() => {
    playing = isPlaying;
  }, [isPlaying]);

  // Capture SPACE key down
  useKeyDown(KEYS, async (key) => {
    await handleActionDown(key, playerRef, assignee);
  });

  // Capture SPACE key up
  useKeyUp(KEYS, async (key) => {
    const result = await handleActionUp(key, playerRef);

    if (result?.endTime) {
      setUnassignedTimestamps((state) => {
        state[result.id] = { ...result };
        return state;
      });
    }
  });

  return <div className="distributor-grid__key-capture key-capture" />;
}

const KeyCapture = {
  Keyboard,
  MouseButtons,
};

export default KeyCapture;
