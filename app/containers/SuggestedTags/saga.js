import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  getSuggestedTags,
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { GET_SUGGESTED_TAGS, UPVOTE, DOWNVOTE } from './constants';
import {
  getSuggestedTagsSuccess,
  getSuggestedTagsErr,
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
} from './actions';

import { selectTags } from './selectors';

import { upVoteValidator, downVoteValidator } from './validate';

export function* getSuggestedTagsWorker({ communityid }) {
  try {
    const eosService = yield select(selectEos);
    const tags = yield call(() => getSuggestedTags(eosService, communityid));

    yield put(getSuggestedTagsSuccess(tags));
  } catch (err) {
    yield put(getSuggestedTagsErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* upVoteWorker({ communityid, tagid, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedTags = yield select(selectTags());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());
    const profileInfo = yield call(() =>
      getProfileInfo(selectedAccount, eosService),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const activeTag = storedTags.filter(x => x.id === +tagid)[0];

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
      upVoteToCreateTag(eosService, selectedAccount, communityid, tagid),
    );

    const tags = yield call(() => getSuggestedTags(eosService, communityid));

    yield put(upVoteSuccess(tags));
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityid, tagid, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedTags = yield select(selectTags());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());
    const profileInfo = yield call(() =>
      getProfileInfo(selectedAccount, eosService),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const activeTag = storedTags.filter(x => x.id === +tagid)[0];

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
      return yield put(upVoteErr('Validation Error'));
    }

    yield call(() =>
      downVoteToCreateTag(eosService, selectedAccount, communityid, tagid),
    );

    const tags = yield call(() => getSuggestedTags(eosService, communityid));

    yield put(downVoteSuccess(tags));
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_SUGGESTED_TAGS, getSuggestedTagsWorker);
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
