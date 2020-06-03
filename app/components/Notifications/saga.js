import { call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { delay } from 'utils/reduxUtils';
import _cloneDeep from 'lodash/cloneDeep';
import {
  callService,
  NOTIFICATIONS_GET_SERVICE,
  NOTIFICATIONS_READ_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';
import { getNotificationsInfo } from 'utils/profileManagement';

import {
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_UNREAD_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  MARK_AS_READ_DELAY,
  MARK_AS_READ_NOTIFICATIONS_ALL,
  MARK_AS_READ_NOTIFICATIONS_UNREAD,
  NOTIFICATIONS_REQUEST_LIMIT,
} from './constants';

import {
  allNotificationsCount,
  isInfoLoadedSelect,
  selectAllNotifications,
  selectAllNotificationsLastTimestamp,
  selectReadNotificationsAll,
  selectReadNotificationsUnread,
  selectUnreadNotifications,
  selectUnreadNotificationsLastTimestamp,
  unreadNotificationsCount,
} from './selectors';

import {
  loadMoreNotificationsErr,
  loadMoreNotificationsSuccess,
  loadMoreUnreadNotificationsErr,
  loadMoreUnreadNotificationsSuccess,
  markAllNotificationsAsReadErr,
  markAllNotificationsAsReadSuccess,
  markAsReadErr,
  markAsReadSuccess,
  setNotificationsInfo,
} from './actions';
import { titleConverterMapper } from './utils';

export function* loadMoreNotificationsWorker() {
  try {
    const now = new Date();
    const { user } = yield select(makeSelectProfileInfo());
    const notifications = yield select(selectAllNotifications());
    const lastTimestamp = yield select(selectAllNotificationsLastTimestamp());
    const count = yield select(allNotificationsCount());
    const isInfoLoaded = yield select(isInfoLoadedSelect());

    if (notifications.length === count && isInfoLoaded) {
      yield put(loadMoreNotificationsSuccess([]));
      return;
    }

    const response = yield call(
      callService,
      NOTIFICATIONS_GET_SERVICE,
      {
        user,
        all: true,
        limit: NOTIFICATIONS_REQUEST_LIMIT,
        timestamp:
          !notifications.length || !lastTimestamp
            ? Math.round(now.valueOf() / 1000)
            : lastTimestamp,
      },
      true,
    );
    const newNotifications = response.OK ? response.body.notifications : [];

    if (newNotifications.length) {
      yield put(
        loadMoreNotificationsSuccess(
          newNotifications.map(titleConverterMapper),
        ),
      );
    } else {
      yield put(loadMoreNotificationsSuccess([]));
    }
  } catch (e) {
    yield put(loadMoreNotificationsErr(e));
  }
}

export function* loadMoreUnreadNotificationsWorker() {
  try {
    const now = new Date();
    const { user } = yield select(makeSelectProfileInfo());
    const notifications = yield select(selectUnreadNotifications());
    const lastTimestamp = yield select(
      selectUnreadNotificationsLastTimestamp(),
    );
    const count = yield select(unreadNotificationsCount());
    const isInfoLoaded = yield select(isInfoLoadedSelect());

    if (notifications.length === count && isInfoLoaded) {
      yield put(loadMoreUnreadNotificationsSuccess([]));
      return;
    }

    const response = yield call(
      callService,
      NOTIFICATIONS_GET_SERVICE,
      {
        user,
        all: false,
        limit: 5 || NOTIFICATIONS_REQUEST_LIMIT,
        timestamp: !notifications.length
          ? Math.round(now.valueOf() / 1000)
          : lastTimestamp,
      },
      true,
    );
    const newNotifications = response.OK ? response.body.notifications : [];

    if (newNotifications.length) {
      yield put(
        loadMoreUnreadNotificationsSuccess(
          newNotifications.map(titleConverterMapper),
        ),
      );
    } else {
      yield put(loadMoreUnreadNotificationsSuccess([]));
    }
  } catch (e) {
    yield put(loadMoreUnreadNotificationsErr(e));
  }
}

export function* getNotificationsInfoWorker(user) {
  const notificationsInfo = yield call(getNotificationsInfo, user);

  yield put(setNotificationsInfo(notificationsInfo));

  if (notificationsInfo.unread) {
    yield call(loadMoreUnreadNotificationsWorker);
  }
}

export function* markAllAsReadWorker() {
  try {
    const { user } = yield select(makeSelectProfileInfo());

    const response = yield call(
      callService,
      NOTIFICATIONS_READ_SERVICE,
      {
        user,
        markAllAsRead: true,
      },
      true,
    );
    if (response.OK) {
      yield put(markAllNotificationsAsReadSuccess());
    } else {
      throw new Error(response);
    }
  } catch (e) {
    yield put(markAllNotificationsAsReadErr());
  }
}

export function* markAsRead(notifications, first, last, leave = false) {
  try {
    yield delay(MARK_AS_READ_DELAY);
    const { user } = yield select(makeSelectProfileInfo());
    const timestamps = _cloneDeep(notifications)
      .splice(first, last + 1)
      .filter(({ read }) => !read)
      .map(({ timestamp }) => timestamp);

    if (timestamps.length) {
      const response = yield call(
        callService,
        NOTIFICATIONS_READ_SERVICE,
        {
          user,
          timestamps,
          markAllAsRead: false,
        },
        true,
      );

      if (response.OK) {
        yield put(markAsReadSuccess(timestamps, leave));
      } else {
        throw new Error(response);
      }
    }
  } catch (e) {
    yield put(markAsReadErr(e));
  }
}

export function* markAsReadAllWorker() {
  const [first, last] = yield select(selectReadNotificationsAll());
  const notifications = yield select(selectAllNotifications());

  yield call(markAsRead, notifications, first, last);
}

export function* markAsReadUnreadWorker() {
  const [first, last] = yield select(selectReadNotificationsUnread());
  const notifications = yield select(selectUnreadNotifications());

  yield call(markAsRead, notifications, first, last, true);
}

export default function*() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotificationsWorker);
  yield takeLatest(
    LOAD_MORE_UNREAD_NOTIFICATIONS,
    loadMoreUnreadNotificationsWorker,
  );
  yield takeLatest(MARK_ALL_NOTIFICATIONS_AS_READ, markAllAsReadWorker);
  yield takeLatest(MARK_AS_READ_NOTIFICATIONS_ALL, markAsReadAllWorker);
  yield takeLatest(MARK_AS_READ_NOTIFICATIONS_UNREAD, markAsReadUnreadWorker);
}
