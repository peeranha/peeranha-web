import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  followCommunity,
  unfollowCommunity,
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { showLoginModal } from 'containers/Login/actions';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { selectSuggestedCommunities } from 'containers/Communities/selectors';
import { getSuggestedCommunitiesWorker } from 'containers/Communities/saga';
import { clearSuggestedCommunities } from 'containers/Communities/actions';

import {
  upVoteValidator,
  downVoteValidator,
} from 'containers/VoteForNewCommunityButton/validate';

import {
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
  followHandlerSuccess,
  followHandlerErr,
} from './actions';

import { FOLLOW_HANDLER, UPVOTE, DOWNVOTE } from './constants';

export function* followHandlerWorker({ communityIdFilter, isFollowed }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield call(() =>
      getUserProfileWorker({ user: selectedAccount }),
    );

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    if (isFollowed) {
      yield call(() =>
        unfollowCommunity(eosService, communityIdFilter, selectedAccount),
      );
    } else {
      yield call(() =>
        followCommunity(eosService, communityIdFilter, selectedAccount),
      );
    }

    // remove user from cache to update him after
    yield put(removeUserProfile(selectedAccount));
    const profile = yield call(() =>
      getUserProfileWorker({ user: selectedAccount }),
    );

    yield put(getCurrentAccountSuccess(selectedAccount, profile));

    yield put(followHandlerSuccess());
  } catch (err) {
    yield put(followHandlerErr(err.message));
  }
}

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

    yield put(clearSuggestedCommunities());
    yield call(() => getSuggestedCommunitiesWorker());

    yield put(downVoteSuccess());
  } catch (err) {
    yield put(downVoteErr(err.message));
  }
}

export default function*() {
  yield takeLatest(FOLLOW_HANDLER, followHandlerWorker);
  yield takeLatest(UPVOTE, upVoteWorker);
  yield takeLatest(DOWNVOTE, downVoteWorker);
}
