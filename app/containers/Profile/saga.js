import { call, put, takeLatest } from 'redux-saga/effects';

import {
  uploadImageFile,
  getImageFile,
  getProfileInformation,
  saveProfile,
  getLocationList,
} from 'utils/profileManagement';

import {
  getProfileInformationSuccess,
  getProfileInformationError,
  uploadImageFileSuccess,
  uploadImageFileError,
  saveProfileActionSuccess,
  saveProfileActionError,
  getLocationListActionSuccess,
  getLocationListActionError,
} from './actions';

import {
  GET_PROFILE_INFORMATION,
  UPLOAD_IMAGE_FILE,
  SAVE_PROFILE_ACTION,
  GET_LOCATION_LIST,
} from './constants';

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

export function* saveProfileActionWorker(res) {
  try {
    const { reader, profile, userKey } = res.obj;
    const savedProfileImg = reader
      ? yield call(() => uploadImageFile(reader))
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

export function* getLocationListWorker(str) {
  try {
    const locationList = yield call(() => getLocationList(str.locationSearch));
    yield put(getLocationListActionSuccess(locationList));
  } catch (err) {
    yield put(getLocationListActionError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_PROFILE_INFORMATION, getProfileInformationWorker);
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
  yield takeLatest(SAVE_PROFILE_ACTION, saveProfileActionWorker);
  yield takeLatest(GET_LOCATION_LIST, getLocationListWorker);
}
