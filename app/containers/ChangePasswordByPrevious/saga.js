import { takeLatest, put, call } from 'redux-saga/effects';

import { SEND_EMAIL, SUBMIT_EMAIL, CHANGE_PASSWORD } from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  submitEmailSuccess,
  submitEmailErr,
  changePasswordSuccess,
  changePasswordErr,
} from './actions';

export function* sendEmailWorker({ resetForm, values }) {
  try {
    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err.message));
  }
}

export function* submitEmailWorker({ resetForm, values }) {
  try {
    yield put(submitEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(submitEmailErr(err.message));
  }
}

export function* changePasswordWorker({ resetForm, values }) {
  try {
    yield put(changePasswordSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(changePasswordErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
  yield takeLatest(SUBMIT_EMAIL, submitEmailWorker);
  yield takeLatest(CHANGE_PASSWORD, changePasswordWorker);
}
