import {
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_ERROR,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  SET_READ_NOTIFICATIONS,
} from './constants';

export const markAllNotificationsAsRead = () => ({
  type: MARK_ALL_NOTIFICATIONS_AS_READ,
});

export const loadMoreNotifications = (init = false) => ({
  type: LOAD_MORE_NOTIFICATIONS,
  init,
});

export const loadMoreNotificationsSuccess = notifications => ({
  type: LOAD_MORE_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const loadMoreNotificationsErr = loadMoreNotificationsError => ({
  type: LOAD_MORE_NOTIFICATIONS_ERROR,
  loadMoreNotificationsError,
});

export const setReadNotifications = readNotifications => ({
  type: SET_READ_NOTIFICATIONS,
  readNotifications,
});
