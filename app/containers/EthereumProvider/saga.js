/* eslint consistent-return: 0, no-shadow: 0 */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import EthereumService from 'containers/NetworkAdapter/ethereumService/ethereum';
import { ApplicationError } from 'utils/errors';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
  selectPermissions,
} from 'containers/AccountProvider/selectors';

import { loginWithWallet } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  getCurrentAccountWorker,
  updateAccWorker,
  isAvailableAction,
} from 'containers/AccountProvider/saga';

import { getRatingByCommunity } from 'utils/profileManagement';
import { initEthereumSuccess, initEthereumError } from './actions';
import { INIT_ETHEREUM, INIT_ETHEREUM_SUCCESS } from './constants';

// import validate from 'app/containers/NetworkAdapter/validate';
import { hasGlobalModeratorRole } from '../../utils/properties';

export function* initEthereumWorker({ data }) {
  try {
    const ethereumService = new EthereumService(data);
    yield call(ethereumService.initEthereum);
    yield put(initEthereumSuccess(ethereumService));
  } catch (error) {
    yield put(initEthereumError(error));
  }
}

export function* isAuthorized() {
  const profileInfo = yield select(makeSelectProfileInfo());

  if (!profileInfo) {
    yield put(loginWithWallet({ metaMask: true }));
    throw new ApplicationError('Not authorized');
  }
}

export function* isValid({ creator, buttonId, minRating = 0, communityId }) {
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const selectedAccount = yield select(makeSelectAccount());
  const permissions = yield select(selectPermissions());

  const isGlobalAdmin = hasGlobalModeratorRole(permissions);

  // yield call(
  //   isAvailableAction,
  //   () =>
  //     validate({
  //       rating: getRatingByCommunity(profileInfo, communityId),
  //       translations: translationMessages[locale],
  //       actor: selectedAccount,
  //       isGlobalAdmin,
  //       creator,
  //       buttonId,
  //       minRating,
  //     }),
  //   {
  //     communityID: communityId,
  //   },
  // );
}

export default function*() {
  yield takeLatest(INIT_ETHEREUM, initEthereumWorker);
  yield takeLatest(INIT_ETHEREUM_SUCCESS, updateAccWorker);
}
