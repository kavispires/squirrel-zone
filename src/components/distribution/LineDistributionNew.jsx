import React from 'react';

// Design Resources
import { Typography } from 'antd';
// Components
import ButtonContainer from '../ButtonContainer';
import LoadSongModal from '../modals/LoadSongModal';
// State
import { loadActiveSong } from '../../states/functions';

function LineDistributionNew({ onLoadNewSong }) {
  return (
    <section className="line-distribution-new">
      <Typography.Title level={3}>New Distribution</Typography.Title>
      <Typography.Paragraph>
        Load the song you want to use in this distribution by clicking on the button
      </Typography.Paragraph>
      <ButtonContainer alignment="center">
        <LoadSongModal onLoad={loadActiveSong} onAfterLoad={onLoadNewSong} />
      </ButtonContainer>
      <Typography.Paragraph>
        After you select the song, you will be automatically redirected to the Edit tab.
      </Typography.Paragraph>
    </section>
  );
}

export default LineDistributionNew;
