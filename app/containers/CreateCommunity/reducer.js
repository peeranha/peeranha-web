/*
 *
 * CreateCommunity reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  isImageLoading: false,
  cachedImgHash: null,
  errorUploadImage: '',
  blob: '',
  cachedProfileImg: '',
  editingImgState: true,
  createCommunityLoading: false,
  createCommunityError: false,
});

function createCommunityReducer(state = initialState, action) {
  const {
    type,
    errorUploadImage,
    blob,
    cachedProfileImg,
    createCommunityError,
    cachedImgHash,
  } = action;

  switch (type) {
    case UPLOAD_IMAGE_FILE:
      return state.set('isImageLoading', true);
    case UPLOAD_IMAGE_FILE_SUCCESS:
      return state
        .set('isImageLoading', false)
        .set('editingImgState', false)
        .set('cachedProfileImg', cachedProfileImg)
        .set('cachedImgHash', cachedImgHash);
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

    case CREATE_COMMUNITY:
      return state.set('createCommunityLoading', true);
    case CREATE_COMMUNITY_SUCCESS:
      return state.set('createCommunityLoading', false);
    case CREATE_COMMUNITY_ERROR:
      return state
        .set('createCommunityLoading', false)
        .set('createCommunityError', createCommunityError);

    case SET_DEFAULT_STORE:
      return initialState;

    default:
      return state;
  }
}

export default createCommunityReducer;
