/* eslint indent: 0 */
import { takeEvery, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import {
  FOLLOW_HANDLER,
  MIN_RATING_TO_FOLLOW,
  MIN_ENERGY_TO_FOLLOW,
} from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';

export function* followHandlerWorker({
  communityIdFilter,
  isFollowed,
  buttonId,
}) {
  try {
    const eosService = yield select(selectEos);
    const prevProfileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(isValid, {
      buttonId,
      minRating: MIN_RATING_TO_FOLLOW,
      minEnergy: MIN_ENERGY_TO_FOLLOW,
    });

    yield call(
      isFollowed ? unfollowCommunity : followCommunity,
      eosService,
      communityIdFilter,
      prevProfileInfo.user,
    );

    const profileInfo = yield select(makeSelectProfileInfo());

    yield put(
      getUserProfileSuccess({
        ...profileInfo,
        followed_communities: isFollowed
          ? profileInfo.followed_communities.filter(
              commId => commId !== +communityIdFilter,
            )
          : [...profileInfo.followed_communities, +communityIdFilter],
      }),
    );

    yield put(
      followHandlerSuccess({ communityIdFilter, isFollowed, buttonId }),
    );
  } catch (err) {
    yield put(followHandlerErr(err, buttonId));
  }
}

export default function*() {
  yield takeEvery(FOLLOW_HANDLER, followHandlerWorker);
}
