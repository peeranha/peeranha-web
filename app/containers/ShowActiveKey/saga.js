import { takeLatest, put, call } from 'redux-saga/effects';

import { SHOW_ACTIVE_KEY } from './constants';

import {
  showActiveKeySuccess,
  showActiveKeyErr,
  hideActiveKeyModal,
} from './actions';

export function* showActiveKeyWorker({ resetForm, values }) {
  try {
    yield put(showActiveKeySuccess());
    yield put(hideActiveKeyModal());
    yield call(resetForm);
  } catch (err) {
    yield put(showActiveKeyErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_ACTIVE_KEY, showActiveKeyWorker);
}
