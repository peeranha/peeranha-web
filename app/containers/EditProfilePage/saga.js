import { call, put, takeLatest, select } from 'redux-saga/effects';

import { uploadImg, saveProfile } from 'utils/profileManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  uploadImageFileSuccess,
  uploadImageFileError,
  saveProfileActionSuccess,
  saveProfileActionError,
} from './actions';

import { UPLOAD_IMAGE_FILE, SAVE_PROFILE_ACTION } from './constants';

export function* uploadImageFileWorker(res) {
  try {
    const img = yield call(() => uploadImg(res.file));
    yield put(uploadImageFileSuccess(img && img.imgUrl));
  } catch (err) {
    yield put(uploadImageFileError(err.message));
  }
}

export function* saveProfileActionWorker(res) {
  try {
    const { reader, profile, userKey } = res.obj;
    const eosService = yield select(selectEos);

    const img = reader ? yield call(() => uploadImg(reader)) : undefined;
    profile.ipfs.savedProfileImg = yield img ? img.imgHash : undefined;

    yield call(() => saveProfile(userKey, profile.ipfs, eosService));
    yield put(saveProfileActionSuccess());
  } catch (err) {
    yield put(saveProfileActionError(err.message));
  }
}

export default function*() {
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
  yield takeLatest(SAVE_PROFILE_ACTION, saveProfileActionWorker);
}
