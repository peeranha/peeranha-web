/*
 *
 * CreateTag reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
  GET_FORM_PROCESSING,
  GET_FORM_SUCCESS,
  GET_FORM_ERROR,
} from './constants';

export const initialState = fromJS({
  suggestTagLoading: false,
  suggestTagError: null,
  isFormLoading: true,
  getFormError: null,
  isFormAvailable: null,
});

function createTagReducer(state = initialState, action) {
  const {
    type,
    suggestTagError,
    getFormError,
    isFormAvailable,
  } = action;

  switch (type) {
    case SUGGEST_TAG:
      return state.set('suggestTagLoading', true);
    case SUGGEST_TAG_SUCCESS:
      return state.set('suggestTagLoading', false);
    case SUGGEST_TAG_ERROR:
      return state
        .set('suggestTagLoading', false)
        .set('suggestTagError', suggestTagError);

    case GET_FORM_PROCESSING:
      return state.set('isFormLoading', true);
    case GET_FORM_SUCCESS:
      return state
        .set('isFormLoading', false)
        .set('isFormAvailable', isFormAvailable);
    case GET_FORM_ERROR:
      return state
        .set('isFormLoading', false)
        .set('getFormError', getFormError);

    default:
      return state;
  }
}

export default createTagReducer;
