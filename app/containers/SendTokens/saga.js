import { takeLatest, put, call } from 'redux-saga/effects';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import {
  SEND_TOKENS,
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS_ERROR,
} from './constants';

import {
  sendTokensSuccess,
  sendTokensErr,
  hideSendTokensModal,
} from './actions';

export function* sendTokensWorker({ resetForm }) {
  try {
    yield put(sendTokensSuccess());
    yield put(hideSendTokensModal());
    yield call(resetForm);
  } catch (err) {
    yield put(sendTokensErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_TOKENS, sendTokensWorker);
  yield takeLatest(SEND_TOKENS_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(SEND_TOKENS_ERROR, errorToastHandlingWithDefaultText);
}
