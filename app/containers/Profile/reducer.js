/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
} from './constants';

export const initialState = fromJS({
  loadingProfile: false,
  loadingImage: false,
  errorProfile: '',
  errorUploadImage: '',
  profile: {},
  userKey: '',
  imageSrc: '',
});

function profileReducer(state = initialState, action) {
  const {
    type,
    profile,
    errorProfile,
    userKey,
    imageSrc,
    errorUploadImage,
  } = action;

  switch (type) {
    case GET_PROFILE_INFORMATION:
      return state.set('loadingProfile', true).set('userKey', userKey);
    case GET_PROFILE_INFORMATION_SUCCESS:
      return state.set('loadingProfile', false).set('profile', profile);
    case GET_PROFILE_INFORMATION_ERROR:
      return state
        .set('loadingProfile', false)
        .set('errorProfile', errorProfile);
    case UPLOAD_IMAGE_FILE:
      return state.set('loadingImage', true);
    case UPLOAD_IMAGE_FILE_SUCCESS:
      return state.set('loadingImage', false).set('imageSrc', imageSrc);
    case UPLOAD_IMAGE_FILE_ERROR:
      return state
        .set('loadingImage', false)
        .set('errorUploadImage', errorUploadImage);
    default:
      return state;
  }
}

export default profileReducer;
