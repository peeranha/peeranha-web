import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';

import { selectUsers } from './selectors';

import {
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
  getUserProfileSuccess,
  getUserProfileErr,
  getStatSuccess,
  getStatErr,
} from './actions';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_USER_PROFILE,
  GET_STAT,
} from './constants';

export function* getStatWorker() {
  try {
    const eosService = yield select(selectEos);
    const stat = yield call(() => getStat(eosService));

    yield put(getStatSuccess(stat));
  } catch (err) {
    yield put(getStatErr(err.message));
  }
}

export function* getCommunitiesWithTagsWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(() => getAllCommunities(eosService));

    yield put(getCommunitiesWithTagsSuccess(communities));
  } catch (err) {
    yield put(getCommunitiesWithTagsErr(err.message));
  }
}

/* eslint consistent-return: 0 */
export function* getUserProfileWorker({ user, getFullProfile }) {
  try {
    const eosService = yield select(selectEos);
    const users = yield select(selectUsers());

    // take userProfile from STORE
    if (users[user] && !getFullProfile) {
      return yield users[user];
    }

    // get userProfile and put to STORE
    const userInfo = yield call(() =>
      getProfileInfo(user, eosService, getFullProfile),
    );

    yield put(getUserProfileSuccess(userInfo));

    return yield userInfo;
  } catch (err) {
    yield put(getUserProfileErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_COMMUNITIES_WITH_TAGS, getCommunitiesWithTagsWorker);
  yield takeLatest(GET_USER_PROFILE, getUserProfileWorker);
  yield takeLatest(GET_STAT, getStatWorker);
}
