/* eslint consistent-return: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';

import {
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { getSuggestedTagsSuccess } from 'containers/Tags/actions';
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

// TODO: test
export function* upVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());
    const storedTags = yield select(selectSuggestedTags());

    const activeTag = storedTags.filter(x => x.id === +tagId)[0];

    yield call(isAuthorized);

    yield call(isValid, {
      creator: activeTag.creator,
      buttonId,
      minRating: MIN_RATING_TO_UPVOTE,
      minEnergy: MIN_ENERGY_TO_UPVOTE,
      communityId,
    });

    yield call(upVoteToCreateTag, eosService, account, communityId, tagId);

    if (activeTag.upvotes.includes(account)) {
      activeTag.upvotes = activeTag.upvotes.filter(x => x !== account);
    } else {
      activeTag.upvotes = [...activeTag.upvotes, account];
      activeTag.downvotes = activeTag.downvotes.filter(x => x !== account);
    }

    yield put(getSuggestedTagsSuccess([...storedTags]));
    yield put(upVoteSuccess(buttonId));
  } catch (err) {
    yield put(upVoteErr(err, buttonId));
  }
}

// TODO: test
export function* downVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());
    const storedTags = yield select(selectSuggestedTags());

    const activeTag = storedTags.filter(x => x.id === +tagId)[0];

    yield call(isAuthorized);

    yield call(isValid, {
      creator: activeTag.creator,
      buttonId,
      minRating: MIN_RATING_TO_DOWNVOTE,
      minEnergy: MIN_ENERGY_TO_DOWNVOTE,
      communityId,
    });

    yield call(downVoteToCreateTag, eosService, account, communityId, tagId);

    if (activeTag.downvotes.includes(account)) {
      activeTag.downvotes = activeTag.downvotes.filter(x => x !== account);
    } else {
      activeTag.downvotes = [...activeTag.downvotes, account];
      activeTag.upvotes = activeTag.upvotes.filter(x => x !== account);
    }

    yield put(getSuggestedTagsSuccess([...storedTags]));
    yield put(downVoteSuccess(buttonId));
  } catch (err) {
    yield put(downVoteErr(err, buttonId));
  }
}

export default function*() {
  yield takeEvery(UPVOTE, upVoteWorker);
  yield takeEvery(DOWNVOTE, downVoteWorker);
}
