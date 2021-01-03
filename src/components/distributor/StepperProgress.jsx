import React from 'react';

// Design Resources
import { Steps } from 'antd';
// Components
const { Step } = Steps;

function StepperProgress({ currentStep }) {
  return (
    <Steps progressDot current={Number(currentStep)} className="stepper-progress">
      <Step title="Load Song" />
      <Step title="Lyrics and Sections" />
      <Step title="Capture Timestamps" />
      <Step title="Add Song Metadata" />
      <Step title="Preview" />
      <Step title="Save" />
    </Steps>
  );
}

export default StepperProgress;
