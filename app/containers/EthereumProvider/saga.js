import { takeLatest, call, put, select } from 'redux-saga/effects';

import EthereumService from 'utils/ethereum';
import { ApplicationError } from 'utils/errors';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
} from 'containers/AccountProvider/selectors';

import { loginWithWallet } from 'containers/Login/actions';

import {
  updateAccWorker,
  isAvailableAction,
} from 'containers/AccountProvider/saga';

import { getRatingByCommunity } from 'utils/profileManagement';
import { initEthereumSuccess, initEthereumError } from './actions';
import { INIT_ETHEREUM, INIT_ETHEREUM_SUCCESS } from './constants';

import validate from './validate';

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

export function* isValid({ creator, buttonId, minRating = 0, communityId, t }) {
  const profileInfo = yield select(makeSelectProfileInfo());
  const selectedAccount = yield select(makeSelectAccount());

  yield call(
    isAvailableAction,
    () =>
      validate({
        rating: getRatingByCommunity(profileInfo, communityId),
        translations: t,
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
