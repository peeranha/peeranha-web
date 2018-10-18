import { call, put, takeEvery, select } from 'redux-saga/effects';

import { getProfileInfo, getCitiesList } from 'utils/profileManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  getProfileInfoSuccess,
  getProfileInfoError,
  getCitiesListSuccess,
  getCitiesListError,
} from './actions';

import { GET_PROFILE_INFORMATION, GET_LOCATION_LIST } from './constants';

export function* getProfileInfoWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const profile = yield call(() => getProfileInfo(res.userKey, eosService));

    yield put(getProfileInfoSuccess(profile));
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
  yield takeEvery(GET_PROFILE_INFORMATION, getProfileInfoWorker);
  yield takeEvery(GET_LOCATION_LIST, getCitiesListWorker);
}
