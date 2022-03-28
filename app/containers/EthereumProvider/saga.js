/* eslint consistent-return: 0, no-shadow: 0 */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import EthereumService from 'utils/ethereum';
import { ApplicationError } from 'utils/errors';
import { autoLogin } from 'utils/web_integration/src/wallet/login/login';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
} from 'containers/AccountProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { logout } from 'containers/Logout/actions';

import {
  getCurrentAccountWorker,
  updateAccWorker,
  isAvailableAction,
} from 'containers/AccountProvider/saga';

import { initEthereumSuccess, initEthereumError } from './actions';
import { INIT_ETHEREUM, INIT_ETHEREUM_SUCCESS } from './constants';

import validate from './validate';
import { getCookie } from '../../utils/cookie';
import { AUTOLOGIN_DATA } from '../Login/constants';

export function* initEthereumWorker() {
  try {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
    const ethereumService = new EthereumService();
    if (autoLoginData && autoLoginData.loginWithMetaMask) {
      yield call(ethereumService.initEthereum);
      if (ethereumService.metaMaskProviderDetected) {
        yield call(ethereumService.metaMaskSignIn);

        yield call(
          ethereumService.setMetaMaskAutologinData,
          autoLoginData.metaMaskUserAddress,
        );

        yield put(initEthereumSuccess(ethereumService));
      }
      yield put(initEthereumSuccess(ethereumService));
    }

    yield call(ethereumService.initEthereum);
    yield put(initEthereumSuccess(ethereumService));
  } catch (error) {
    yield put(initEthereumError(error));
  }
}

export function* isAuthorized() {
  const profileInfo = yield select(makeSelectProfileInfo());

  if (!profileInfo) {
    yield put(showLoginModal());
    throw new ApplicationError('Not authorized');
  }
}

export function* isValid({ creator, buttonId, minRating = 0, communityId }) {
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const selectedAccount = yield select(makeSelectAccount());

  yield call(
    isAvailableAction,
    () =>
      validate({
        rating: profileInfo.ratings.get(communityId),
        translations: translationMessages[locale],
        actor: selectedAccount,
        creator,
        buttonId,
        minRating,
      }),
    {
      communityID: communityId,
    },
  );
}

export default function*() {
  yield takeLatest(INIT_ETHEREUM, initEthereumWorker);
  yield takeLatest(INIT_ETHEREUM_SUCCESS, updateAccWorker);
}
