import { Notification } from '../types/Notifications';
import notificationReducer from './notificationReducer';

jest.mock('uuid', () => ({
  v4: () => 'id',
}));

test('should add a notification', () => {
  const defaultState: Notification[] = [];
  const state = notificationReducer(defaultState, {
    notification: { text: 'New notification', status: 'success' },
    type: 'ADD_NOTIFICATION',
  });
  expect(state).toEqual([{ id: 'id', text: 'New notification', status: 'success' }]);
});

test('should remove a notification with a given id', () => {
  const existingState: Notification[] = [
    { id: '1', text: 'Notification', status: 'error' },
    { id: '2', text: 'Notification to delete', status: 'error' },
  ];
  const state = notificationReducer(existingState, { id: '2', type: 'REMOVE_NOTIFICATION' });
  expect(state).toEqual([{ id: '1', text: 'Notification', status: 'error' }]);
});
