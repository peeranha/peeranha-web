import { timeConverter } from 'utils/converters';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNotificationsDomain = state =>
  state.get('notifications', initialState).toJS();

const selectAllNotificationsInfo = createSelector(
  selectNotificationsDomain,
  substate => (substate.all.toJS ? substate.all.toJS() : substate.all),
);

const selectUnreadNotificationsInfo = createSelector(
  selectNotificationsDomain,
  substate => (substate.unread.toJS ? substate.unread.toJS() : substate.unread),
);

const selectNotifications = createSelector(
  selectNotificationsDomain,
  substate => substate.notifications,
);

const selectUnreadTimestamps = createSelector(
  selectUnreadNotificationsInfo,
  substate => substate.timestamps,
);

export const selectAllNotificationsLoading = () =>
  createSelector(selectAllNotificationsInfo, substate => substate.loading);

export const selectUnreadNotificationsLoading = () =>
  createSelector(selectUnreadNotificationsInfo, substate => substate.loading);

export const selectReadNotificationsAll = () =>
  createSelector(
    selectAllNotificationsInfo,
    substate => substate.readNotifications,
  );

export const selectReadNotificationsUnread = () =>
  createSelector(
    selectUnreadNotificationsInfo,
    substate => substate.readNotifications,
  );

export const selectAllNotifications = () =>
  createSelector(
    selectNotifications,
    makeSelectLocale(),
    (notifications, locale) =>
      Object.keys(notifications)
        .map(x => +x)
        .map(timestamp => ({
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
    (notifications, timestamps, locale) =>
      timestamps.map(t => ({
        ...notifications[t],
        time: timeConverter(t, locale),
      })),
  );

export const allNotificationsCount = () =>
  createSelector(selectAllNotificationsInfo, substate => substate.count);

export const unreadNotificationsCount = () =>
  createSelector(selectUnreadNotificationsInfo, substate => substate.count);

export const selectAllNotificationsLastTimestamp = () =>
  createSelector(
    selectAllNotificationsInfo,
    substate => substate.lastTimestamp,
  );

export const selectUnreadNotificationsLastTimestamp = () =>
  createSelector(
    selectUnreadNotificationsInfo,
    substate => substate.lastTimestamp,
  );

export const isInfoLoadedSelect = () =>
  createSelector(selectNotificationsDomain, substate => substate.isInfoLoaded);
