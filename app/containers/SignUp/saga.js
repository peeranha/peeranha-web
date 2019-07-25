import { call, put, takeLatest, select } from 'redux-saga/effects';

import { translationMessages } from 'i18n';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerInit,
  registerConfirmEmail,
  registerComplete,
} from 'utils/web_integration/src/wallet/register/register';

import EosioService from 'utils/eosio';
import { getProfileInfo } from 'utils/profileManagement';
import { registerAccount } from 'utils/accountManagement';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import {
  LOGIN_WITH_SCATTER,
  SCATTER_MODE_ERROR,
  USER_IS_NOT_SELECTED,
} from 'containers/Login/constants';

import loginMessages from 'containers/Login/messages';

import { errorToastHandling } from 'containers/Toast/saga';
import { initEosioSuccess } from 'containers/EosioProvider/actions';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  EMAIL_CHECKING,
  EMAIL_VERIFICATION,
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT,
  SHOW_SCATTER_SIGNUP_FORM,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
  SIGNUP_WITH_SCATTER,
  SIGNUP_WITH_SCATTER_ERROR,
  USER_ALREADY_REGISTERED_ERROR,
  EOS_ACCOUNT_FIELD,
  DISPLAY_NAME_FIELD,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  STORE_KEY_FIELD,
  WHY_DO_YOU_LIKE_US_FIELD,
} from './constants';

import {
  checkEmailSuccess,
  checkEmailErr,
  verifyEmailSuccess,
  verifyEmailErr,
  iHaveEosAccountSuccess,
  iHaveEosAccountErr,
  idontHaveEosAccountSuccess,
  idontHaveEosAccountErr,
  showScatterSignUpFormErr,
  showScatterSignUpFormSuccess,
  signUpWithScatterSuccess,
  signUpWithScatterErr,
} from './actions';

import { selectEmail, selectEncryptionKey } from './selectors';

import signupMessages from './messages';

export function* emailCheckingWorker({ email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() => registerInit(email));

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(checkEmailSuccess());

    yield call(() => createdHistory.push(routes.signup.emailVerification.name));
  } catch (err) {
    yield put(checkEmailErr(err.message));
  }
}

export function* verifyEmailWorker({ verificationCode }) {
  try {
    const email = yield select(selectEmail());
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() =>
      registerConfirmEmail(email, verificationCode),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { encryptionKey } = response.body;

    yield put(verifyEmailSuccess(encryptionKey));

    yield call(() => createdHistory.push(routes.signup.haveEosAccount.name));
  } catch (err) {
    yield put(verifyEmailErr(err.message));
  }
}

export function* iHaveEosAccountWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const encryptionKey = yield select(selectEncryptionKey());
    const email = yield select(selectEmail());

    const props = {
      email,
      keys: {
        activeKey: {
          private: val[EOS_ACTIVE_PRIVATE_KEY_FIELD],
        },
        ownerKey: {
          private: val[EOS_OWNER_PRIVATE_KEY_FIELD],
        },
      },
      masterKey: val[MASTER_KEY_FIELD],
      password: val[PASSWORD_FIELD],
    };

    const storeKeys = Boolean(val[STORE_KEY_FIELD]);

    const response = yield call(() =>
      registerComplete(props, encryptionKey, storeKeys),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(iHaveEosAccountSuccess());

    yield call(() => createdHistory.push(routes.signup.almostDone.name));
  } catch (err) {
    yield put(iHaveEosAccountErr(err.message));
  }
}

export function* idontHaveEosAccountWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const email = yield select(selectEmail());
    const encryptionKey = yield select(selectEncryptionKey());

    const props = {
      email,
      keys: {
        activeKey: {
          private: val[EOS_ACTIVE_PRIVATE_KEY_FIELD],
        },
        ownerKey: {
          private: val[EOS_OWNER_PRIVATE_KEY_FIELD],
        },
      },
      masterKey: val[MASTER_KEY_FIELD],
      password: val[PASSWORD_FIELD],
    };

    const storeKeys = Boolean(val[STORE_KEY_FIELD]);
    const message = val[WHY_DO_YOU_LIKE_US_FIELD];

    const response = yield call(() =>
      registerComplete(props, encryptionKey, storeKeys, message),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(idontHaveEosAccountSuccess());

    yield call(() => createdHistory.push(routes.signup.almostDone.name));
  } catch (err) {
    yield put(idontHaveEosAccountErr(err.message));
  }
}

export function* signUpWithScatterWorker({ val }) {
  try {
    const profile = {
      accountName: val[EOS_ACCOUNT_FIELD],
      displayName: val[DISPLAY_NAME_FIELD],
    };

    const eosService = yield select(selectEos);

    yield call(() => registerAccount(profile, eosService));

    yield put(signUpWithScatterSuccess());

    yield call(() => createdHistory.push(routes.signup.almostDone.name));
  } catch (err) {
    yield put(signUpWithScatterErr(err.message));
  }
}

export function* showScatterSignUpFormWorker() {
  try {
    let user = null;

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const eosService = new EosioService();

    yield call(() => eosService.init(LOGIN_WITH_SCATTER));

    yield put(initEosioSuccess(eosService));

    if (!eosService.scatterInstalled) {
      throw new Error(translations[loginMessages[SCATTER_MODE_ERROR].id]);
    }

    if (!eosService.selectedScatterAccount) {
      yield call(() => eosService.forgetIdentity());
      user = yield call(() => eosService.selectAccount());
    }

    if (!user) {
      throw new Error(translations[loginMessages[USER_IS_NOT_SELECTED].id]);
    }

    const profileInfo = yield call(() => getProfileInfo(user, eosService));

    if (profileInfo) {
      throw new Error(
        translations[signupMessages[USER_ALREADY_REGISTERED_ERROR].id],
      );
    }

    yield put(getCurrentAccountSuccess(user, profileInfo));

    yield put(showScatterSignUpFormSuccess());

    yield call(() => createdHistory.push(routes.signup.displayName.name));
  } catch (err) {
    yield put(showScatterSignUpFormErr(err.message));
  }
}

export default function*() {
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
  yield takeLatest(EMAIL_VERIFICATION, verifyEmailWorker);
  yield takeLatest(I_HAVE_EOS_ACCOUNT, iHaveEosAccountWorker);
  yield takeLatest(I_HAVE_NOT_EOS_ACCOUNT, idontHaveEosAccountWorker);
  yield takeLatest(SIGNUP_WITH_SCATTER, signUpWithScatterWorker);
  yield takeLatest(SHOW_SCATTER_SIGNUP_FORM, showScatterSignUpFormWorker);
  yield takeLatest(
    [
      EMAIL_CHECKING_ERROR,
      EMAIL_VERIFICATION_ERROR,
      I_HAVE_EOS_ACCOUNT_ERROR,
      I_HAVE_NOT_EOS_ACCOUNT_ERROR,
      SHOW_SCATTER_SIGNUP_FORM_ERROR,
      SIGNUP_WITH_SCATTER_ERROR,
    ],
    errorToastHandling,
  );
}
