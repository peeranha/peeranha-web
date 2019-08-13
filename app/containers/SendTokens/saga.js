import { takeLatest, put, call } from 'redux-saga/effects';
import { SEND_TOKENS } from './constants';

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
}
