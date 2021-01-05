import React, { useCallback } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Divider, Tooltip, Progress, TimePicker } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';

function SongMetadata() {
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');

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
          <Button type="primary" disabled={!song?.completion} onClick={() => setStep(5)}>
            Next Step: Save On Database
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SongMetadata;
