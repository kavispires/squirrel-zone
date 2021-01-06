import React, { useCallback, useState } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Divider, Tooltip, Progress, TimePicker } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// API
import API from '../../api';
import useGlobalState from '../../states/useGlobalState';

function SaveSong() {
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [isLoading] = useGlobalState('isLoading');

  const [success, setSuccess] = useState(false);

  const onSave = async () => {
    try {
      await API.saveSong(song.serialize());
      setSuccess(true);
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
          <Button type="primary" disabled={isLoading || success} onClick={onSave}>
            Save On Database
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SaveSong;
