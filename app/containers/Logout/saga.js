import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import { selectEos } from 'containers/EosioProvider/selectors';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { initEosio } from 'containers/EosioProvider/actions';

import { LOGOUT } from './constants';

import { logoutSuccess, logoutErr } from './actions';

export function* logoutWorker() {
  try {
    const eosService = yield select(selectEos);

    localStorage.removeItem(AUTOLOGIN_DATA);
    sessionStorage.removeItem(AUTOLOGIN_DATA);

    yield call(eosService.forgetIdentity);

    yield put(initEosio());

    yield put(getCurrentAccountSuccess());

    yield put(logoutSuccess());

    yield call(createdHistory.push, routes.questions());
  } catch (err) {
    yield put(logoutErr(err));
  }
}

export default function*() {
  yield takeLatest(LOGOUT, logoutWorker);
}
