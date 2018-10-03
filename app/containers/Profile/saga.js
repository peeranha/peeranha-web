import { call, put, takeLatest } from 'redux-saga/effects';

import {
  uploadImageFile,
  getImageFile,
  getProfileInformation,
} from 'utils/profileManagement';

import {
  getProfileInformationSuccess,
  getProfileInformationError,
  uploadImageFileSuccess,
  uploadImageFileError,
} from './actions';

import { GET_PROFILE_INFORMATION, UPLOAD_IMAGE_FILE } from './constants';

export function* getProfileInformationWorker(res) {
  try {
    const profile = yield call(() => getProfileInformation(res.userKey));
    yield put(getProfileInformationSuccess(profile));
  } catch (err) {
    yield put(getProfileInformationError(err.message));
  }
}

export function* uploadImageFileWorker(res) {
  try {
    const savedText = yield call(() => uploadImageFile(res.file));
    const image = yield call(() => getImageFile(savedText));
    yield put(uploadImageFileSuccess(image));
  } catch (err) {
    yield put(uploadImageFileError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_PROFILE_INFORMATION, getProfileInformationWorker);
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
}
