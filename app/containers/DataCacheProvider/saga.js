import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';
import { getMD } from 'utils/mdManagement';
import { getAchievements } from 'utils/achievementsManagement';
import { USER_ACHIEVEMENTS_TABLE } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { LOGOUT_SUCCESS } from 'containers/Logout/constants';
import { SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_WALLET,
} from 'containers/Login/constants';

import {
  selectStat,
  selectUsers,
} from 'containers/DataCacheProvider/selectors';

import {
  getCommunitiesWithTags,
  getCommunitiesWithTagsErr,
  getCommunitiesWithTagsSuccess,
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
  GET_COMMUNITIES_WITH_TAGS,
  GET_FAQ,
  GET_STAT,
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
    yield put(getCommunitiesWithTags());
  } catch (err) {
    yield put(getStatErr(err));
  }
}

export function* getCommunitiesWithTagsWorker() {
  try {
    const ethereumService = yield select(selectEthereum);
    const stat = yield select(selectStat());
    const communities = yield call(
      getAllCommunities,
      ethereumService,
      stat.communitiesCount,
    );

    yield put(getCommunitiesWithTagsSuccess(communities));
  } catch (err) {
    yield put(getCommunitiesWithTagsErr(err));
  }
}

export function* getFaqWorker() {
  try {
    const prefix = 'faq';
    const locale = yield select(makeSelectLocale());
    const faq = yield call(getMD, prefix, locale);

    yield put(getFaqSuccess(faq));
  } catch (err) {
    yield put(getFaqErr(err));
  }
}

export function* getTutorialWorker() {
  try {
    const prefix = 'tutorial';
    const locale = yield select(makeSelectLocale());
    const tutorial = yield call(getMD, prefix, locale);

    yield put(getTutorialSuccess(tutorial));
  } catch (err) {
    yield put(getTutorialErr(err));
  }
}

/* eslint consistent-return: 0 */
export function* getUserProfileWorker({ user, getFullProfile }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield call(ethereumService.getSelectedAccount);
    const isLogin = selectedAccount === user;
    const cachedUserInfo = yield select(selectUsers(user));
    const userStats = yield getUserStats(user);

    // take userProfile from STORE
    if (cachedUserInfo && !getFullProfile && !isLogin) {
      if (!cachedUserInfo.achievements) {
        const userAchievements = yield call(
          getAchievements,
          ethereumService,
          USER_ACHIEVEMENTS_TABLE,
          user,
        );

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
    );

    if (
      (updatedUserInfo && !cachedUserInfo) ||
      (updatedUserInfo &&
        cachedUserInfo &&
        getHash(updatedUserInfo) !== getHash(cachedUserInfo))
    ) {
      yield put(getUserProfileSuccess({ ...updatedUserInfo, ...userStats }));
    }

    yield put(getUserProfileSuccess());

    return yield { ...updatedUserInfo, ...userStats };
  } catch (err) {
    yield put(getUserProfileErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_COMMUNITIES_WITH_TAGS, getCommunitiesWithTagsWorker);
  yield takeEvery(GET_USER_PROFILE, getUserProfileWorker);
  yield takeLatest(GET_STAT, getStatWorker);
  yield takeLatest(GET_FAQ, getFaqWorker);
  yield takeLatest(GET_TUTORIAL, getTutorialWorker);
  yield takeLatest(
    [LOGOUT_SUCCESS, LOGIN_WITH_WALLET, LOGIN_WITH_EMAIL, SAVE_PROFILE_SUCCESS],
    updateStoredQuestionsWorker,
  );
}
