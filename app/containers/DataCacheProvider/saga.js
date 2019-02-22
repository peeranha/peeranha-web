import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';

import { selectUsers } from './selectors';

import {
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
  getUserProfileSuccess,
  getUserProfileErr,
} from './actions';

import { GET_COMMUNITIES_WITH_TAGS, GET_USER_PROFILE } from './constants';

export function* getCommunitiesWithTagsWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(() => getAllCommunities(eosService));

    yield put(getCommunitiesWithTagsSuccess(communities));
  } catch (err) {
    yield put(getCommunitiesWithTagsErr(err));
  }
}

/* eslint consistent-return: 0 */
export function* getUserProfileWorker({ user }) {
  try {
    const eosService = yield select(selectEos);
    const users = yield select(selectUsers());

    // take userProfile from STORE
    if (users[user]) {
      return yield users[user];
    }

    // get userProfile and put to STORE
    const userInfo = yield call(() => getProfileInfo(user, eosService));

    yield put(getUserProfileSuccess(userInfo));

    return yield userInfo;
  } catch (err) {
    yield put(getUserProfileErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_COMMUNITIES_WITH_TAGS, getCommunitiesWithTagsWorker);
  yield takeLatest(GET_USER_PROFILE, getUserProfileWorker);
}
