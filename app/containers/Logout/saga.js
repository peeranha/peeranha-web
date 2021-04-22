import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { deleteCookie, getCookie } from 'utils/cookie';

import { AUTOLOGIN_DATA, PROFILE_INFO_LS } from 'containers/Login/constants';
import { selectEos } from 'containers/EosioProvider/selectors';
import {
  getCurrentAccountSuccess,
  addLoginData,
} from 'containers/AccountProvider/actions';

import { LOGOUT } from './constants';

import { logoutSuccess, logoutErr } from './actions';
import { clearNotificationsData } from '../../components/Notifications/actions';

export function* logoutWorker() {
  try {
    const eosService = yield select(selectEos);
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    deleteCookie(AUTOLOGIN_DATA);
    deleteCookie(PROFILE_INFO_LS);

    if (autoLoginData?.loginWithFacebook && window.FB) {
      window.FB.logout(() => {});
    }
    yield call(eosService.resetKeycatUserData);
    yield call(eosService.forgetIdentity);
    yield call(eosService.initEosioWithoutScatter);

    yield call(createdHistory.push, routes.questions());
    yield put(getCurrentAccountSuccess());
    yield put(addLoginData({}));

    yield put(clearNotificationsData());

    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutErr(err));
  }
}

export default function*() {
  yield takeLatest(LOGOUT, logoutWorker);
}
