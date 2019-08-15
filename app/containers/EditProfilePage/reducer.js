/*
 *
 * editProfileReducer reducer
 *
 */

import { fromJS } from 'immutable';

import {
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  SAVE_PROFILE_ACTION,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
} from './constants';

export const initialState = fromJS({
  isImageLoading: false,
  isProfileSaving: false,
  errorUploadImage: null,
  errorSaveProfile: null,
  blob: null,
  cachedProfileImg: null,
  editingImgState: true,
});

function editProfileReducer(state = initialState, action) {
  const {
    type,
    errorUploadImage,
    errorSaveProfile,
    blob,
    cachedProfileImg,
  } = action;

  switch (type) {
    case UPLOAD_IMAGE_FILE:
      return state.set('isImageLoading', true);
    case UPLOAD_IMAGE_FILE_SUCCESS:
      return state
        .set('isImageLoading', false)
        .set('editingImgState', false)
        .set('cachedProfileImg', cachedProfileImg);
    case UPLOAD_IMAGE_FILE_ERROR:
      return state
        .set('isImageLoading', false)
        .set('errorUploadImage', errorUploadImage);

    case CANCEL_IMAGE_CHANGES:
      return state.set('editingImgState', true).set('cachedProfileImg', '');
    case SAVE_IMAGE_CHANGES:
      return state
        .set('editingImgState', true)
        .set('cachedProfileImg', cachedProfileImg)
        .set('blob', blob);

    case SAVE_PROFILE_ACTION:
      return state.set('isProfileSaving', true);
    case SAVE_PROFILE_ACTION_SUCCESS:
      return state.set('isProfileSaving', false);
    case SAVE_PROFILE_ACTION_ERROR:
      return state
        .set('errorSaveProfile', errorSaveProfile)
        .set('isProfileSaving', false);

    default:
      return state;
  }
}

export default editProfileReducer;
