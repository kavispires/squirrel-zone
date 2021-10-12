import React from 'react';

// Design Resources
import { Divider, Progress, Tooltip } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
import { Fragment } from 'react';

function SongProgress() {
  const [song] = useDistributorState('song');

  return (
    <Fragment>
      <Divider />
      <Tooltip title="Sections Completion Rate">
        <Progress percent={song?.relationshipsCompletion} />
      </Tooltip>
    </Fragment>
  );
}

export default SongProgress;
