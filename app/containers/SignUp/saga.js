import { call, put, takeLatest, select, take } from 'redux-saga/effects';

import { translationMessages } from 'i18n';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerInit,
  registerConfirmEmail,
  registerComplete,
} from 'utils/web_integration/src/wallet/register/register';

import { getProfileInfo } from 'utils/profileManagement';
import { registerAccount } from 'utils/accountManagement';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import loginMessages from 'containers/Login/messages';

import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { successHandling } from 'containers/Toast/saga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  EMAIL_FIELD as EMAIL_LOGIN_FIELD,
  PASSWORD_FIELD as PASSWORD_LOGIN_FIELD,
  SCATTER_MODE_ERROR,
  USER_IS_NOT_SELECTED,
  REFERRAL_CODE,
} from 'containers/Login/constants';

import { followHandlerWorker } from 'containers/FollowCommunityButton/saga';

import {
  loginWithEmailWorker,
  loginWithScatterWorker,
  redirectToFeedWorker,
  sendReferralCode,
} from 'containers/Login/saga';

import {
  EMAIL_CHECKING,
  EMAIL_VERIFICATION,
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT,
  SHOW_SCATTER_SIGNUP_FORM,
  SIGNUP_WITH_SCATTER,
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
  EMAIL_CHECKING_SUCCESS,
  SEND_ANOTHER_CODE,
  SIGNUP_WITH_SCATTER_SUCCESS,
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

    const response = yield call(registerInit, email);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(checkEmailSuccess());

    yield call(createdHistory.push, routes.signup.emailVerification.name);
  } catch (err) {
    yield put(checkEmailErr(err));
  }
}

export function* verifyEmailWorker({ verificationCode }) {
  try {
    const email = yield select(selectEmail());
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(registerConfirmEmail, email, verificationCode);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { encryptionKey } = response.body;

    yield put(verifyEmailSuccess(encryptionKey));

    yield call(createdHistory.push, routes.signup.dontHaveEosAccount.name);
  } catch (err) {
    yield put(verifyEmailErr(err));
  }
}

export function* sendAnotherCode() {
  const email = yield select(selectEmail());
  yield call(emailCheckingWorker, { email });
}

export function* sendAnotherCodeSuccess() {
  yield take(EMAIL_CHECKING_SUCCESS);
  yield call(successHandling);
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
      throw new WebIntegrationError(
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
      throw new WebIntegrationError(
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

    const response = yield call(
      registerComplete,
      props,
      encryptionKey,
      storeKeys,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield call(loginWithEmailWorker, {
      val: {
        [EMAIL_LOGIN_FIELD]: email,
        [PASSWORD_LOGIN_FIELD]: val[PASSWORD_FIELD],
      },
    });

    const singleCommId = isSingleCommunityWebsite();

    if (singleCommId) {
      yield call(followHandlerWorker, {
        communityIdFilter: singleCommId,
        isFollowed: false,
        buttonId: '',
      });
    }

    yield put(iHaveEosAccountSuccess());

    yield call(createdHistory.push, routes.questions());
  } catch (err) {
    yield put(iHaveEosAccountErr(err));
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

    const response = yield call(
      registerComplete,
      props,
      encryptionKey,
      storeKeys,
      message,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
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

    const singleCommId = isSingleCommunityWebsite();

    if (singleCommId) {
      yield call(followHandlerWorker, {
        communityIdFilter: singleCommId,
        isFollowed: false,
        buttonId: '',
      });
    }

    yield put(idontHaveEosAccountSuccess());

    yield call(
      createdHistory.push,
      response.body.readyToUse
        ? routes.questions()
        : routes.signup.almostDoneNoAccount.name,
    );
  } catch (err) {
    yield put(idontHaveEosAccountErr(err));
  }
}

export function* signUpWithScatterWorker({ val }) {
  try {
    const accountName = val[EOS_ACCOUNT_FIELD];
    const profile = {
      accountName,
      displayName: val[DISPLAY_NAME_FIELD],
    };

    const eosService = yield select(selectEos);

    const referralCode = val[REFERRAL_CODE];

    if (referralCode) {
      const ok = yield call(
        sendReferralCode,
        accountName,
        referralCode,
        eosService,
      );
      if (!ok) {
        return;
      }
    }

    yield call(registerAccount, profile, eosService);

    yield call(loginWithScatterWorker);

    const singleCommId = isSingleCommunityWebsite();

    if (singleCommId) {
      yield call(followHandlerWorker, {
        communityIdFilter: singleCommId,
        isFollowed: false,
        buttonId: '',
      });
    }

    yield put(signUpWithScatterSuccess());
  } catch (err) {
    yield put(signUpWithScatterErr(err));
  }
}

export function* showScatterSignUpFormWorker() {
  try {
    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    yield call(eosService.forgetIdentity);
    yield call(eosService.initEosioWithScatter);

    if (!eosService.scatterInstalled) {
      throw new WebIntegrationError(
        translations[loginMessages[SCATTER_MODE_ERROR].id],
      );
    }

    if (!eosService.selectedAccount) {
      throw new WebIntegrationError(
        translations[loginMessages[USER_IS_NOT_SELECTED].id],
      );
    }

    const profileInfo = yield call(
      getProfileInfo,
      eosService.selectedAccount,
      eosService,
    );

    if (profileInfo) {
      throw new WebIntegrationError(
        translations[signupMessages[USER_ALREADY_REGISTERED_ERROR].id],
      );
    }

    yield put(getUserProfileSuccess(profileInfo));
    yield put(showScatterSignUpFormSuccess(eosService.selectedAccount));

    yield call(createdHistory.push, routes.signup.displayName.name);
  } catch (err) {
    yield put(showScatterSignUpFormErr(err));
  }
}

export default function*() {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
  yield takeLatest(EMAIL_VERIFICATION, verifyEmailWorker);
  yield takeLatest(I_HAVE_EOS_ACCOUNT, iHaveEosAccountWorker);
  yield takeLatest(I_HAVE_NOT_EOS_ACCOUNT, idontHaveEosAccountWorker);
  yield takeLatest(SIGNUP_WITH_SCATTER, signUpWithScatterWorker);
  yield takeLatest(SHOW_SCATTER_SIGNUP_FORM, showScatterSignUpFormWorker);
  yield takeLatest(SIGNUP_WITH_SCATTER_SUCCESS, redirectToFeedWorker);
}
