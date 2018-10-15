/*
 *
 * EditProfilePage actions
 *
 */

import {
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  EDIT_IMAGE_STATUS,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  SAVE_PROFILE_ACTION,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  SET_DEFAULT_REDUCER,
} from './constants';

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

export function uploadImageFileSuccess(cachedProfileImg) {
  return {
    type: UPLOAD_IMAGE_FILE_SUCCESS,
    cachedProfileImg,
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
    cachedProfileImg: obj.cachedProfileImg,
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

export function setDefaultReducer() {
  return {
    type: SET_DEFAULT_REDUCER,
  };
}
