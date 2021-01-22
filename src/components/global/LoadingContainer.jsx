import React, { Fragment } from 'react';

// Design Resources
import { Spin } from 'antd';
import { BorderOutlined } from '@ant-design/icons';
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
        <BorderOutlined />
        <p className="loading-container__message">No data to display</p>
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
}

export default LoadingContainer;
