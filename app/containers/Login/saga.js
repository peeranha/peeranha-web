import { call, put, takeLatest, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { updateAcc, emptyProfile } from 'utils/accountManagement';
import { WebIntegrationError } from 'utils/errors';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { setCookie } from 'utils/cookie';

import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { hideLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { selectIsNewPostCreationAfterLogin } from 'containers/Login/selectors';
import { loginWithWalletSuccess, loginWithWalletErr } from './actions';

import { LOGIN_WITH_SUI, LOGIN_WITH_WALLET } from './constants';

import { selectEthereum } from '../EthereumProvider/selectors';

export function* loginWithWalletWorker({ t }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const isNewPostCreationAfterLogin = yield select(selectIsNewPostCreationAfterLogin());

    let currentAccount;
    let metaMaskUserAddress = null;

    metaMaskUserAddress = yield call(ethereumService.walletLogIn);

    if (!metaMaskUserAddress) {
      throw new WebIntegrationError(t('login.userIsNotSelected'));
    }

    currentAccount = metaMaskUserAddress;

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
    setCookie({
      name: 'isVisitedSite',
      value: true,
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

export function* loginWithSuiWorker({ address }) {
  try {
    yield put(loginWithWalletSuccess());
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
}
