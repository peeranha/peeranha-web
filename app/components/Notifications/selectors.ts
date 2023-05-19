import { createSelector } from 'reselect';
import { timeConverter } from 'utils/converters';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  AllNotifications,
  AllNotificationsInfo,
  Notification,
  UnreadNotificationsInfo,
} from './types';

import { initialState } from './reducer';

const selectNotificationsDomain = (state: any): AllNotifications =>
  state.get('notifications', initialState).toJS();

const selectAllNotificationsInfo = createSelector(
  selectNotificationsDomain,
  (subState): AllNotificationsInfo => (subState.all.toJS ? subState.all.toJS() : subState.all),
);

const selectUnreadNotificationsInfo = createSelector(
  selectNotificationsDomain,
  (subState): UnreadNotificationsInfo =>
    subState.unread.toJS ? subState.unread.toJS() : subState.unread,
);

const selectNotifications = createSelector(
  selectNotificationsDomain,
  (subState): { [notification: string]: Notification } => subState.notifications,
);

const selectUnreadTimestamps = createSelector(
  selectUnreadNotificationsInfo,
  (subState): number[] => subState.timestamps,
);

export const selectAllNotificationsLoading = () =>
  createSelector(selectAllNotificationsInfo, (subState): boolean => subState.loading);

export const selectUnreadNotificationsLoading = () =>
  createSelector(selectUnreadNotificationsInfo, (subState): boolean => subState.loading);

export const selectReadNotificationsAll = () =>
  createSelector(selectAllNotificationsInfo, (subState): number[] => subState.readNotifications);

export const selectReadNotificationsUnread = () =>
  createSelector(selectUnreadNotificationsInfo, (subState): number[] => subState.readNotifications);

export const selectAllNotifications = () =>
  createSelector(selectNotifications, makeSelectLocale(), (notifications, locale): Notification[] =>
    Object.keys(notifications)
      .map((notificationKey: string) => +notificationKey)
      .map((timestamp: number) => ({
        ...notifications[timestamp],
        time: timeConverter(timestamp, locale),
      }))
      .reverse(),
  );

export const selectUnreadNotifications = () =>
  createSelector(
    selectNotifications,
    selectUnreadTimestamps,
    makeSelectLocale(),
    (notifications, timestamps, locale): Notification[] =>
      timestamps.map((timestamp: number) => ({
        ...notifications[timestamp],
        time: timeConverter(timestamp, locale),
      })),
  );

export const allNotificationsCount = () =>
  createSelector(selectAllNotificationsInfo, (subState): number => subState.count);

export const unreadNotificationsCount = () =>
  createSelector(selectUnreadNotificationsInfo, (subState): number => subState.count);

export const selectAllNotificationsLastTimestamp = () =>
  createSelector(selectAllNotificationsInfo, (subState): number => subState.lastTimestamp);

export const selectUnreadNotificationsLastTimestamp = () =>
  createSelector(selectUnreadNotificationsInfo, (subState): number => subState.lastTimestamp);

export const isInfoLoadedSelect = () =>
  createSelector(selectNotificationsDomain, (subState): boolean => subState.isInfoLoaded);

export const getLastUser = () =>
  createSelector(selectNotificationsDomain, (subState): null | string => subState.lastUser);
