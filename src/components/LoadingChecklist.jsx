import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import { CheckOutlined, SyncOutlined } from '@ant-design/icons';

function LoadingChecklist({ list, children }) {
  const isFullyLoaded = list.every((item) => Boolean(item.value));

  if (isFullyLoaded) {
    return <>{children}</>;
  }

  return (
    <div className="loading-checklist">
      <div className="loading-checklist__title">
        <Spin size="large" />
        <h2>Loading resources...</h2>
      </div>
      <List
        className="loading-checklist__list"
        bordered
        itemLayout="horizontal"
        dataSource={list}
        size="small"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.value ? <CheckOutlined style={{ color: '#52c41a' }} /> : <SyncOutlined spin />}
              title={item.text}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

LoadingChecklist.propTypes = {
  children: PropTypes.element,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.any,
    }).isRequired
  ),
};

export default LoadingChecklist;
