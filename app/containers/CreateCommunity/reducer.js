/*
 *
 * CreateCommunity reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  SET_DEFAULT_STORE,
  GET_FORM_PROCESSING,
  GET_FORM_SUCCESS,
  GET_FORM_ERROR,
} from './constants';

export const initialState = fromJS({
  createCommunityLoading: false,
  createCommunityError: null,
  isFormLoading: true,
  getFormError: null,
  isFormAvailable: null,
});

function createCommunityReducer(state = initialState, action) {
  const {
    type,
    createCommunityError,
    getFormError,
    isFormAvailable,
  } = action;

  switch (type) {
    case CREATE_COMMUNITY:
      return state.set('createCommunityLoading', true);
    case CREATE_COMMUNITY_SUCCESS:
      return state
        .set('createCommunityLoading', false);
    case CREATE_COMMUNITY_ERROR:
      return state
        .set('createCommunityLoading', false)
        .set('createCommunityError', createCommunityError);

    case SET_DEFAULT_STORE:
      return initialState;

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

export default createCommunityReducer;
