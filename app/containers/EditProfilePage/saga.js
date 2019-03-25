import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { uploadImg, saveProfile } from 'utils/profileManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';

import {
  uploadImageFileSuccess,
  uploadImageFileError,
  saveProfileActionSuccess,
  saveProfileActionError,
} from './actions';

import { UPLOAD_IMAGE_FILE, SAVE_PROFILE_ACTION } from './constants';

export function* uploadImageFileWorker({ file }) {
  try {
    const img = yield call(() => uploadImg(file));
    yield put(uploadImageFileSuccess(img && img.imgUrl));
  } catch (err) {
    yield put(uploadImageFileError(err.message));
  }
}

export function* saveProfileActionWorker({ obj }) {
  try {
    const { reader, profile, userKey } = obj;
    const eosService = yield select(selectEos);

    const img = reader ? yield call(() => uploadImg(reader)) : undefined;
    profile.ipfs_avatar = yield (img && img.imgHash) || profile.ipfs_avatar;

    yield call(() => saveProfile(userKey, profile, eosService));

    // remove user from cache to update him after
    yield put(removeUserProfile(userKey));
    yield call(() => getUserProfileWorker({ user: userKey }));

    yield put(saveProfileActionSuccess());

    yield call(() => createdHistory.push(routes.profileView(userKey)));
  } catch (err) {
    yield put(saveProfileActionError(err.message));
  }
}

export default function*() {
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
  yield takeLatest(SAVE_PROFILE_ACTION, saveProfileActionWorker);
}
