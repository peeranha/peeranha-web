import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerComplete,
  registerConfirmEmail,
  registerInit,
} from 'utils/web_integration/src/wallet/register/register';
import { WebIntegrationError } from 'utils/errors';

import { successHandling } from 'containers/Toast/saga';

import {
  EMAIL_FIELD as EMAIL_LOGIN_FIELD,
  PASSWORD_FIELD as PASSWORD_LOGIN_FIELD,
  WE_ARE_HAPPY_FORM,
} from 'containers/Login/constants';

import {
  loginWithEmailWorker,
  redirectToFeedWorker,
} from 'containers/Login/saga';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_VERIFICATION,
  SIGN_UP_VIA_EMAIL,
  PASSWORD_FIELD,
  SEND_ANOTHER_CODE,
  SHOW_WALLET_SIGNUP_FORM,
  SIGNUP_WITH_WALLET,
  SIGNUP_WITH_WALLET_SUCCESS,
  ETHEREUM_WALLET_ADDRESS,
} from './constants';

import {
  checkEmailErr,
  checkEmailSuccess,
  signUpViaEmailCompleteError,
  signUpViaEmailCompleteSuccess,
  showWalletSignUpFormErr,
  showWalletSignUpFormSuccess,
  verifyEmailErr,
  verifyEmailSuccess,
} from './actions';

import { selectEmail } from './selectors';

import { REDIRECT_TO_FEED } from '../App/constants';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getProfileInfo } from '../../utils/profileManagement';
import { loginWithEmailSuccess } from '../Login/actions';

const setEmailToStorage = (email) => {
  localStorage.setItem('signup_email', JSON.stringify(email));
};

const getEmailFromStorage = () =>
  JSON.parse(localStorage.getItem('signup_email'));

const setCodeToStorage = (code) => {
  localStorage.setItem('verification_code', JSON.stringify(code));
};

const getCodeFromStorage = () =>
  JSON.parse(localStorage.getItem('verification_code'));

export function* emailCheckingWorker({ email }) {
  try {
    setEmailToStorage(email);
    const response = yield call(registerInit, email);

    if (!response.OK) {
      throw new WebIntegrationError();
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
    const email = receivedEmail || getEmailFromStorage();

    setCodeToStorage(verificationCode);
    const response = yield call(registerConfirmEmail, email, verificationCode);

    if (!response.body.success) {
      throw new WebIntegrationError();
    }

    if (!response.OK) {
      throw new WebIntegrationError();
    }

    yield put(verifyEmailSuccess());
    if (redirect) {
      yield call(createdHistory.push, routes.signup.accountSetup.name);
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

export function* signUpComplete({ val }) {
  try {
    const email = getEmailFromStorage();

    const address = val[ETHEREUM_WALLET_ADDRESS];

    const profile = {
      displayName: `${address.substring(0, 6)}...${address.substring(
        account.length - 4,
      )}`,
    };

    const props = {
      email,
      code: getCodeFromStorage(),
      address,
      password: val[PASSWORD_FIELD],
    };

    const response = yield call(registerComplete, props, profile);

    if (!response.OK) {
      throw new WebIntegrationError();
    }

    if (response.OK) {
      yield call(loginWithEmailWorker, {
        val: {
          [EMAIL_LOGIN_FIELD]: email,
          [PASSWORD_LOGIN_FIELD]: val[PASSWORD_FIELD],
        },
      });
    }

    yield put(loginWithEmailSuccess(WE_ARE_HAPPY_FORM));
    yield put(signUpViaEmailCompleteSuccess());

    yield call(createdHistory.push, routes.questions());
  } catch (err) {
    yield put(signUpViaEmailCompleteError(err));
  }
}

export function* signUpWithWalletWorker({ val, metaMask }) {}

export function* showWalletSignUpFormWorker({ metaMask }) {
  try {
    const ethereumService = yield select(selectEthereum);
    let currentAccount;

    // sign up with metaMask
    if (metaMask) {
      currentAccount = yield call(ethereumService.walletLogIn);
    }
    let profileInfo = null;
    try {
      profileInfo = yield call(
        getProfileInfo,
        currentAccount,
        ethereumService,
        false,
        true,
      );
    } catch (err) {}
    if (profileInfo) {
      throw new WebIntegrationError();
    }
    yield put(showWalletSignUpFormSuccess(currentAccount));
    yield call(createdHistory.push, routes.signup.displayName.name);
  } catch (err) {
    yield put(showWalletSignUpFormErr(err));
  }
}

export default function* () {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
  yield takeLatest(EMAIL_VERIFICATION, verifyEmailWorker);
  yield takeLatest(SIGN_UP_VIA_EMAIL, signUpComplete);
  yield takeLatest([SIGNUP_WITH_WALLET], signUpWithWalletWorker);
  yield takeLatest(SHOW_WALLET_SIGNUP_FORM, showWalletSignUpFormWorker);
  yield takeLatest(
    [SIGNUP_WITH_WALLET_SUCCESS, REDIRECT_TO_FEED],
    redirectToFeedWorker,
  );
}