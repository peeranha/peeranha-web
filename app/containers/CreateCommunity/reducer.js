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
} from './constants';

export const initialState = fromJS({
  createCommunityLoading: false,
  createCommunityError: null,
});

function createCommunityReducer(state = initialState, action) {
  const { type, createCommunityError } = action;

  switch (type) {
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
