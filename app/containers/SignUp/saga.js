import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { translationMessages } from 'i18n';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerComplete,
  registerConfirmEmail,
  registerInit,
} from 'utils/web_integration/src/wallet/register/register';
import { registerAccount } from 'utils/accountManagement';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';
import {
  followCommunity,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import { successHandling } from 'containers/Toast/saga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  EMAIL_FIELD as EMAIL_LOGIN_FIELD,
  PASSWORD_FIELD as PASSWORD_LOGIN_FIELD,
  REFERRAL_CODE,
} from 'containers/Login/constants';

import {
  loginWithEmailWorker,
  loginWithWalletWorker,
  redirectToFeedWorker,
  sendReferralCode,
} from 'containers/Login/saga';

import {
  ACCOUNT_NOT_CREATED_NAME,
  AUTOGENERATED,
  DISPLAY_NAME_FIELD,
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_VERIFICATION,
  EOS_ACCOUNT_FIELD,
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT,
  MASTER_KEY_FIELD,
  MY_OWN_TELOS_NAME_FIELD,
  PASSWORD_FIELD,
  SEND_ANOTHER_CODE,
  SHOW_WALLET_SIGNUP_FORM,
  SIGNUP_WITH_WALLET,
  SIGNUP_WITH_WALLET_SUCCESS,
  STORE_KEY_FIELD,
  TELOS_NAME_FIELD,
  USER_ALREADY_REGISTERED_ERROR,
  USER_REJECTED_SIGNATURE_REQUEST_ERROR,
  WHY_DO_YOU_LIKE_US_FIELD,
} from './constants';

import {
  checkEmailErr,
  checkEmailSuccess,
  idontHaveEosAccountErr,
  idontHaveEosAccountSuccess,
  iHaveEosAccountErr,
  iHaveEosAccountSuccess,
  showWalletSignUpFormErr,
  showWalletSignUpFormSuccess,
  signUpWithWalletErr,
  signUpWithWalletReferralErr,
  signUpWithWalletSuccess,
  verifyEmailErr,
  verifyEmailSuccess,
} from './actions';

import { selectEmail, selectEncryptionKey, selectKeys } from './selectors';

import signupMessages from './messages';
import { REDIRECT_TO_FEED } from '../App/constants';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getProfileInfo } from '../../utils/profileManagement';

export function* emailCheckingWorker({ email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(registerInit, email, locale);

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

export function* verifyEmailWorker({
  verificationCode,
  email: receivedEmail,
  redirect = true,
}) {
  try {
    const email = receivedEmail || (yield select(selectEmail()));
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

    if (redirect) {
      yield call(createdHistory.push, routes.signup.dontHaveEosAccount.name);
    }
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
    const ethereumService = yield select(selectEthereum);
    const translations = translationMessages[locale];

    const encryptionKey = yield select(selectEncryptionKey());
    const email = yield select(selectEmail());

    const accountInfo = yield call(t.getAccount, val[EOS_ACCOUNT_FIELD]);

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
        ownerKey: null,
      },
      masterKey: val[MASTER_KEY_FIELD],
      password: val[PASSWORD_FIELD],
      eosAccountName: val[EOS_ACCOUNT_FIELD],
    };

    if (val[EOS_OWNER_PRIVATE_KEY_FIELD]) {
      props.keys.ownerKey = {
        private: val[EOS_OWNER_PRIVATE_KEY_FIELD],
      };
    }

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
      eosName:
        val[TELOS_NAME_FIELD] === AUTOGENERATED
          ? null
          : val[MY_OWN_TELOS_NAME_FIELD],
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

export function* signUpWithWalletWorker({ val, metaMask }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const userAddress = val[EOS_ACCOUNT_FIELD];
    const profile = {
      userAddress,
      displayName: val[DISPLAY_NAME_FIELD],
    };

    const eosService = yield select(selectEos);
    const ethereumService = yield select(selectEthereum);

    const referralCode = val[REFERRAL_CODE];

    // if (referralCode) {
    //   const ok = yield call(
    //     sendReferralCode,
    //     accountName,
    //     referralCode,
    //     eosService,
    //     signUpWithWalletReferralErr,
    //   );
    //   if (!ok) {
    //     return;
    //   }
    // }

    const registerAccountResult = yield call(
      registerAccount,
      profile,
      ethereumService,
    );

    if (!registerAccountResult) {
      throw new WebIntegrationError(
        translations[signupMessages[USER_REJECTED_SIGNATURE_REQUEST_ERROR].id],
      );
    }

    yield call(loginWithWalletWorker, { metaMask });

    const singleCommId = isSingleCommunityWebsite();

    // if (singleCommId) {
    //   yield call(followCommunity, eosService, singleCommId, userAddress);
    // }

    yield put(signUpWithWalletSuccess());

    yield call(createdHistory.push, routes.questions());
  } catch (err) {
    yield put(signUpWithWalletErr(err));
  }
}

export function* showWalletSignUpFormWorker({ metaMask }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const ethereumService = yield select(selectEthereum);
    let currentAccount;

    // sign up with metaMask
    if (metaMask) {
      currentAccount = yield call(ethereumService.metaMaskSignIn);
    }

    const profileInfo = yield call(
      getProfileInfo,
      currentAccount,
      ethereumService,
    );

    // if (profileInfo) {
    //   throw new WebIntegrationError(
    //     translations[signupMessages[USER_ALREADY_REGISTERED_ERROR].id],
    //   );
    // }
    yield put(showWalletSignUpFormSuccess(currentAccount));
    yield call(createdHistory.push, routes.signup.displayName.name);
  } catch (err) {
    yield put(showWalletSignUpFormErr(err));
  }
}

export default function*() {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
  yield takeLatest(EMAIL_VERIFICATION, verifyEmailWorker);
  yield takeLatest(I_HAVE_EOS_ACCOUNT, iHaveEosAccountWorker);
  yield takeLatest(I_HAVE_NOT_EOS_ACCOUNT, idontHaveEosAccountWorker);
  yield takeLatest([SIGNUP_WITH_WALLET], signUpWithWalletWorker);
  yield takeLatest(SHOW_WALLET_SIGNUP_FORM, showWalletSignUpFormWorker);
  yield takeLatest(
    [SIGNUP_WITH_WALLET_SUCCESS, REDIRECT_TO_FEED],
    redirectToFeedWorker,
  );
}
