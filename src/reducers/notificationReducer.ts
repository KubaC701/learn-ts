import { v4 as uuid } from 'uuid';

import { Notification, NotificationActions } from '../types/Notifications';

export default (state: Notification[], action: NotificationActions): Notification[] => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.notification, id: uuid() }];
    case 'REMOVE_NOTIFICATION':
      return state.filter((notification) => notification.id !== action.id);
    default:
      return state;
  }
};
