import { takeLatest, call, put } from 'redux-saga/effects';

import { initEosio } from 'utils/eosio';
import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO } from './constants';

export function* initEosioWorker() {
  try {
    const eos = yield call(() => initEosio());
    yield put(initEosioSuccess(eos));
  } catch (error) {
    console.log(error);
    yield put(initEosioError(error));
  }
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
}
