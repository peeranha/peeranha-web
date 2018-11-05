import { takeEvery, put, select } from 'redux-saga/effects';

import { ADD_TOAST, REMOVE_TIMEOUT } from './constants';
import { removeToast } from './actions';
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

export default function*() {
  yield takeEvery(ADD_TOAST, addToastWorker);
}
