import {
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_NOTIFICATIONS_ERROR,
  LOAD_MORE_UNREAD_NOTIFICATIONS,
  LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR,
  MARK_AS_READ_NOTIFICATIONS_ALL,
  MARK_AS_READ_NOTIFICATIONS_UNREAD,
  MARK_AS_READ_SUCCESS,
  MARK_AS_READ_ERROR,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_AS_READ_ERROR,
  SET_NOTIFICATIONS_INFO,
  CLEAR_NOTIFICATIONS_DATA,
  FILTER_UNREAD_TIMESTAMPS,
} from './constants';

export const markAllNotificationsAsRead = () => ({
  type: MARK_ALL_NOTIFICATIONS_AS_READ,
});

export const markAllNotificationsAsReadSuccess = () => ({
  type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
});

export const markAllNotificationsAsReadErr = () => ({
  type: MARK_ALL_NOTIFICATIONS_AS_READ_ERROR,
});

export const loadMoreNotifications = () => ({
  type: LOAD_MORE_NOTIFICATIONS,
});

export const loadMoreUnreadNotifications = () => ({
  type: LOAD_MORE_UNREAD_NOTIFICATIONS,
});

export const loadMoreUnreadNotificationsSuccess = notifications => ({
  type: LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const loadMoreUnreadNotificationsErr = loadMoreUnreadNotificationsError => ({
  type: LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR,
  loadMoreUnreadNotificationsError,
});

export const loadMoreNotificationsSuccess = notifications => ({
  type: LOAD_MORE_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const loadMoreNotificationsErr = loadMoreNotificationsError => ({
  type: LOAD_MORE_NOTIFICATIONS_ERROR,
  loadMoreNotificationsError,
});

export const markAsReadNotificationsAll = readNotifications => ({
  type: MARK_AS_READ_NOTIFICATIONS_ALL,
  readNotifications,
});

export const markAsReadNotificationsUnread = readNotifications => ({
  type: MARK_AS_READ_NOTIFICATIONS_UNREAD,
  readNotifications,
});

export const markAsReadSuccess = (timestamps, leave) => ({
  type: MARK_AS_READ_SUCCESS,
  timestamps,
  leave,
});

export const markAsReadErr = markAsReadError => ({
  type: MARK_AS_READ_ERROR,
  markAsReadError,
});

export const setNotificationsInfo = info => ({
  type: SET_NOTIFICATIONS_INFO,
  ...info,
});

export const clearNotificationsData = () => ({
  type: CLEAR_NOTIFICATIONS_DATA,
});

export const filterUnreadTimestamps = () => ({
  type: FILTER_UNREAD_TIMESTAMPS,
});
