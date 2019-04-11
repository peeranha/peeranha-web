import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectSuggestedCommunities } from 'containers/Communities/selectors';
import { getSuggestedCommunitiesWorker } from 'containers/Communities/saga';

import { UPVOTE, DOWNVOTE } from './constants';

import {
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
} from './actions';

import { upVoteValidator, downVoteValidator } from './validate';

/* eslint consistent-return: 0 */
export function* upVoteWorker({ communityId, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedCommunities = yield select(selectSuggestedCommunities());

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
      x => x.id === +communityId,
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
      upVoteToCreateCommunity(eosService, selectedAccount, communityId),
    );

    const communities = yield call(() => getSuggestedCommunitiesWorker());

    yield put(upVoteSuccess(communities));
  } catch (err) {
    yield put(upVoteErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* downVoteWorker({ communityId, buttonId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const storedCommunities = yield select(selectSuggestedCommunities());

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
      x => x.id === +communityId,
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
      downVoteToCreateCommunity(eosService, selectedAccount, communityId),
    );

    const communities = yield call(() => getSuggestedCommunitiesWorker());

    yield put(downVoteSuccess(communities));
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
