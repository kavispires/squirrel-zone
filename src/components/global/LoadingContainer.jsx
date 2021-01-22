import React, { Fragment } from 'react';

// Design Resources
import { Spin } from 'antd';
import { FrownFilled } from '@ant-design/icons';
// State
import { reducerTypeMapping, useLoadingState } from '../../states/useLoadingState';

function LoadingContainer({ children, waitFor, noResults = false, forceLoading = false, size = 'large' }) {
  const [isLoading] = useLoadingState(reducerTypeMapping?.[waitFor] ?? 'isLoading');

  if (isLoading || forceLoading) {
    return (
      <div className="loading-container">
        <Spin size={size} />
      </div>
    );
  }

  if (noResults) {
    return (
      <div className="loading-container">
        <FrownFilled size={size} />
        <p className="loading-container__message">Something wrong is not right.</p>
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
}

export default LoadingContainer;
