import { takeLatest, put, select } from 'redux-saga/effects';

import { ADD_TOAST, REMOVE_TIMEOUT } from './constants';
import { addToast, removeToast } from './actions';
import { makeSelectToasts } from './selectors';

export function* addToastWorker() {
  const toasts = yield select(makeSelectToasts());

  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, REMOVE_TIMEOUT);
  });

  const { toastKey } = toasts[toasts.length - 1];

  yield put(removeToast(toastKey));
}

export function* errorToastHandling(error) {
  const key = Object.keys(error).find(x => x.toLowerCase().match('err'));

  yield put(
    addToast({
      type: 'error',
      text: error[key],
    }),
  );
}

export default function*() {
  yield takeLatest(ADD_TOAST, addToastWorker);
}
