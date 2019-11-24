/* eslint consistent-return: 0 */
import { call, put, takeLatest, select } from 'redux-saga/effects';

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
    });

    yield call(upVoteToCreateTag, eosService, account, communityId, tagId);

    if (activeTag.upvotes.includes(account)) {
      activeTag.upvotes = activeTag.upvotes.filter(x => x !== account);
    } else {
      activeTag.upvotes = [...activeTag.upvotes, account];
      activeTag.downvotes = activeTag.downvotes.filter(x => x !== account);
    }

    yield put(getSuggestedTagsSuccess([...storedTags]));
    yield put(upVoteSuccess());
  } catch ({ message }) {
    yield put(upVoteErr(message));
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
    });

    yield call(downVoteToCreateTag, eosService, account, communityId, tagId);

    if (activeTag.downvotes.includes(account)) {
      activeTag.downvotes = activeTag.downvotes.filter(x => x !== account);
    } else {
      activeTag.downvotes = [...activeTag.downvotes, account];
      activeTag.upvotes = activeTag.upvotes.filter(x => x !== account);
    }

    yield put(getSuggestedTagsSuccess([...storedTags]));
    yield put(downVoteSuccess());
  } catch ({ message }) {
    yield put(downVoteErr(message));
  }
}

export default function*() {
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
