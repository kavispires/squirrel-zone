import React, { useCallback, useEffect } from 'react';

// Design Resources
import { notification } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';

const openNotification = ({ message, description, type = 'info' }, onClose) => {
  notification[type ?? 'info']({
    message: message ?? 'I suspect that...',
    description: description ?? 'Something wrong might not be right',
    duration: type === 'error' ? 0 : 10,
    onClose: onClose,
    placement: 'bottomLeft',
  });
};

function Notification() {
  const [notification, setNotification] = useGlobalState('notification');

  const onClose = useCallback(() => {
    setNotification({ message: null, description: null, type: 'info' });
  }, [setNotification]);

  useEffect(() => {
    if (notification?.message) {
      openNotification(notification, onClose);
    }
  }, [notification, onClose]);

  return <span></span>;
}

export default Notification;
