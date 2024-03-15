import ReactGA from 'react-ga4';
import { getCurrentSuiAccount } from 'containers/AccountProvider/actions';
import { setEmailLoginData } from 'containers/SuiProvider/actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { updateAcc, emptyProfile, emailSignIn, verifyEmail } from 'utils/accountManagement';
import { WebIntegrationError } from 'utils/errors';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { deleteCookie, setCookie } from 'utils/cookie';
import { CONNECTED_WALLET } from 'utils/constants';

import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { hideLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { selectIsNewPostCreationAfterLogin } from 'containers/Login/selectors';
import {
  loginWithWalletSuccess,
  loginWithWalletErr,
  signInWithEmailErr,
  signInWithEmailSuccess,
  verifyEmailSuccess,
  verifyEmailError,
  hideSignInModal,
} from './actions';

import {
  EMAIL_LOGIN_DATA,
  LOGIN_WITH_SUI,
  LOGIN_WITH_WALLET,
  SIGN_IN_WITH_EMAIL,
  VERIFY_EMAIL,
} from './constants';

import { selectEthereum } from '../EthereumProvider/selectors';

export function* loginWithWalletWorker({ t, isTorus }) {
  try {
    yield put(hideSignInModal());
    const ethereumService = yield select(selectEthereum);
    const isNewPostCreationAfterLogin = yield select(selectIsNewPostCreationAfterLogin());

    let currentAccount;
    let metaMaskUserAddress = null;

    metaMaskUserAddress = yield call(ethereumService.walletLogIn, null, isTorus);

    if (!metaMaskUserAddress) {
      throw new WebIntegrationError(t('login.userIsNotSelected'));
    }

    currentAccount = metaMaskUserAddress;

    yield call(getCurrentAccountWorker, currentAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      profileInfo = emptyProfile(currentAccount);
    }

    const connectedWalletLabel = isTorus ? 'Torus' : ethereumService.connectedWallets[0].label;
    const expirationDate = new Date();

    expirationDate.setTime(expirationDate.getTime() + 12 * 60 * 60 * 1000);
    deleteCookie(CONNECTED_WALLET);
    setCookie({
      name: CONNECTED_WALLET,
      value: connectedWalletLabel,
      options: {
        defaultPath: true,
        allowSubdomains: true,
        expires: expirationDate,
      },
    });
    setCookie({
      name: 'agreement',
      value: window.localStorage.getItem('onboard.js:agreement'),
    });
    setCookie({
      name: 'isVisitedSite',
      value: true,
    });

    if (isNewPostCreationAfterLogin) {
      yield call(createdHistory.push, routes.questionAsk());
    }

    yield put(loginWithWalletSuccess());
    ReactGA.event({
      category: 'Users',
      action: `${connectedWalletLabel}_wallet_login_connected`,
    });
    yield call(updateAcc, profileInfo, ethereumService);
  } catch (err) {
    document.getElementsByTagName('body')[0].style.position = 'relative';

    yield put(loginWithWalletErr(err));
  }
}

export function* signInWithEmailWorker({ email }) {
  try {
    yield call(emailSignIn, email);

    yield put(signInWithEmailSuccess());
  } catch (err) {
    yield put(signInWithEmailErr(err));
  }
}

export function* verifyEmailWorker({ email, verificationCode, resolve, reject }) {
  try {
    const isNewPostCreationAfterLogin = yield select(selectIsNewPostCreationAfterLogin());
    const { ok, response } = yield call(verifyEmail, email, verificationCode);
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
    setCookie({
      name: EMAIL_LOGIN_DATA,
      value: JSON.stringify({ address: response.address, token: response.token, email }),
      options: {
        defaultPath: true,
        allowSubdomains: true,
        expires: expirationDate,
      },
    });
    if (!ok) {
      reject();
      yield put(verifyEmailError());
    } else {
      resolve();
      yield put(setEmailLoginData({ address: response.address, token: response.token, email }));
      yield put(verifyEmailSuccess());
      ReactGA.event({
        category: 'Users',
        action: 'email_login_connected',
      });
    }
    if (isNewPostCreationAfterLogin) {
      yield call(createdHistory.push, routes.questionAsk());
    }
    yield put(getCurrentSuiAccount());
  } catch (err) {
    yield put(verifyEmailError(err));
  }
}

export function* loginWithSuiWorker() {
  try {
    const isNewPostCreationAfterLogin = yield select(selectIsNewPostCreationAfterLogin());
    yield put(loginWithWalletSuccess());
    ReactGA.event({
      category: 'Users',
      action: 'sui_wallet_login_connected',
    });

    if (isNewPostCreationAfterLogin) {
      const ev = { currentTarget: { id: 1 } };

      yield put(redirectToAskQuestionPage(ev));
    }
  } catch (err) {
    document.getElementsByTagName('body')[0].style.position = 'relative';

    yield put(loginWithWalletErr(err));
  }
}

export function* redirectToFeedWorker() {
  const isLeftMenuVisible = yield select(selectIsMenuVisible());
  const profileInfo = yield select(makeSelectProfileInfo());
  const singleCommunityId = isSingleCommunityWebsite();

  if (isLeftMenuVisible) {
    yield put(hideLeftMenu());
  }

  if (profileInfo && !singleCommunityId) {
    yield call(createdHistory.push, routes.feed());
  } else if (singleCommunityId) {
    yield call(createdHistory.push, routes.questions());
  }
}

export default function* () {
  yield takeLatest(LOGIN_WITH_WALLET, loginWithWalletWorker);
  yield takeLatest(LOGIN_WITH_SUI, loginWithSuiWorker);
  yield takeLatest(SIGN_IN_WITH_EMAIL, signInWithEmailWorker);
  yield takeLatest(VERIFY_EMAIL, verifyEmailWorker);
}
