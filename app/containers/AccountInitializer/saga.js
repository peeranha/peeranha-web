import { call, put, takeEvery } from 'redux-saga/effects';

import { getCurrentAccount } from 'utils/accountManagement';
import { GET_CURRENT_ACCOUNT } from './constants';
import { getCurrentAccountSuccess, getCurrentAccountError } from './actions';

export function* getCurrentAccountWorker() {
  try {
    const account = yield call(() => getCurrentAccount());
    yield put(getCurrentAccountSuccess(account));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
}
