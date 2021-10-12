import React from 'react';

// Design Resources
import { Button, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Components
import StepTitle from './StepTitle';
import StepActions from './StepActions';
import SongProgress from './SongProgress';

function Adjustments() {
  const [, setStep] = useDistributorState('step');

  return (
    <div className="adjustments">
      <StepTitle>Adjustments</StepTitle>

      <Typography.Paragraph>TBD. Nudge entire song?</Typography.Paragraph>

      <SongProgress />

      <StepActions>
        <Button type="primary" onClick={() => setStep(5)}>
          Next Step: Metadata & Save
        </Button>
      </StepActions>
    </div>
  );
}

export default Adjustments;
