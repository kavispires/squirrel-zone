import React, { useState } from 'react';

// Design Resources
import { Button, Divider, Tooltip, Progress } from 'antd';
// State
import useLoadingState from '../../states/useLoadingState';
import useDistributorState from '../../states/useDistributorState';
// API
import API from '../../adapters';

function SaveSong() {
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [isSongLoading] = useLoadingState('isSongLoading');

  const [success, setSuccess] = useState(false);

  const onSave = async () => {
    try {
      song.sort();
      await API.saveSong(song.serialize());
      setSuccess(true);
      setStep(0);
    } catch (_) {}
  };

  return (
    <div className="song-metadata">
      <h2 className="song-metadata__title">Save to Database</h2>

      <div className="song-metadata__actions">
        <Divider />
        <Tooltip title="Song Completion Rate">
          <Progress percent={song?.completion} />
        </Tooltip>
        <Divider />
        <div className="song-metadata__action">
          <Button type="primary" disabled={isSongLoading ?? success} onClick={onSave}>
            Save On Database
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SaveSong;
