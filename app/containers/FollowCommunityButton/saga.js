/* eslint indent: 0 */
import { takeEvery, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  FOLLOW_HANDLER,
  MIN_RATING_TO_FOLLOW,
  MIN_ENERGY_TO_FOLLOW,
} from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* followHandlerWorker({
  communityIdFilter,
  isFollowed,
  buttonId,
}) {
  try {
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

    const profileInfo = yield select(makeSelectProfileInfo());
    const updatedProfileInfo = {
      ...profileInfo,
      followedCommunities: isFollowed
        ? profileInfo.followedCommunities.filter(
            (commId) => commId !== +communityIdFilter,
          )
        : [...profileInfo.followedCommunities, +communityIdFilter],
    };

    yield put(getUserProfileSuccess(updatedProfileInfo));
    yield put(
      followHandlerSuccess({ communityIdFilter, isFollowed, buttonId }),
    );
  } catch (err) {
    yield put(followHandlerErr(err, buttonId));
  }
}

export default function* followCommunityButtonSaga() {
  yield takeEvery(FOLLOW_HANDLER, followHandlerWorker);
}
