import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { getSuggestedTagsWorker } from 'containers/Tags/saga';
import { selectSuggestedTags } from 'containers/Tags/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
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
export function* upVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield select(makeSelectAccount());
    const storedTags = yield select(selectSuggestedTags());

    const activeTag = storedTags.filter(x => x.id === +tagId)[0];

    yield call(isAuthorized);

    yield call(isValid, {
      creator: activeTag.creator,
      buttonId,
      minRating: MIN_RATING_TO_UPVOTE,
      minEnergy: MIN_ENERGY_TO_UPVOTE,
    });

    yield call(() =>
      upVoteToCreateTag(eosService, selectedAccount, communityId, tagId),
    );

    yield call(() => getSuggestedTagsWorker({ communityId }));

    yield put(upVoteSuccess());
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield select(makeSelectAccount());
    const storedTags = yield select(selectSuggestedTags());

    const activeTag = storedTags.filter(x => x.id === +tagId)[0];

    yield call(isAuthorized);

    yield call(isValid, {
      creator: activeTag.creator,
      buttonId,
      minRating: MIN_RATING_TO_DOWNVOTE,
      minEnergy: MIN_ENERGY_TO_DOWNVOTE,
    });

    yield call(() =>
      downVoteToCreateTag(eosService, selectedAccount, communityId, tagId),
    );

    yield call(() => getSuggestedTagsWorker({ communityId }));

    yield put(downVoteSuccess());
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
