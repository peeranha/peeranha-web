import { takeLatest, call, put } from 'redux-saga/effects';

import EosioService from 'utils/eosio';
import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO } from './constants';

export function* initEosioWorker() {
  try {
    const eosioService = new EosioService();
    yield call(() => eosioService.init());
    yield put(initEosioSuccess(eosioService));
  } catch (error) {
    console.log(error);
    yield put(initEosioError(error));
  }
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
}
