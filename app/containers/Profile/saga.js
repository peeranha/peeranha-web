import { call, put, takeEvery, select } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import { getProfileInfoSuccess, getProfileInfoError } from './actions';

import { GET_PROFILE_INFORMATION } from './constants';

export function* getProfileInfoWorker({ userKey }) {
  try {
    const eosService = yield select(selectEos);
    const profile = yield call(() => getProfileInfo(userKey, eosService));

    yield put(getProfileInfoSuccess(profile));
  } catch (err) {
    yield put(getProfileInfoError(err.message));
  }
}

export default function*() {
  yield takeEvery(GET_PROFILE_INFORMATION, getProfileInfoWorker);
}
