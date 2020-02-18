import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { deleteCookie } from 'utils/cookie';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import { selectEos } from 'containers/EosioProvider/selectors';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';

import { LOGOUT } from './constants';

import { logoutSuccess, logoutErr } from './actions';

export function* logoutWorker() {
  try {
    const eosService = yield select(selectEos);

    deleteCookie(AUTOLOGIN_DATA);

    yield call(eosService.forgetIdentity);
    yield call(eosService.initEosioWithoutScatter);

    yield call(createdHistory.push, routes.questions());
    yield put(getCurrentAccountSuccess());

    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutErr(err));
  }
}

export default function*() {
  yield takeLatest(LOGOUT, logoutWorker);
}
