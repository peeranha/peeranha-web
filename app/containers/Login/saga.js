import { call, put, takeLatest, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { registerAccount } from 'utils/accountManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError, ApplicationError } from 'utils/errors';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';
import { showScatterSignUpFormWorker } from 'containers/SignUp/saga';

import { ACCOUNT_NOT_CREATED_NAME } from 'containers/SignUp/constants';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { hideLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import {
  loginWithEmailSuccess,
  loginWithEmailErr,
  loginWithScatterSuccess,
  loginWithScatterErr,
  finishRegistrationWithDisplayNameSuccess,
  finishRegistrationWithDisplayNameErr,
  hideLoginModal,
} from './actions';

import {
  FINISH_REGISTRATION,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_SCATTER,
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

    const response = yield call(login, email, password, rememberMe);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { activeKey, eosAccountName } = response.body;

    if (eosAccountName === ACCOUNT_NOT_CREATED_NAME) {
      throw new WebIntegrationError(
        translations[messages.accountNotCreatedName.id],
      );
    }

    yield call(getCurrentAccountWorker, eosAccountName);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield put(loginWithEmailSuccess());

    // If user is absent - show window to finish registration
    if (!profileInfo) {
      yield put(loginWithEmailSuccess(eosAccountName, WE_ARE_HAPPY_FORM));
    }

    const eosService = yield select(selectEos);

    yield call(
      eosService.initEosioWithoutScatter,
      activeKey.private,
      eosAccountName,
    );
  } catch (err) {
    yield put(loginWithEmailErr(err));
  }
}

export function* loginWithScatterWorker() {
  try {
    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    yield call(eosService.initEosioWithScatter);

    if (!eosService.scatterInstalled) {
      throw new WebIntegrationError(
        translations[messages[SCATTER_MODE_ERROR].id],
      );
    }

    if (!eosService.selectedAccount) {
      throw new WebIntegrationError(
        translations[messages[USER_IS_NOT_SELECTED].id],
      );
    }

    yield call(getCurrentAccountWorker, eosService.selectedAccount);
    const profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield call(showScatterSignUpFormWorker);

      yield put(hideLoginModal());

      throw new ApplicationError(
        translations[messages[USER_IS_NOT_REGISTERED].id],
      );
    }

    localStorage.setItem(
      AUTOLOGIN_DATA,
      JSON.stringify({ loginWithScatter: true }),
    );

    yield put(loginWithScatterSuccess());
  } catch (err) {
    yield put(loginWithScatterErr(err));
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

    yield call(registerAccount, profile, eosService);

    yield call(getCurrentAccountWorker);

    yield put(finishRegistrationWithDisplayNameSuccess());
  } catch (err) {
    yield put(finishRegistrationWithDisplayNameErr(err));
  }
}

export function* redirectToHomepageWorker() {
  const isLeftMenuVisible = yield select(selectIsMenuVisible());

  if (isLeftMenuVisible) {
    yield put(hideLeftMenu());
  }

  if (window.location.pathname.includes(routes.registrationStage)) {
    yield call(createdHistory.push, routes.questions());
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
    [LOGIN_WITH_EMAIL_SUCCESS, LOGIN_WITH_SCATTER_SUCCESS],
    redirectToHomepageWorker,
  );
}
