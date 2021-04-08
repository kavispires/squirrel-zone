import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Divider } from 'antd';

function StepActions({ children, className = '' }) {
  return (
    <div className={`distributor-step-actions ${className}`}>
      <Divider />
      {children}
    </div>
  );
}

StepActions.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

StepActions.defaultProps = {
  className: '',
};

export default StepActions;
