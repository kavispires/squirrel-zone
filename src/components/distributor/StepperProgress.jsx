import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Steps } from 'antd';
import { DISTRIBUTOR_STEPS } from '../../utils/constants';
// Components
const { Step } = Steps;

function StepperProgress({ currentStep, setStep, disabledSteps }) {
  return (
    <Steps current={Number(currentStep)} className="stepper-progress" size="small" onChange={setStep}>
      {DISTRIBUTOR_STEPS.map((step, index) => (
        <Step key={step} title={step} disabled={disabledSteps[index]} />
      ))}
    </Steps>
  );
}

StepperProgress.propTypes = {
  currentStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStep: PropTypes.func,
  disabledSteps: PropTypes.array,
};

StepperProgress.defaultProps = {
  disabledSteps: [],
};

export default StepperProgress;
