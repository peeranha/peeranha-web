import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo, updateUserEnergy } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';
import { getFAQ } from 'utils/faqManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { LOGOUT_SUCCESS } from 'containers/Logout/constants';
import { SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_SCATTER,
} from 'containers/Login/constants';

import { selectUsers } from './selectors';

import {
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
  getUserProfileSuccess,
  getUserProfileErr,
  getStatSuccess,
  getStatErr,
  getFaqErr,
  getFaqSuccess,
  updateUserEnergySuccess,
  updateUserEnergyErr,
} from './actions';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_USER_PROFILE,
  GET_STAT,
  GET_FAQ,
  GET_USER_PROFILE_SUCCESS,
} from './constants';

export function* getStatWorker() {
  try {
    const eosService = yield select(selectEos);
    const stat = yield call(getStat, eosService);

    yield put(getStatSuccess(stat));
  } catch ({ message }) {
    yield put(getStatErr(message));
  }
}

export function* getCommunitiesWithTagsWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(getAllCommunities, eosService);

    yield put(getCommunitiesWithTagsSuccess(communities));
  } catch ({ message }) {
    yield put(getCommunitiesWithTagsErr(message));
  }
}

export function* getFaqWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const faq = yield call(getFAQ, locale);

    yield put(getFaqSuccess(faq));
  } catch ({ message }) {
    yield put(getFaqErr(message));
  }
}

/* eslint consistent-return: 0 */
export function* getUserProfileWorker({ user, getFullProfile }) {
  try {
    const eosService = yield select(selectEos);
    const cachedUserInfo = yield select(selectUsers(user));

    // take userProfile from STORE
    if (cachedUserInfo && !getFullProfile) {
      return yield cachedUserInfo;
    }

    // get userProfile and put to STORE
    const updatedUserInfo = yield call(
      getProfileInfo,
      user,
      eosService,
      getFullProfile,
    );

    if (
      (updatedUserInfo && !cachedUserInfo) ||
      (updatedUserInfo &&
        cachedUserInfo &&
        getHash(updatedUserInfo) !== getHash(cachedUserInfo))
    ) {
      yield put(getUserProfileSuccess(updatedUserInfo));
    }

    yield put(getUserProfileSuccess());

    return yield updatedUserInfo;
  } catch ({ message }) {
    yield put(getUserProfileErr(message));
  }
}

// TODO: test
export function* updateUserEnergyWorker({ profile }) {
  try {
    const account = yield select(makeSelectAccount());
    const profileInfoCopy = { ...profile };

    if (profile.user === account) {
      yield call(updateUserEnergy, profileInfoCopy);
      yield put(updateUserEnergySuccess(profileInfoCopy));
    }
  } catch ({ message }) {
    yield put(updateUserEnergyErr(message));
  }
}

export default function*() {
  yield takeLatest(GET_COMMUNITIES_WITH_TAGS, getCommunitiesWithTagsWorker);
  yield takeEvery(GET_USER_PROFILE, getUserProfileWorker);
  yield takeLatest(GET_STAT, getStatWorker);
  yield takeLatest(GET_FAQ, getFaqWorker);
  yield takeLatest(
    [
      LOGOUT_SUCCESS,
      LOGIN_WITH_SCATTER,
      LOGIN_WITH_EMAIL,
      SAVE_PROFILE_SUCCESS,
    ],
    updateStoredQuestionsWorker,
  );
  yield takeEvery(GET_USER_PROFILE_SUCCESS, updateUserEnergyWorker);
}
