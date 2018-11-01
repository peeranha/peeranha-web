import { takeEvery, put } from 'redux-saga/effects';
import { ADD_TOAST, REMOVE_TIMEOUT } from './constants';
import { removeToast } from './actions';

export function* addToastWorker(res) {
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, REMOVE_TIMEOUT);
  });
  yield put(removeToast(res.addedToast.toastKey));
}

export default function*() {
  yield takeEvery(ADD_TOAST, addToastWorker);
}
