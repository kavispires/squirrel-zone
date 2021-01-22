import React, { Fragment } from 'react';

// Design Resources
import { Spin } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';

function LoadingContainer({ children, waitFor, size = 'large' }) {
  const [isLoading] = useGlobalState('isLoading');

  if (isLoading || !waitFor) {
    return (
      <div className="loading-container">
        <Spin size={size} />
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
}

export default LoadingContainer;
