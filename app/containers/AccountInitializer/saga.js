import { call, put, takeEvery } from 'redux-saga/effects';

import { reviewAccount } from 'utils/accountManagement';
import { REVIEW_ACCOUNT } from './constants';
import { reviewAccountSuccess, reviewAccountError } from './actions';

export function* reviewAccountWorker() {
  try {
    const account = yield call(() => reviewAccount());
    yield put(reviewAccountSuccess(account));
  } catch (err) {
    yield put(reviewAccountError(err));
  }
}

export default function*() {
  yield takeEvery(REVIEW_ACCOUNT, reviewAccountWorker);
}
