/* eslint consistent-return: 0, no-shadow: 0 */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import EosioService from 'utils/eosio';
import { getCookie } from 'utils/cookie';
import { ApplicationError } from 'utils/errors';
import { autoLogin } from 'utils/web_integration/src/wallet/login/login';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
} from 'containers/AccountProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import { logout } from 'containers/Logout/actions';

import {
  getCurrentAccountWorker,
  updateAccWorker,
  isAvailableAction,
} from 'containers/AccountProvider/saga';

import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO, INIT_EOSIO_SUCCESS } from './constants';

import validate from './validate';

export function* initEosioWorker({
  key = null,
  initWithScatter = false,
  selectedAccount = null,
}) {
  try {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
    const eosService = new EosioService();

    if ((autoLoginData && autoLoginData.loginWithScatter) || initWithScatter) {
      try {
        yield call(eosService.initEosioWithScatter);
        yield put(initEosioSuccess(eosService));
      } catch (err) {
        yield call(eosService.initEosioWithoutScatter);
        yield put(initEosioSuccess(eosService));
      }

      return null;
    }

    yield call(eosService.initEosioWithoutScatter, key, selectedAccount);
    yield put(initEosioSuccess(eosService));

    const response = yield call(autoLogin);

    if (response.OK) {
      const eosService = new EosioService();

      yield call(
        eosService.initEosioWithoutScatter,
        response.body.activeKey.private,
        response.body.eosAccountName,
      );

      yield call(getCurrentAccountWorker, response.body.eosAccountName);
      yield put(initEosioSuccess(eosService));
    } else {
      yield put(logout());
    }
  } catch (error) {
    yield put(initEosioError(error));
  }
}

export function* isAuthorized() {
  const profileInfo = yield select(makeSelectProfileInfo());

  if (!profileInfo) {
    yield put(showLoginModal());
    throw new ApplicationError('Not authorized');
  }
}

export function* isValid({ creator, buttonId, minRating, minEnergy }) {
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const selectedAccount = yield select(makeSelectAccount());

  yield call(isAvailableAction, () =>
    validate({
      rating: profileInfo.rating,
      translations: translationMessages[locale],
      actor: selectedAccount,
      creator,
      buttonId,
      energy: profileInfo.energy,
      minRating,
      minEnergy,
    }),
  );
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
  yield takeLatest(INIT_EOSIO_SUCCESS, updateAccWorker);
}
