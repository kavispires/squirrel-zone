import React, { useCallback, useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// Design Resources
import { notification } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';

const openNotification = ({ message, type }, onClose) => {
  notification[type ?? 'info']({
    message: `${message}`,
    duration: type === 'error' ? 0 : 30,
    onClose: onClose,
  });
};

function Notification() {
  const [notification, setNotification] = useGlobalState('notification');

  const onClose = useCallback(() => {
    setNotification({ message: null, type: 'info' });
  }, [setNotification]);

  useEffect(() => {
    if (notification?.message) {
      openNotification(notification, onClose);
    }
  }, [notification, onClose]);

  return <span></span>;
}

export default Notification;
