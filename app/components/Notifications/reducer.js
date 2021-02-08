import { fromJS } from 'immutable';

import _uniq from 'lodash/uniq';
import _update from 'lodash/update';
import _isPlainObject from 'lodash/isPlainObject';

import {
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_NOTIFICATIONS_ERROR,
  SET_NOTIFICATIONS_INFO,
  LOAD_MORE_UNREAD_NOTIFICATIONS,
  LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR,
  CLEAR_NOTIFICATIONS_DATA,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  MARK_AS_READ_NOTIFICATIONS_ALL,
  MARK_AS_READ_NOTIFICATIONS_UNREAD,
  MARK_AS_READ_SUCCESS,
  FILTER_READ_TIMESTAMPS,
} from './constants';

const initialStateObject = {
  all: {
    count: 0,
    lastTimestamp: 0,
    loading: false,
    readNotifications: [0, 0],
  },
  unread: {
    count: 0,
    lastTimestamp: 0,
    loading: false,
    timestamps: [],
    readNotifications: [0, 0],
  },
  notifications: {},
  readTimestamps: [],
  isInfoLoaded: false,
  loadMoreNotificationsError: null,
  loadMoreUnreadNotificationsErr: null,
};

export const initialState = fromJS(initialStateObject);

function notificationsReducer(state = initialState, action) {
  const {
    all,
    type,
    unread,
    timestamps,
    notifications = [],
    readNotifications,
    loadMoreNotificationsError,
    loadMoreUnreadNotificationsErr,
  } = action;
  const allSubState = state.get('all')?.toJS
    ? state.get('all').toJS()
    : state.get('all');
  const unreadSubState = state.get('unread')?.toJS
    ? state.get('unread').toJS()
    : state.get('unread');
  const n = state.get('notifications');

  const stateNotifications = !_isPlainObject(n) ? {} : n;

  const stateReadTimestamps = state.get('readTimestamps')?.toJS
    ? state.get('readTimestamps').toJS()
    : state.get('readTimestamps');

  switch (type) {
    case MARK_AS_READ_NOTIFICATIONS_ALL:
      return state.set('all', { ...allSubState, readNotifications });
    case MARK_AS_READ_NOTIFICATIONS_UNREAD:
      return state.set('unread', { ...unreadSubState, readNotifications });
    case MARK_AS_READ_SUCCESS:
      return state
        .set('notifications', { ...stateNotifications })
        .set('readTimestamps', _uniq(stateReadTimestamps.concat(timestamps)));
    case LOAD_MORE_NOTIFICATIONS:
      return state.set('all', {
        ...allSubState,
        loading: true,
      });
    case LOAD_MORE_NOTIFICATIONS_SUCCESS:
      if (notifications.length) {
        notifications.forEach(notification => {
          if (!stateNotifications[notification.timestamp]) {
            stateNotifications[notification.timestamp] = notification;
          }
        });
        return state
          .set('notifications', {
            ...stateNotifications,
          })
          .set('all', {
            ...allSubState,
            lastTimestamp:
              notifications[notifications.length - 1].timestamp - 1,
            loading: false,
          });
      }

      return state.set('all', { ...allSubState, loading: false });
    case LOAD_MORE_NOTIFICATIONS_ERROR:
      return state
        .set('all', {
          ...allSubState,
          loading: false,
        })
        .set('loadMoreNotificationsError', loadMoreNotificationsError);

    case LOAD_MORE_UNREAD_NOTIFICATIONS:
      return state.set('unread', {
        ...unreadSubState,
        loading: true,
      });
    case LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS:
      if (notifications.length) {
        const newNots = notifications.filter(
          ({ timestamp }) => !stateNotifications[timestamp],
        );
        newNots.forEach(notification => {
          stateNotifications[notification.timestamp] = notification;
        });

        return state
          .set('notifications', {
            ...stateNotifications,
          })
          .set('unread', {
            ...unreadSubState,
            timestamps: unreadSubState.timestamps.concat(
              newNots.map(({ timestamp }) => timestamp),
            ),
            lastTimestamp:
              notifications[notifications.length - 1].timestamp - 1,
            loading: false,
          });
      }

      return state.set('unread', { ...unreadSubState, loading: false });
    case LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR:
      return state
        .set('unread', {
          ...unreadSubState,
          loading: false,
        })
        .set('loadMoreUnreadNotificationsErr', loadMoreUnreadNotificationsErr);

    case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      Object.keys(stateNotifications).forEach(timestamp => {
        _update(stateNotifications, timestamp, notification => ({
          ...notification,
          read: true,
        }));
      });

      return state
        .set('unread', {
          count: 0,
          lastTimestamp: 0,
          loading: false,
          timestamps: [],
          readNotifications: [0, 0],
        })
        .set('notifications', { ...stateNotifications });

    case FILTER_READ_TIMESTAMPS:
      Object.keys(stateNotifications).forEach(timestamp => {
        if (stateReadTimestamps.includes(+timestamp)) {
          _update(stateNotifications, timestamp, notification => ({
            ...notification,
            read: true,
          }));
        }
      });

      return state
        .set('unread', {
          ...unreadSubState,
          readNotifications: [0, 0],
          count: Math.max(0, unreadSubState.count - stateReadTimestamps.length),
          timestamps: unreadSubState.timestamps.filter(
            timestamp => !stateNotifications[timestamp].read,
          ),
        })
        .set('readTimestamps', [])
        .set('notifications', stateNotifications);
    case SET_NOTIFICATIONS_INFO:
      return state
        .set('all', {
          ...allSubState,
          count: all,
        })
        .set('unread', {
          ...unreadSubState,
          count: unread,
        })
        .set('isInfoLoaded', true);

    case CLEAR_NOTIFICATIONS_DATA:
      return state
        .set('all', initialStateObject.all)
        .set('unread', initialStateObject.unread)
        .set('isInfoLoaded', initialStateObject.isInfoLoaded)
        .set('notifications', initialStateObject.notifications)
        .set(
          'loadMoreNotificationsError',
          initialStateObject.loadMoreNotificationsError,
        )
        .set(
          'loadMoreUnreadNotificationsErr',
          initialStateObject.loadMoreUnreadNotificationsErr,
        );

    default:
      return state;
  }
}

export default notificationsReducer;
