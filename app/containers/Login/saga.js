import { call, put, takeLatest, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { updateAcc, emptyProfile } from 'utils/accountManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { setCookie } from 'utils/cookie';

import { redirectToFeed } from 'containers/App/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { hideLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { selectIsNewPostCreationAfterLogin } from 'containers/Login/selectors';
import {
  loginWithEmailSuccess,
  loginWithEmailErr,
  loginWithWalletSuccess,
  loginWithWalletErr,
} from './actions';

import {
  LOGIN_WITH_EMAIL,
  USER_IS_NOT_SELECTED,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMEMBER_ME_FIELD,
  DISPLAY_NAME,
  LOGIN_WITH_WALLET,
} from './constants';

import messages from './messages';
import { addLoginData } from '../AccountProvider/actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { DISPLAY_NAME_FIELD } from '../Profile/constants';
import { saveProfileWorker } from '../EditProfilePage/saga';

function* continueLogin({ address }) {
  yield call(getCurrentAccountWorker, address);

  yield put(loginWithEmailSuccess());
}

export function* loginWithEmailWorker({ val }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const email = val[EMAIL_FIELD];
    const password = val[PASSWORD_FIELD];
    const rememberMe = Boolean(val[REMEMBER_ME_FIELD]);

    const response = yield call(
      login,
      email,
      password,
      rememberMe,
      ethereumService,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    ethereumService.setSelectedAccount(response.body.address);

    yield put(addLoginData(response.peeranhaAutoLogin));
    if (!isSingleCommunityWebsite()) yield put(redirectToFeed());
    yield call(continueLogin, response.body);
  } catch (err) {
    yield put(loginWithEmailErr(err));
  }
}

export function* loginWithWalletWorker({ metaMask }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());
    const isNewPostCreationAfterLogin = yield select(
      selectIsNewPostCreationAfterLogin(),
    );
    const translations = translationMessages[locale];

    let currentAccount;
    let metaMaskUserAddress = null;

    if (metaMask) {
      metaMaskUserAddress = yield call(ethereumService.walletLogIn);

      if (!metaMaskUserAddress) {
        throw new WebIntegrationError(
          translations[messages[USER_IS_NOT_SELECTED].id],
        );
      }

      currentAccount = metaMaskUserAddress;
    }

    yield call(getCurrentAccountWorker, currentAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      profileInfo = emptyProfile(currentAccount);
    }

    const connectedWalletLabel = ethereumService.connectedWallets[0].label;

    setCookie({
      name: 'connectedWallet',
      value: connectedWalletLabel,
    });
    setCookie({
      name: 'agreement',
      value: window.localStorage.getItem('onboard.js:agreement'),
    });

    if (isNewPostCreationAfterLogin) {
      const ev = { currentTarget: { id: 1 } };

      yield put(redirectToAskQuestionPage(ev));
    }

    yield put(loginWithWalletSuccess());
    yield call(updateAcc, profileInfo, ethereumService);
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

export default function*() {
  yield takeLatest(LOGIN_WITH_EMAIL, loginWithEmailWorker);
  yield takeLatest(LOGIN_WITH_WALLET, loginWithWalletWorker);
}
