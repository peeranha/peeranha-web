/*
 *
 * Profile actions
 *
 */

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  EDIT_IMAGE_STATUS,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  SAVE_PROFILE_ACTION,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
  CHOICE_CITY_ACTION,
} from './constants';

/*
 *
 * getProfileInformation actions
 *
 */

export function getProfileInformation(userKey) {
  return {
    type: GET_PROFILE_INFORMATION,
    userKey,
  };
}

export function getProfileInformationSuccess(profile) {
  return {
    type: GET_PROFILE_INFORMATION_SUCCESS,
    profile,
  };
}

export function getProfileInformationError(errorProfile) {
  return {
    type: GET_PROFILE_INFORMATION_ERROR,
    errorProfile,
  };
}

/*
 *
 * uploadImageFile actions
 *
 */

export function uploadImageFileAction(file) {
  return {
    type: UPLOAD_IMAGE_FILE,
    file,
  };
}

export function uploadImageFileSuccess(cashedProfileImg) {
  return {
    type: UPLOAD_IMAGE_FILE_SUCCESS,
    cashedProfileImg,
  };
}

export function uploadImageFileError(errorUploadImage) {
  return {
    type: UPLOAD_IMAGE_FILE_ERROR,
    errorUploadImage,
  };
}

/*
 *
 * editing actions
 *
 */

export function editImage() {
  return {
    type: EDIT_IMAGE_STATUS,
  };
}

export function clearImageChanges() {
  return {
    type: CANCEL_IMAGE_CHANGES,
  };
}

export function saveImageChanges(obj) {
  return {
    type: SAVE_IMAGE_CHANGES,
    cashedProfileImg: obj.cashedProfileImg,
    blob: obj.blob,
  };
}

/*
 *
 * saveProfile actions
 *
 */

export function saveProfileAction(obj) {
  return {
    type: SAVE_PROFILE_ACTION,
    obj,
  };
}

export function saveProfileActionSuccess() {
  return {
    type: SAVE_PROFILE_ACTION_SUCCESS,
  };
}

export function saveProfileActionError(errorSaveProfile) {
  return {
    type: SAVE_PROFILE_ACTION_ERROR,
    errorSaveProfile,
  };
}

/*
 *
 * getLocationList actions
 *
 */

export function getLocationListAction(locationSearch) {
  return {
    type: GET_LOCATION_LIST,
    locationSearch,
  };
}

export function getLocationListActionSuccess(locationList) {
  return {
    type: GET_LOCATION_LIST_SUCCESS,
    locationList,
  };
}

export function getLocationListActionError(errorLocationList) {
  return {
    type: GET_LOCATION_LIST_ERROR,
    errorLocationList,
  };
}

export function cityChoiceAction(cityId, city) {
  return {
    type: CHOICE_CITY_ACTION,
    cityId,
    city,
  };
}
