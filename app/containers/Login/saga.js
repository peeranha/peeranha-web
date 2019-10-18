import { call, put, takeLatest, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import EosioService from 'utils/eosio';
import { getProfileInfo } from 'utils/profileManagement';
import { registerAccount } from 'utils/accountManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { initEosioSuccess } from 'containers/EosioProvider/actions';
import { errorToastHandling } from 'containers/Toast/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import { ACCOUNT_NOT_CREATED_NAME } from 'containers/SignUp/constants';

import {
  loginWithEmailSuccess,
  loginWithEmailErr,
  loginWithScatterSuccess,
  loginWithScatterErr,
  finishRegistrationWithDisplayNameSuccess,
  finishRegistrationWithDisplayNameErr,
} from './actions';

import {
  FINISH_REGISTRATION,
  FINISH_REGISTRATION_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_ERROR,
  LOGIN_WITH_SCATTER,
  LOGIN_WITH_SCATTER_ERROR,
  SCATTER_MODE_ERROR,
  USER_IS_NOT_SELECTED,
  USER_IS_NOT_REGISTERED,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMEMBER_ME_FIELD,
  WE_ARE_HAPPY_FORM,
  DISPLAY_NAME,
  AUTOLOGIN_DATA,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_SCATTER_SUCCESS,
} from './constants';

import messages from './messages';
import { makeSelectEosAccount } from './selectors';

/* eslint consistent-return: 0 */
export function* loginWithEmailWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const email = val[EMAIL_FIELD];
    const password = val[PASSWORD_FIELD];
    const rememberMe = Boolean(val[REMEMBER_ME_FIELD]);

    const response = yield call(() => login(email, password, rememberMe));

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { activeKey, eosAccountName } = response.body;

    // TODO: cover by tests
    if (eosAccountName === ACCOUNT_NOT_CREATED_NAME) {
      throw new Error(translations[locale][messages.accountNotCreatedName.id]);
    }

    const eosService = new EosioService();

    yield call(() => eosService.init(activeKey.private, false, eosAccountName));

    // get profile info to know is there user in system
    const profileInfo = yield call(() =>
      getProfileInfo(eosAccountName, eosService),
    );

    yield put(initEosioSuccess(eosService));

    if (!profileInfo) {
      yield put(loginWithEmailSuccess(eosAccountName, WE_ARE_HAPPY_FORM));
      return null;
    }

    yield put(getUserProfileSuccess(profileInfo));

    yield put(loginWithEmailSuccess());
  } catch (err) {
    yield put(loginWithEmailErr(err.message));
  }
}

export function* loginWithScatterWorker() {
  try {
    let user = null;

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    localStorage.setItem(
      AUTOLOGIN_DATA,
      JSON.stringify({ loginWithScatter: true }),
    );

    // Reinitialize EOS (with Scatter)
    const eosService = new EosioService();

    yield call(() => eosService.init());

    if (!eosService.scatterInstalled) {
      throw new Error(translations[messages[SCATTER_MODE_ERROR].id]);
    }

    if (!eosService.selectedScatterAccount) {
      yield call(() => eosService.forgetIdentity());
      user = yield call(() => eosService.selectAccount());
    }

    if (!user) {
      throw new Error(translations[messages[USER_IS_NOT_SELECTED].id]);
    }

    const profileInfo = yield call(() => getProfileInfo(user, eosService));

    yield put(getUserProfileSuccess(profileInfo));

    if (!profileInfo) {
      throw new Error(translations[messages[USER_IS_NOT_REGISTERED].id]);
    }

    yield put(initEosioSuccess(eosService));

    yield put(loginWithScatterSuccess());
  } catch (err) {
    yield put(loginWithScatterErr(err.message));
  }
}

export function* finishRegistrationWorker({ val }) {
  try {
    const eosService = yield select(selectEos);
    const accountName = yield select(makeSelectEosAccount());

    const profile = {
      accountName,
      displayName: val[DISPLAY_NAME],
    };

    yield call(() => registerAccount(profile, eosService));

    yield put(finishRegistrationWithDisplayNameSuccess());
  } catch (err) {
    yield put(finishRegistrationWithDisplayNameErr(err.message));
  }
}

// TODO: cover by tests
export function* redirectToHomepageWorker() {
  if (window.location.pathname.includes(routes.registrationStage)) {
    yield call(() => createdHistory.push(routes.questions()));
  }
}

export default function*() {
  yield takeLatest(LOGIN_WITH_EMAIL, loginWithEmailWorker);
  yield takeLatest(LOGIN_WITH_SCATTER, loginWithScatterWorker);
  yield takeLatest(FINISH_REGISTRATION, finishRegistrationWorker);
  yield takeLatest(
    [LOGIN_WITH_EMAIL_SUCCESS, LOGIN_WITH_SCATTER_SUCCESS],
    redirectToHomepageWorker,
  );
  yield takeLatest(
    [
      LOGIN_WITH_SCATTER_ERROR,
      LOGIN_WITH_EMAIL_ERROR,
      FINISH_REGISTRATION_ERROR,
    ],
    errorToastHandling,
  );
}
