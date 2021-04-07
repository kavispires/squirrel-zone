import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Steps } from 'antd';
// Components
const { Step } = Steps;

function StepperProgress({ currentStep }) {
  return (
    <Steps current={Number(currentStep)} className="stepper-progress" size="small">
      <Step title="Load Song" />
      <Step title="Lyrics & Sections" />
      <Step title="Time & Sync" />
      <Step title="Preview" />
      <Step title="Song Metadata" />
      <Step title="Save" />
    </Steps>
  );
}

StepperProgress.propTypes = {
  currentStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default StepperProgress;
