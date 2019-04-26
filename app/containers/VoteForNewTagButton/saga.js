import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { getSuggestedTags } from 'containers/Tags/saga';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { UPVOTE, DOWNVOTE } from './constants';

import {
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
} from './actions';

import { selectTags } from './selectors';

import { upVoteValidator, downVoteValidator } from './validate';

/* eslint consistent-return: 0 */
export function* upVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedTags = yield select(selectTags());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield call(() =>
      getUserProfileWorker({ user: selectedAccount }),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const activeTag = storedTags.filter(x => x.id === +tagId)[0];

    const isValid = yield call(() =>
      upVoteValidator(
        profileInfo,
        locale,
        selectedAccount,
        activeTag,
        buttonId,
      ),
    );

    if (!isValid) {
      return yield put(upVoteErr('Validation Error'));
    }

    yield call(() =>
      upVoteToCreateTag(eosService, selectedAccount, communityId, tagId),
    );

    const tags = yield call(() => getSuggestedTags(eosService, communityId));

    yield put(upVoteSuccess(tags));
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedTags = yield select(selectTags());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield call(() =>
      getUserProfileWorker({ user: selectedAccount }),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const activeTag = storedTags.filter(x => x.id === +tagId)[0];

    const isValid = yield call(() =>
      downVoteValidator(
        profileInfo,
        locale,
        selectedAccount,
        activeTag,
        buttonId,
      ),
    );

    if (!isValid) {
      return yield put(downVoteErr('Validation Error'));
    }

    yield call(() =>
      downVoteToCreateTag(eosService, selectedAccount, communityId, tagId),
    );

    const tags = yield call(() => getSuggestedTags(eosService, communityId));

    yield put(downVoteSuccess(tags));
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
