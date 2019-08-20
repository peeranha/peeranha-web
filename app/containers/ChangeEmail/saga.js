import { takeLatest, put, call } from 'redux-saga/effects';

import { CHANGE_EMAIL } from './constants';

import { changeEmailSuccess, changeEmailErr } from './actions';

export function* changeEmailWorker({ resetForm, values }) {
  try {
    yield put(changeEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(changeEmailErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CHANGE_EMAIL, changeEmailWorker);
}
