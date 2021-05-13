import { Dispatch } from 'react';

export interface NotificationToDispatch {
  status: 'success' | 'error';
  text: string;
}

export interface Notification extends NotificationToDispatch {
  id: string;
}

interface AddNotification {
  notification: NotificationToDispatch;
  type: 'ADD_NOTIFICATION';
}
interface RemoveNotification {
  id: string;
  type: 'REMOVE_NOTIFICATION';
}

export type NotificationActions = AddNotification | RemoveNotification;

export interface NotificationReducer {
  notifications: Notification[];
  dispatchNotifications: Dispatch<NotificationActions>;
}

export const initialNotifications = [];
