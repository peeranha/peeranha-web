import { takeLatest, put, call } from 'redux-saga/effects';

import { DELETE_ACCOUNT, SEND_EMAIL } from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  deleteAccountSuccess,
  deleteAccountErr,
} from './actions';

export function* sendEmailWorker({ resetForm, values }) {
  try {
    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err.message));
  }
}

export function* deleteAccountWorker({ resetForm, values }) {
  try {
    yield put(deleteAccountSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(deleteAccountErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
}
