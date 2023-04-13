import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities, getCommunityTags } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';
import { getMD } from 'utils/mdManagement';
import { getAchievements } from 'utils/achievementsManagement';
import { USER_ACHIEVEMENTS_TABLE } from 'utils/constants';

import { LOGOUT_SUCCESS } from 'containers/Logout/constants';
import { SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import { LOGIN_WITH_WALLET } from 'containers/Login/constants';

import {
  selectStat,
  selectUsers,
} from 'containers/DataCacheProvider/selectors';

import {
  getCommunities,
  getCommunitiesErr,
  getCommunitiesSuccess,
  getTags,
  getTagsErr,
  getTagsSuccess,
  getFaqErr,
  getFaqSuccess,
  getStatErr,
  getStatSuccess,
  getTutorialErr,
  getTutorialSuccess,
  getUserProfileErr,
  getUserProfileSuccess,
} from 'containers/DataCacheProvider/actions';

import {
  GET_COMMUNITIES,
  GET_COMMUNITY_TAGS,
  GET_FAQ,
  GET_STAT,
  GET_TAGS,
  GET_TUTORIAL,
  GET_USER_PROFILE,
} from 'containers/DataCacheProvider/constants';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { getUserStats } from 'utils/theGraph';

export function* getStatWorker() {
  try {
    const ethereumService = yield select(selectEthereum);
    const stat = yield call(getStat, ethereumService);

    yield put(getStatSuccess(stat));
    yield put(getCommunities());
  } catch (err) {
    yield put(getStatErr(err));
  }
}

export function* getCommunitiesWorker() {
  try {
    const ethereumService = yield select(selectEthereum);
    const stat = yield select(selectStat());
    const communities = yield call(
      getAllCommunities,
      ethereumService,
      stat.communitiesCount,
    );

    yield put(getCommunitiesSuccess(communities));
  } catch (err) {
    yield put(getCommunitiesErr(err));
  }
}

export function* getTagsWorker() {
  try {
    const tags = yield call(getTags);
    yield put(getTagsSuccess(tags));
  } catch (err) {
    yield put(getTagsErr(err));
  }
}

export function* getCommunityTagsWorker({ communityId }) {
  try {
    const tags = yield call(getCommunityTags, communityId);
    yield put(getTagsSuccess(tags));
  } catch (err) {
    yield put(getTagsErr(err));
  }
}

export function* getFaqWorker() {
  try {
    const prefix = 'faq';
    const faq = yield call(getMD, prefix);

    yield put(getFaqSuccess(faq));
  } catch (err) {
    yield put(getFaqErr(err));
  }
}

export function* getTutorialWorker() {
  try {
    const prefix = 'tutorial';
    const tutorial = yield call(getMD, prefix);

    yield put(getTutorialSuccess(tutorial));
  } catch (err) {
    yield put(getTutorialErr(err));
  }
}

/* eslint consistent-return: 0 */
export function* getUserProfileWorker({
  user,
  getFullProfile,
  communityIdForRating,
}) {
  try {
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield call(ethereumService.getSelectedAccount);
    const isLogin = selectedAccount === user;
    const cachedUserInfo = yield select(selectUsers(user));

    // take userProfile from STORE
    if (cachedUserInfo && !getFullProfile && !isLogin) {
      if (!cachedUserInfo.achievements) {
        const userAchievements = yield call(
          getAchievements,
          ethereumService,
          USER_ACHIEVEMENTS_TABLE,
          user,
        );
        const userStats = yield getUserStats(user);

        const updatedUserInfo = {
          ...cachedUserInfo,
          achievements: userAchievements,
        };
        yield put(getUserProfileSuccess({ ...updatedUserInfo, ...userStats }));
        return updatedUserInfo;
      }
      return yield cachedUserInfo;
    }

    // get userProfile and put to STORE
    const updatedUserInfo = yield call(
      getProfileInfo,
      user,
      ethereumService,
      getFullProfile,
      isLogin,
      communityIdForRating,
    );

    if (
      (updatedUserInfo && !cachedUserInfo) ||
      (updatedUserInfo &&
        cachedUserInfo &&
        getHash(updatedUserInfo) !== getHash(cachedUserInfo))
    ) {
      yield put(getUserProfileSuccess({ ...updatedUserInfo }));
    }

    yield put(getUserProfileSuccess());

    return yield { ...updatedUserInfo };
  } catch (err) {
    yield put(getUserProfileErr(err));
  }
}

export default function* () {
  yield takeLatest(GET_COMMUNITIES, getCommunitiesWorker);
  yield takeLatest(GET_TAGS, getTagsWorker);
  yield takeLatest(GET_COMMUNITY_TAGS, getCommunityTagsWorker);
  yield takeEvery(GET_USER_PROFILE, getUserProfileWorker);
  yield takeLatest(GET_STAT, getStatWorker);
  yield takeLatest(GET_FAQ, getFaqWorker);
  yield takeLatest(GET_TUTORIAL, getTutorialWorker);
  yield takeLatest(
    [LOGOUT_SUCCESS, LOGIN_WITH_WALLET, SAVE_PROFILE_SUCCESS],
    updateStoredQuestionsWorker,
  );
}
