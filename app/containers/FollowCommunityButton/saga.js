/* eslint indent: 0 */
import { takeEvery, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';
import { followSuiCommunity } from 'utils/sui/communityManagement';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';

import { FOLLOW_HANDLER, MIN_RATING_TO_FOLLOW, MIN_ENERGY_TO_FOLLOW } from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { createSuiProfile, getSuiProfileInfo } from 'utils/sui/profileManagement';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

export function* followHandlerWorker({ communityIdFilter, isFollowed, buttonId }) {
  try {
    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      const communities = yield select(selectCommunities());
      const profile = yield select(makeSelectProfileInfo());
      const suiCommunityId = communities.find(
        (community) => community.id === communityIdFilter,
      ).suiId;

      const suiUserObject = yield call(getSuiUserObject, wallet.address);
      if (!suiUserObject) {
        yield call(createSuiProfile, wallet);
        yield put(transactionCompleted());
        const newProfile = yield call(getSuiProfileInfo, wallet.address);
        profile.id = newProfile.id;
      }
      yield put(transactionInitialised());
      const txResult = yield call(
        followSuiCommunity,
        wallet,
        profile.id,
        suiCommunityId,
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
        ? profileInfo.followedCommunities.filter((commId) => commId !== +communityIdFilter)
        : [...profileInfo.followedCommunities, +communityIdFilter],
    };
    yield put(getUserProfileSuccess(updatedProfileInfo));
    yield put(followHandlerSuccess({ communityIdFilter, isFollowed, buttonId }));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(followHandlerErr(err, buttonId));
  }
}

export default function* () {
  yield takeEvery(FOLLOW_HANDLER, followHandlerWorker);
}
