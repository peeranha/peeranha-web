import { call, put, takeEvery } from 'redux-saga/effects';
import { registerAccount } from 'utils/accountManagement';

import { FETCH_REGISTER_ACC } from './constants';

import { registerAccSuccess, registerAccError } from './actions';

export function* resistrAccWorker(res) {
  try {
    const { eosAccount, displayName } = res.obj;

    yield call(() => registerAccount(eosAccount, displayName, {}));
    yield put(registerAccSuccess());
  } catch (err) {
    yield put(registerAccError(err));
  }
}

export default function*() {
  yield takeEvery(FETCH_REGISTER_ACC, resistrAccWorker);
}
