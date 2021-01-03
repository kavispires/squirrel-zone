import React from 'react';

// Design Resources
import { Steps } from 'antd';
// Components
const { Step } = Steps;

function StepperProgress({ currentStep }) {
  return (
    <Steps progressDot current={Number(currentStep)} className="stepper-progress">
      <Step title="Load Song" />
      <Step title="Lyrics & Sections" />
      <Step title="Time & Sync" />
      <Step title="Preview" />
      <Step title="Song Metadata" />
      <Step title="Save" />
    </Steps>
  );
}

export default StepperProgress;
