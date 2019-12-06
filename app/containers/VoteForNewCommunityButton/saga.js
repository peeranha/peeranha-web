/* eslint consistent-return: 0 */
import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import { selectSuggestedCommunities } from 'containers/Communities/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { getSuggestedCommunitiesSuccess } from 'containers/Communities/actions';

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

// TODO: test
export function* upVoteWorker({ communityId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());
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

    yield call(upVoteToCreateCommunity, eosService, account, communityId);

    if (activeCommunity.upvotes.includes(account)) {
      activeCommunity.upvotes = activeCommunity.upvotes.filter(
        x => x !== account,
      );
    } else {
      activeCommunity.upvotes = [...activeCommunity.upvotes, account];
      activeCommunity.downvotes = activeCommunity.downvotes.filter(
        x => x !== account,
      );
    }

    yield put(getSuggestedCommunitiesSuccess([...storedCommunities], true));
    yield put(upVoteSuccess());
  } catch (err) {
    yield put(upVoteErr(err));
  }
}

// TODO: test
export function* downVoteWorker({ communityId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());
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

    yield call(downVoteToCreateCommunity, eosService, account, communityId);

    if (activeCommunity.downvotes.includes(account)) {
      activeCommunity.downvotes = activeCommunity.downvotes.filter(
        x => x !== account,
      );
    } else {
      activeCommunity.downvotes = [...activeCommunity.downvotes, account];
      activeCommunity.upvotes = activeCommunity.upvotes.filter(
        x => x !== account,
      );
    }

    yield put(getSuggestedCommunitiesSuccess([...storedCommunities], true));
    yield put(downVoteSuccess());
  } catch (err) {
    yield put(downVoteErr(err));
  }
}

export default function*() {
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
