/*
 *
 * Edit tag actions
 *
 */

import {
  GET_EDIT_TAG_FORM,
  GET_EDIT_TAG_FORM_SUCCESS,
  GET_EDIT_TAG_FORM_ERROR,
  RESET_EDIT_TAG_REDUCER,
  EDIT_TAG,
  EDIT_TAG_SUCCESS,
  EDIT_TAG_ERROR,
} from './constants';

export const getEditTagForm = (communityId) => ({
  type: GET_EDIT_TAG_FORM,
  communityId,
});

export const getEditTagFormSuccess = () => ({
  type: GET_EDIT_TAG_FORM_SUCCESS,
});

export function getEditTagFormErr(getEditTagFormError) {
  return {
    type: GET_EDIT_TAG_FORM_ERROR,
    getEditTagFormError,
  };
}

export const resetEditTagReducer = () => ({ type: RESET_EDIT_TAG_REDUCER });

export const editTag = (tag, reset) => ({ type: EDIT_TAG, tag, reset });

export const editTagSuccess = () => ({ type: EDIT_TAG_SUCCESS });

export const editTagErr = (editTagError) => ({
  type: EDIT_TAG_ERROR,
  editTagError,
});
