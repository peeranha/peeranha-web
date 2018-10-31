import { takeEvery, put } from 'redux-saga/effects';
import { ADD_TOAST } from './constants';
import { removeToast } from './actions';

export function* addToastWorker(res) {
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  yield put(removeToast(res.addedToast.toastKey));
}

export default function*() {
  yield takeEvery(ADD_TOAST, addToastWorker);
}
