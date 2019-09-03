import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { getSuggestedTagsWorker } from 'containers/Tags/saga';
import { selectSuggestedTags } from 'containers/Tags/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { UPVOTE, DOWNVOTE } from './constants';

import {
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
} from './actions';

import { upVoteValidator, downVoteValidator } from './validate';

/* eslint consistent-return: 0 */
export function* upVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedTags = yield select(selectSuggestedTags());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield select(makeSelectProfileInfo());

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

    yield call(() => getSuggestedTagsWorker({ communityId }));

    yield put(upVoteSuccess());
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityId, tagId, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedTags = yield select(selectSuggestedTags());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield select(makeSelectProfileInfo());

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
