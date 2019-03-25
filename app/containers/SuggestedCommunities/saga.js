import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  getSuggestedCommunities,
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { GET_SUGGESTED_COMMUNITIES, UPVOTE, DOWNVOTE } from './constants';
import {
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
} from './actions';

import { selectCommunities } from './selectors';

import { upVoteValidator, downVoteValidator } from './validate';

export function* getSuggestedCommunitiesWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(() => getSuggestedCommunities(eosService));

    yield put(getSuggestedCommunitiesSuccess(communities));
  } catch (err) {
    yield put(getSuggestedCommunitiesErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* upVoteWorker({ communityid, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedCommunities = yield select(selectCommunities());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());
    const profileInfo = yield call(() =>
      getProfileInfo(selectedAccount, eosService),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const activeCommunity = storedCommunities.filter(
      x => x.id === +communityid,
    )[0];

    const isValid = yield call(() =>
      upVoteValidator(
        profileInfo,
        locale,
        selectedAccount,
        activeCommunity,
        buttonId,
      ),
    );

    if (!isValid) {
      return yield put(upVoteErr('Validation Error'));
    }

    yield call(() =>
      upVoteToCreateCommunity(eosService, selectedAccount, communityid),
    );

    const communities = yield call(() => getSuggestedCommunities(eosService));

    yield put(upVoteSuccess(communities));
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityid, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedCommunities = yield select(selectCommunities());

    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());
    const profileInfo = yield call(() =>
      getProfileInfo(selectedAccount, eosService),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const activeCommunity = storedCommunities.filter(
      x => x.id === +communityid,
    )[0];

    const isValid = yield call(() =>
      downVoteValidator(
        profileInfo,
        locale,
        selectedAccount,
        activeCommunity,
        buttonId,
      ),
    );

    if (!isValid) {
      return yield put(downVoteErr('Validation Error'));
    }

    yield call(() =>
      downVoteToCreateCommunity(eosService, selectedAccount, communityid),
    );

    const communities = yield call(() => getSuggestedCommunities(eosService));

    yield put(downVoteSuccess(communities));
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_SUGGESTED_COMMUNITIES, getSuggestedCommunitiesWorker);
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
