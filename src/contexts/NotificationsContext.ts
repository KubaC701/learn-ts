import { createContext } from 'react';

import { NotificationReducer } from '../types/Notifications';

const NotificationsContext = createContext<NotificationReducer>({} as NotificationReducer);

export default NotificationsContext;
