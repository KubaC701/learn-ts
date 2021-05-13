import { useContext } from 'react';

import NotificationsContext from '../contexts/NotificationsContext';

import { NotificationReducer } from '../types/Notifications';

export default (): NotificationReducer => useContext(NotificationsContext);
