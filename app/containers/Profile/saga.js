import { call, put, takeLatest } from 'redux-saga/effects';

import { getProfileInfo, getCitiesList } from 'utils/profileManagement';

import {
  getProfileInfoSuccess,
  getProfileInfoError,
  getCitiesListSuccess,
  getCitiesListError,
} from './actions';

import { GET_PROFILE_INFORMATION, GET_LOCATION_LIST } from './constants';

export function* getProfileInfoWorker(res) {
  try {
    const isOwner = res.account === res.userKey;
    const profile = yield call(() => getProfileInfo(res.userKey));
    yield put(getProfileInfoSuccess(profile, isOwner));
  } catch (err) {
    yield put(getProfileInfoError(err.message));
  }
}

export function* getCitiesListWorker(res) {
  try {
    const citiesList = yield call(() => getCitiesList(res.locationSearch));
    yield put(getCitiesListSuccess(citiesList));
  } catch (err) {
    yield put(getCitiesListError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_PROFILE_INFORMATION, getProfileInfoWorker);
  yield takeLatest(GET_LOCATION_LIST, getCitiesListWorker);
}
