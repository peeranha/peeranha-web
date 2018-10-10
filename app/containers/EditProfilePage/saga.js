import { call, put, takeLatest } from 'redux-saga/effects';

import { uploadFile, getFileIpfs, saveProfile } from 'utils/profileManagement';

import {
  uploadImageFileSuccess,
  uploadImageFileError,
  saveProfileActionSuccess,
  saveProfileActionError,
} from './actions';

import { UPLOAD_IMAGE_FILE, SAVE_PROFILE_ACTION } from './constants';

export function* uploadImageFileWorker(res) {
  try {
    const savedText = yield call(() => uploadFile(res.file));
    const image = yield call(() => getFileIpfs(savedText));
    yield put(uploadImageFileSuccess(image));
  } catch (err) {
    yield put(uploadImageFileError(err.message));
  }
}

export function* saveProfileActionWorker(res) {
  try {
    const { reader, profile, userKey } = res.obj;
    const savedProfileImg = reader
      ? yield call(() => uploadFile(reader))
      : undefined;

    yield savedProfileImg
      ? (profile.ipfs.savedProfileImg = savedProfileImg)
      : undefined;

    yield call(() => saveProfile(userKey, profile.ipfs));
    yield put(saveProfileActionSuccess());
  } catch (err) {
    yield put(saveProfileActionError(err.message));
  }
}

export default function*() {
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
  yield takeLatest(SAVE_PROFILE_ACTION, saveProfileActionWorker);
}
