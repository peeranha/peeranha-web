import { takeLatest, put, call } from 'redux-saga/effects';

import { SHOW_OWNER_KEY, SEND_EMAIL } from './constants';

import {
  showOwnerKeySuccess,
  showOwnerKeyErr,
  sendEmailSuccess,
  sendEmailErr,
} from './actions';

export function* sendEmailWorker({ resetForm, values }) {
  try {
    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err.message));
  }
}

export function* showOwnerKeyWorker({ resetForm, values }) {
  try {
    yield put(showOwnerKeySuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(showOwnerKeyErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_OWNER_KEY, showOwnerKeyWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
}
