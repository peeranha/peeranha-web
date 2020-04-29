/*
 *
 * ForgotPassword reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  SET_READ_NOTIFICATIONS,
} from './constants';

export const initialState = fromJS({
  notifications: [],
  readNotifications: [0, 0],
  loading: false,
});

function notifiationsReducer(state = initialState, action) {
  const { type, readNotifications, notifications } = action;

  switch (type) {
    case SET_READ_NOTIFICATIONS:
      return state.set('readNotifications', readNotifications);

    case LOAD_MORE_NOTIFICATIONS:
      return state.set('loading', true);
    case LOAD_MORE_NOTIFICATIONS_SUCCESS:
      return state.set('notifications', notifications).set('loading', false);

    default:
      return state;
  }
}

export default notifiationsReducer;
