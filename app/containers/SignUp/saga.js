import { call, put, takeEvery } from 'redux-saga/effects';
import { registerAccount } from 'utils/accountManagement';

import { FETCH_REGISTR_ACC } from './constants';

import { registrAccSuccess, registrAccError } from './actions';

function* resistrAccWorker(res) {
  try {
    const { eosAccount, displayName } = res.obj;

    yield call(() => registerAccount(eosAccount, displayName, {}));
    yield put(registrAccSuccess());
  } catch (err) {
    yield put(registrAccError(err));
  }
}

export default function*() {
  yield takeEvery(FETCH_REGISTR_ACC, resistrAccWorker);
}
