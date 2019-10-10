import { takeLatest, call, put } from 'redux-saga/effects';

import EosioService from 'utils/eosio';
import { autoLogin } from 'utils/web_integration/src/wallet/login/login';

import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO } from './constants';

export function* initEosioWorker() {
  try {
    const eosioService = new EosioService();

    const response = yield call(autoLogin);
    const privateKey = response.OK ? response.body.activeKey.private : null;

    yield call(() => eosioService.init(privateKey));
    yield put(initEosioSuccess(eosioService));
  } catch (error) {
    yield put(initEosioError(error));
  }
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
}
