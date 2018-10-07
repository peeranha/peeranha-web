import { call, put, takeLatest } from 'redux-saga/effects';

import {
  uploadImageFile,
  getImageFile,
  getProfileInfo,
  saveProfile,
  getCitiesList,
} from 'utils/profileManagement';

import {
  getProfileInfoSuccess,
  getProfileInfoError,
  uploadImageFileSuccess,
  uploadImageFileError,
  saveProfileActionSuccess,
  saveProfileActionError,
  getCitiesListSuccess,
  getCitiesListError,
} from './actions';

import {
  GET_PROFILE_INFORMATION,
  UPLOAD_IMAGE_FILE,
  SAVE_PROFILE_ACTION,
  GET_LOCATION_LIST,
} from './constants';

export function* getProfileInfoWorker(res) {
  try {
    const profile = yield call(() => getProfileInfo(res.userKey));
    yield put(getProfileInfoSuccess(profile));
  } catch (err) {
    yield put(getProfileInfoError(err.message));
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

export function* getCitiesListWorker(str) {
  try {
    const citiesList = yield call(() => getCitiesList(str.locationSearch));
    yield put(getCitiesListSuccess(citiesList));
  } catch (err) {
    yield put(getCitiesListError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_PROFILE_INFORMATION, getProfileInfoWorker);
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
  yield takeLatest(SAVE_PROFILE_ACTION, saveProfileActionWorker);
  yield takeLatest(GET_LOCATION_LIST, getCitiesListWorker);
}
