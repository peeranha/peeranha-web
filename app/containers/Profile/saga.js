import { call, put, takeLatest } from 'redux-saga/effects';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { getProfileInfoSuccess, getProfileInfoError } from './actions';
import { GET_PROFILE_INFORMATION } from './constants';

export function* getProfileInfoWorker({ userKey }) {
  try {
    const profile = yield call(() => getUserProfileWorker({ user: userKey }));

    yield put(getProfileInfoSuccess(profile));
  } catch (err) {
    yield put(getProfileInfoError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_PROFILE_INFORMATION, getProfileInfoWorker);
}
