import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';
import { getMD } from 'utils/mdManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { LOGOUT_SUCCESS } from 'containers/Logout/constants';
import { SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_SCATTER,
  PROFILE_INFO_LS,
} from 'containers/Login/constants';

import { setCookie } from '../../utils/cookie';
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
} from './actions';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_USER_PROFILE,
  GET_STAT,
  GET_FAQ,
} from './constants';

export function* getStatWorker() {
  try {
    const eosService = yield select(selectEos);
    const stat = yield call(getStat, eosService);

    yield put(getStatSuccess(stat));
  } catch (err) {
    yield put(getStatErr(err));
  }
}

export function* getCommunitiesWithTagsWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(getAllCommunities, eosService);

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
}
