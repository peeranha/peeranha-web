/*
 *
 * Edit tag reducer
 *
 */

import { fromJS } from 'immutable';
import {
  EDIT_TAG,
  EDIT_TAG_ERROR,
  EDIT_TAG_SUCCESS,
  GET_EDIT_TAG_FORM_ERROR,
  GET_EDIT_TAG_FORM_SUCCESS,
  RESET_EDIT_TAG_REDUCER,
} from './constants';

export const initialState = fromJS({
  editTagFormLoading: true,
  editTagProcessing: false,
  getEditTagFormError: null,
  editTagError: null,
});

const editTagReducer = (state = initialState, action) => {
  const { type, getEditTagFormError, editTagError } = action;

  switch (type) {
    case GET_EDIT_TAG_FORM_SUCCESS:
      return state.set('editTagFormLoading', false);

    case GET_EDIT_TAG_FORM_ERROR:
      return state
        .set('editTagFormLoading', true)
        .set('getEditTagFormError', getEditTagFormError);

    case RESET_EDIT_TAG_REDUCER:
      return initialState;

    case EDIT_TAG:
      return state.set('editTagProcessing', true);

    case EDIT_TAG_SUCCESS:
      return state.set('editTagProcessing', false);

    case EDIT_TAG_ERROR:
      return state
        .set('editTagError', editTagError)
        .set('editTagProcessing', false);

    default:
      return state;
  }
};

export default editTagReducer;
