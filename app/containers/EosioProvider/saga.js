import { takeLatest, call, put } from 'redux-saga/effects';

import EosioService from 'utils/eosio';
import { autoLogin } from 'utils/web_integration/src/wallet/login/login';

import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO } from './constants';

export function* initEosioWorker() {
  try {
    const eosioService = new EosioService();

    const response = yield call(autoLogin);

    if (response.OK) {
      yield call(
        eosioService.init,
        response.body.activeKey.private,
        false,
        response.body.eosAccountName,
      );
    } else {
      yield call(eosioService.init);
    }

    yield put(initEosioSuccess(eosioService));
  } catch (error) {
    yield put(initEosioError(error));
  }
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
}
