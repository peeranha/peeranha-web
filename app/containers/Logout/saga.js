import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import Cookies from 'utils/cookies';

import { AUTH_TYPE, AUTH_PRIVATE_KEY } from 'containers/Login/constants';
import { selectEos } from 'containers/EosioProvider/selectors';
import { errorToastHandling } from 'containers/Toast/saga';
import { getCurrentAccount } from 'containers/AccountProvider/actions';
import { initEosio } from 'containers/EosioProvider/actions';

import { LOGOUT, LOGOUT_ERROR } from './constants';

import { logoutSuccess, logoutErr } from './actions';

export function* logoutWorker() {
  try {
    const eosService = yield select(selectEos);

    Cookies.remove(AUTH_TYPE);
    Cookies.remove(AUTH_PRIVATE_KEY);

    yield call(() => eosService.forgetIdentity());

    yield put(initEosio());

    yield put(getCurrentAccount());

    yield put(logoutSuccess());

    yield call(() => createdHistory.push(routes.questions()));
  } catch (err) {
    yield put(logoutErr(err.message));
  }
}

export default function*() {
  yield takeLatest(LOGOUT, logoutWorker);
  yield takeLatest(LOGOUT_ERROR, errorToastHandling);
}
