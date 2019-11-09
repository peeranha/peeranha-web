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

import loginMessages from 'containers/Login/messages';

import { errorToastHandling } from 'containers/Toast/saga';
import { initEosioSuccess } from 'containers/EosioProvider/actions';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  EMAIL_FIELD as EMAIL_LOGIN_FIELD,
  PASSWORD_FIELD as PASSWORD_LOGIN_FIELD,
  SCATTER_MODE_ERROR,
  USER_IS_NOT_SELECTED,
} from 'containers/Login/constants';

import {
  loginWithEmailWorker,
  loginWithScatterWorker,
} from 'containers/Login/saga';

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
  ACCOUNT_NOT_CREATED_NAME,
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

import { selectEmail, selectEncryptionKey, selectKeys } from './selectors';

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
    const eosService = yield select(selectEos);
    const translations = translationMessages[locale];

    const encryptionKey = yield select(selectEncryptionKey());
    const email = yield select(selectEmail());

    const accountInfo = yield call(
      eosService.getAccount,
      val[EOS_ACCOUNT_FIELD],
    );

    if (!accountInfo) {
      throw new Error(
        translationMessages[locale][signupMessages.eosAccountNotFound.id],
      );
    }

    let isActiveKeyValid = true;
    let isOwnerKeyValid = true;

    const eosActivePublicKey = yield call(
      eosService.privateToPublic,
      val[EOS_ACTIVE_PRIVATE_KEY_FIELD],
    );

    const eosOwnerPublicKey = yield call(
      eosService.privateToPublic,
      val[EOS_OWNER_PRIVATE_KEY_FIELD],
    );

    accountInfo.permissions.forEach(permission => {
      if (
        permission.perm_name === 'active' &&
        val[EOS_ACTIVE_PRIVATE_KEY_FIELD]
      ) {
        isActiveKeyValid = Boolean(
          permission.required_auth.keys.find(
            iterKey => iterKey.key === eosActivePublicKey,
          ),
        );
      }

      if (
        permission.perm_name === 'owner' &&
        val[EOS_OWNER_PRIVATE_KEY_FIELD]
      ) {
        isOwnerKeyValid = Boolean(
          permission.required_auth.keys.find(
            iterKey => iterKey.key === eosOwnerPublicKey,
          ),
        );
      }
    });

    if (!isActiveKeyValid || !isOwnerKeyValid) {
      throw new Error(
        translationMessages[locale][signupMessages.keysDoNotMatch.id],
      );
    }

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
      eosAccountName: val[EOS_ACCOUNT_FIELD],
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

    yield call(loginWithEmailWorker, {
      val: {
        [EMAIL_LOGIN_FIELD]: email,
        [PASSWORD_LOGIN_FIELD]: val[PASSWORD_FIELD],
      },
    });

    yield put(iHaveEosAccountSuccess());

    yield call(() => createdHistory.push(routes.questions()));
  } catch (err) {
    yield put(iHaveEosAccountErr(err.message));
  }
}

export function* idontHaveEosAccountWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const keys = yield select(selectKeys());
    const translations = translationMessages[locale];

    const email = yield select(selectEmail());
    const encryptionKey = yield select(selectEncryptionKey());

    const props = {
      email,
      keys,
      masterKey: val[MASTER_KEY_FIELD],
      password: val[PASSWORD_FIELD],
      eosAccountName: ACCOUNT_NOT_CREATED_NAME,
    };

    const storeKeys = true;
    const message = val[WHY_DO_YOU_LIKE_US_FIELD] || 'empty';

    const response = yield call(() =>
      registerComplete(props, encryptionKey, storeKeys, message),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    if (response.body.readyToUse) {
      yield call(loginWithEmailWorker, {
        val: {
          [EMAIL_LOGIN_FIELD]: email,
          [PASSWORD_LOGIN_FIELD]: val[PASSWORD_FIELD],
        },
      });
    }

    yield put(idontHaveEosAccountSuccess());

    yield call(() =>
      createdHistory.push(
        response.body.readyToUse
          ? routes.questions()
          : routes.signup.almostDoneNoAccount.name,
      ),
    );
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

    yield call(loginWithScatterWorker);

    yield put(signUpWithScatterSuccess());

    yield call(() => createdHistory.push(routes.questions()));
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

    yield call(() => eosService.init(null, true));

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

    yield put(getUserProfileSuccess(profileInfo));
    yield put(showScatterSignUpFormSuccess(user));

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
