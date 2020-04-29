import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNotificationsDomain = state =>
  state.get('notifications', initialState).toJS();

export const selectNotificationsLoading = () =>
  createSelector(selectNotificationsDomain, substate => substate.loading);

export const selectReadNotifications = () =>
  createSelector(
    selectNotificationsDomain,
    substate => substate.readNotifications,
  );

export const selectNotifications = () =>
  createSelector(selectNotificationsDomain, substate => substate.notifications);
