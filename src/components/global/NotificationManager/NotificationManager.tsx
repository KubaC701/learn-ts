import BaseNotification from '../../base/BaseNotification/BaseNotification';

import useNotificationContext from '../../../hooks/useNotificationContext';

import './NotificationManager.scss';

const NotificationManager = (): JSX.Element => {
  const { notifications } = useNotificationContext();
  return (
    <div className="notification-manager">
      {notifications.map((notification) => (
        <BaseNotification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationManager;
