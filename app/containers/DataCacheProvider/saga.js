import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';
import { getMD } from 'utils/mdManagement';
import { setCookie } from 'utils/cookie';
import { getAchievements } from 'utils/achievementsManagement';
import { USER_ACHIEVEMENTS_TABLE } from 'utils/constants';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { LOGOUT_SUCCESS } from 'containers/Logout/constants';
import { SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import {
  FINISH_REGISTRATION_SUCCESS,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_WALLET,
  PROFILE_INFO_LS,
} from 'containers/Login/constants';

import { SIGNUP_WITH_WALLET_SUCCESS } from 'containers/SignUp/constants';

import { selectStat, selectUsers } from './selectors';

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
} from './actions';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_FAQ,
  GET_STAT,
  GET_TUTORIAL,
  GET_USER_PROFILE,
} from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';

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
    const eosService = yield select(selectEos);
    const stat = yield select(selectStat());
    const communities = yield call(
      getAllCommunities,
      eosService,
      stat.communities_count,
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
export function* getUserProfileWorker({ user, getFullProfile, isLogin }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const cachedUserInfo = yield select(selectUsers(user));

    // take userProfile from STORE
    if (cachedUserInfo && !getFullProfile) {
      if (!cachedUserInfo.achievementsReached) {
        const userAchievements = yield call(
          getAchievements,
          ethereumService,
          USER_ACHIEVEMENTS_TABLE,
          user,
        );

        const updatedUserInfo = {
          ...cachedUserInfo,
          achievementsReached: userAchievements,
        };
        setCookie({
          name: PROFILE_INFO_LS,
          value: JSON.stringify(updatedUserInfo),
          options: {
            defaultPath: true,
            allowSubdomains: true,
          },
        });
        yield put(getUserProfileSuccess(updatedUserInfo));
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

    if (!updatedUserInfo.achievementsReached) {
      const userAchievements = yield call(
        getAchievements,
        ethereumService,
        USER_ACHIEVEMENTS_TABLE,
        user,
      );
      updatedUserInfo.achievementsReached = userAchievements;
    }

    if (
      (updatedUserInfo && !cachedUserInfo) ||
      (updatedUserInfo &&
        cachedUserInfo &&
        getHash(updatedUserInfo) !== getHash(cachedUserInfo))
    ) {
      setCookie({
        name: PROFILE_INFO_LS,
        value: JSON.stringify(updatedUserInfo),
        options: {
          defaultPath: true,
          allowSubdomains: true,
        },
      });
      yield put(getUserProfileSuccess(updatedUserInfo));
    }

    yield put(getUserProfileSuccess());

    return yield updatedUserInfo;
  } catch (err) {
    yield put(getUserProfileErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_COMMUNITIES_WITH_TAGS, getCommunitiesWithTagsWorker);
  yield takeEvery(GET_USER_PROFILE, getUserProfileWorker);
  yield takeLatest(
    [GET_STAT, FINISH_REGISTRATION_SUCCESS, SIGNUP_WITH_WALLET_SUCCESS],
    getStatWorker,
  );
  yield takeLatest(GET_FAQ, getFaqWorker);
  yield takeLatest(GET_TUTORIAL, getTutorialWorker);
  yield takeLatest(
    [LOGOUT_SUCCESS, LOGIN_WITH_WALLET, LOGIN_WITH_EMAIL, SAVE_PROFILE_SUCCESS],
    updateStoredQuestionsWorker,
  );
}
