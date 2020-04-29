import { call, put, takeLatest, select } from 'redux-saga/effects';

import { getFormattedDate } from 'utils/datetime';
import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
} from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import _random from 'lodash/random';

import { LOAD_MORE_NOTIFICATIONS } from './constants';

import { selectNotifications } from './selectors';

import {
  loadMoreNotificationsErr,
  loadMoreNotificationsSuccess,
} from './actions';

export function* loadMoreNotificationsWorker({ init }) {
  try {
    const now = new Date();
    const locale = yield select(makeSelectLocale());
    const notification = yield select(selectNotifications());
    yield call(() => new Promise(res => setTimeout(res, 2000)))
    if (init && notification.length) {
      return;
    }

    const newNotifications = Array.from(new Array(50).keys()).map(() => ({
      read: Math.random() > 0.5,
      type: Math.round(Math.random() * 7) + 1,
      date: (new Date().valueOf() / 1000) * _random(0.9999999, 1),
      data: {
        text: `${Math.random()}`,
      },
    }));

    yield put(
      loadMoreNotificationsSuccess(
        [...notification, ...newNotifications].map(({ date, ...rest }) => {
          const t = new Date(date * 1000);
          const dMins = (now - t) / 6e4;
          const dHours = Math.round(dMins / 60);

          const time = {};
          if (dMins < 1) {
            time.rightNow = true;
          } else if (dMins < 60) {
            time.minutes = Math.round(dMins);
          } else if (dHours < now.getHours()) {
            time.hours = dHours;
          } else if (dHours > now.getHours() && dHours < 48) {
            time.yesterday = true;
          } else if (t.getFullYear() === now.getFullYear()) {
            time.fullDate = getFormattedDate(
              date,
              locale,
              MONTH_3LETTERS__DAY_TIME,
            );
          } else {
            time.fullDate = getFormattedDate(
              date,
              locale,
              MONTH_3LETTERS__DAY_YYYY_TIME,
            );
          }

          return {
            time,
            date,
            ...rest,
          };
        }),
      ),
    );
  } catch (e) {
    yield put(loadMoreNotificationsErr(e));
  }
  /*


 */
}

export default function*() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotificationsWorker);
}
