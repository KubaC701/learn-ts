import { useCallback, useEffect } from 'react';

import useNotificationContext from '../../../hooks/useNotificationContext';

import { Notification } from '../../../types/Notifications';

import './BaseNotification.scss';

const BaseNotification = ({ notification }: { notification: Notification }): JSX.Element => {
  const TIME_TO_DISPLAY = 5000;
  const { dispatchNotifications } = useNotificationContext();

  const removeNotification = useCallback(() => {
    dispatchNotifications({ id: notification.id, type: 'REMOVE_NOTIFICATION' });
  }, [dispatchNotifications, notification.id]);

  useEffect(() => {
    const timeout = setTimeout(removeNotification, TIME_TO_DISPLAY);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeNotification]);

  return (
    <div className={`base-notification base-notification--${notification.status}`} role="alert">
      {notification.status === 'success' && (
        <img alt="" className="base-notification__status-icon" src="/icons/checkmark.svg" />
      )}
      {notification.status === 'error' && (
        <img alt="" className="base-notification__status-icon" src="/icons/error-white.svg" />
      )}
      <p className="base-notification__text">{notification.text}</p>
    </div>
  );
};

export default BaseNotification;
