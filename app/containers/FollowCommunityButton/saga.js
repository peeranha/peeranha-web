/* eslint indent: 0 */
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { showLoginModal } from 'containers/Login/actions';
import { takeEvery, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/constants';
import { ApplicationError } from 'utils/errors';
import { getActualId } from 'utils/properties';
import { followSuiCommunity } from 'utils/sui/communityManagement';
import { waitForTransactionConfirmation } from 'utils/sui/sui';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { createSuiProfile, getSuiProfileInfo } from 'utils/sui/profileManagement';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

import { FOLLOW_HANDLER, MIN_RATING_TO_FOLLOW, MIN_ENERGY_TO_FOLLOW } from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* followHandlerWorker({ communityIdFilter, isFollowed, buttonId }) {
  try {
    if (isSuiBlockchain) {
      const profile = yield select(makeSelectProfileInfo());
      if (!profile) {
        yield put(showLoginModal());
        throw new ApplicationError('Not authorized');
      }
      const wallet = yield select(selectSuiWallet());

      const suiUserObject = yield call(getSuiUserObject, wallet.address);
      if (!suiUserObject) {
        yield call(createSuiProfile, wallet);
        yield put(transactionCompleted());
        const newProfile = yield call(getSuiProfileInfo, wallet.address);

        yield put(getUserProfileSuccess(newProfile));
        yield put(getCurrentAccountSuccess(newProfile.id, 0, 0, 0));
        profile.id = newProfile.id;
      }
      yield put(transactionInitialised());
      const txResult = yield call(
        followSuiCommunity,
        wallet,
        profile.id,
        getActualId(communityIdFilter),
        isFollowed,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
      const ethereumService = yield select(selectEthereum);
      const account = yield select(makeSelectAccount());

      yield call(isAuthorized);

      yield call(isValid, {
        buttonId,
        minRating: MIN_RATING_TO_FOLLOW,
        minEnergy: MIN_ENERGY_TO_FOLLOW,
      });
      yield call(
        isFollowed ? unfollowCommunity : followCommunity,
        ethereumService,
        communityIdFilter,
        account,
      );
    }
    const profileInfo = yield select(makeSelectProfileInfo());
    const updatedProfileInfo = {
      ...profileInfo,
      followedCommunities: isFollowed
        ? profileInfo.followedCommunities.filter((commId) => commId !== communityIdFilter)
        : [...profileInfo.followedCommunities, communityIdFilter],
    };
    yield put(getUserProfileSuccess(updatedProfileInfo));
    yield put(followHandlerSuccess({ communityIdFilter, isFollowed, buttonId }));
  } catch (err) {
    yield put(followHandlerErr(err, buttonId));
  }
}

export default function* () {
  yield takeEvery(FOLLOW_HANDLER, followHandlerWorker);
}
