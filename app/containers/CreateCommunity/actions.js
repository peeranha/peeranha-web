/*
 *
 * EditProfilePage actions
 *
 */

import {
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  SET_DEFAULT_STORE,
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

export function uploadImageFileSuccess(cachedProfileImg, cachedImgHash) {
  return {
    type: UPLOAD_IMAGE_FILE_SUCCESS,
    cachedProfileImg,
    cachedImgHash,
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

export function clearImageChanges() {
  return {
    type: CANCEL_IMAGE_CHANGES,
  };
}

export function saveImageChanges({ cachedProfileImg, blob }) {
  return {
    type: SAVE_IMAGE_CHANGES,
    cachedProfileImg,
    blob,
  };
}

/*
 *
 * createCommunity actions
 *
 */

export function createCommunity(community, reset) {
  return {
    type: CREATE_COMMUNITY,
    community,
    reset,
  };
}

export function createCommunitySuccess() {
  return {
    type: CREATE_COMMUNITY_SUCCESS,
  };
}

export function createCommunityErr(createCommunityError) {
  return {
    type: CREATE_COMMUNITY_ERROR,
    createCommunityError,
  };
}

export function setDefaultStore() {
  return {
    type: SET_DEFAULT_STORE,
  };
}
