import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { AVATAR_FIELD } from 'containers/Profile/constants';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { saveProfileSuccess, saveProfileErr } from './actions';

import {
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_ERROR,
} from './constants';

/* eslint no-param-reassign: 0 */
export function* saveProfileWorker({ profile, userKey }) {
  try {
    const eosService = yield select(selectEos);

    // check that it is not hash
    if (profile[AVATAR_FIELD] && profile[AVATAR_FIELD].length > 1000) {
      const { imgHash } = yield call(() => uploadImg(profile[AVATAR_FIELD]));
      profile[AVATAR_FIELD] = imgHash;
    }

    yield call(() =>
      saveProfile(eosService, userKey, profile[AVATAR_FIELD], profile),
    );

    yield put(saveProfileSuccess());

    yield call(() => createdHistory.push(routes.profileView(userKey)));
  } catch ({ message }) {
    yield put(saveProfileErr(message));
  }
}

export default function*() {
  yield takeLatest(SAVE_PROFILE, saveProfileWorker);
  yield takeLatest(SAVE_PROFILE_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(SAVE_PROFILE_ERROR, errorToastHandlingWithDefaultText);
}
