import React from 'react';

import useDistributorState from '../../states/useDistributorState';
import { Part, convertStoMS, store } from '../../utils/distributor';
import { useKeyDown, useKeyUp } from '../../utils/useKeypress';

// These variables are not using state since setState is asynchronous and is messing up with the time tracking
let keyPressing = false;
let tempPart = null;

function KeyCapture({ videoRef, isPlaying }) {
  const [assignee] = useDistributorState('assignee');
  const [, setUnassignedParts] = useDistributorState('unassignedParts');

  // Capture SPACE key down
  useKeyDown(' ', async (e) => {
    // Don't run if video is not playing
    if (!isPlaying) return;
    // Don't run if key is being captured
    if (keyPressing) return;
    // Don't run if a part is present
    if (tempPart) return;

    keyPressing = true;
    const newPart = new Part({ assignee });
    newPart.startTime = convertStoMS(await videoRef.current.internalPlayer.getCurrentTime());
    tempPart = newPart;
  });

  // Capture SPACE key up
  useKeyUp(' ', async (e) => {
    // Don't run if video is not playing
    if (!isPlaying) return;
    // Don't run if key is not being captured
    if (!keyPressing) return;
    // Don't run if a part is not present
    if (!tempPart) return;

    tempPart.endTime = convertStoMS(await videoRef.current.internalPlayer.getCurrentTime());

    store.add(tempPart.data);

    setUnassignedParts((state) => {
      state.push(tempPart.data);
      return state;
    });

    keyPressing = false;
    tempPart = null;
  });

  return <div className="distributor-grid__key-capture key-capture" />;
}

export default KeyCapture;
