import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Typography } from 'antd';

function StepTitle({ children }) {
  return (
    <Typography.Title level={2} className="distributor-step-title">
      {children}
    </Typography.Title>
  );
}

StepTitle.propTypes = {
  children: PropTypes.element,
};

export default StepTitle;
