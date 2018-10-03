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

export function uploadImageFile(file) {
  return {
    type: UPLOAD_IMAGE_FILE,
    file,
  };
}

export function uploadImageFileSuccess(imageSrc) {
  return {
    type: UPLOAD_IMAGE_FILE_SUCCESS,
    imageSrc,
  };
}

export function uploadImageFileError(errorUploadImage) {
  return {
    type: UPLOAD_IMAGE_FILE_ERROR,
    errorUploadImage,
  };
}
