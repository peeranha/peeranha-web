import { takeLatest, call, put } from 'redux-saga/effects';

import { getEosio } from 'utils/eosio';
import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO } from './constants';

export function* initEosioWorker() {
  try {
    const eosio = yield call(() => getEosio());
    yield put(initEosioSuccess(eosio, false, null));
  } catch (error) {
    yield put(initEosioError(error));
  }
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
}
