import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import { selectSuggestedCommunities } from 'containers/Communities/selectors';
import { getSuggestedCommunitiesWorker } from 'containers/Communities/saga';
import { clearSuggestedCommunities } from 'containers/Communities/actions';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  UPVOTE,
  DOWNVOTE,
  MIN_RATING_TO_UPVOTE,
  MIN_RATING_TO_DOWNVOTE,
  MIN_ENERGY_TO_UPVOTE,
  MIN_ENERGY_TO_DOWNVOTE,
} from './constants';

import {
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
} from './actions';

/* eslint consistent-return: 0 */
export function* upVoteWorker({ communityId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield select(makeSelectAccount());
    const storedCommunities = yield select(selectSuggestedCommunities());

    const activeCommunity = storedCommunities.filter(
      x => x.id === +communityId,
    )[0];

    yield call(isAuthorized);

    yield call(isValid, {
      creator: activeCommunity.creator,
      buttonId,
      minRating: MIN_RATING_TO_UPVOTE,
      minEnergy: MIN_ENERGY_TO_UPVOTE,
    });

    yield call(() =>
      upVoteToCreateCommunity(eosService, selectedAccount, communityId),
    );

    yield put(clearSuggestedCommunities());
    yield call(() => getSuggestedCommunitiesWorker());

    yield put(upVoteSuccess());
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield select(makeSelectAccount());
    const storedCommunities = yield select(selectSuggestedCommunities());

    const activeCommunity = storedCommunities.filter(
      x => x.id === +communityId,
    )[0];

    yield call(isAuthorized);

    yield call(isValid, {
      creator: activeCommunity.creator,
      buttonId,
      minRating: MIN_RATING_TO_DOWNVOTE,
      minEnergy: MIN_ENERGY_TO_DOWNVOTE,
    });

    yield call(() =>
      downVoteToCreateCommunity(eosService, selectedAccount, communityId),
    );

    yield put(clearSuggestedCommunities());
    yield call(() => getSuggestedCommunitiesWorker());

    yield put(downVoteSuccess());
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
