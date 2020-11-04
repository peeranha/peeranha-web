/*
 *
 * EditCommunity reducer
 *
 */

import { fromJS } from 'immutable';

import {
  EDIT_COMMUNITY,
  EDIT_COMMUNITY_ERROR,
  EDIT_COMMUNITY_SUCCESS,
  GET_COMMUNITY,
  GET_COMMUNITY_ERROR,
  GET_COMMUNITY_SUCCESS,
} from './constants';

export const initialState = fromJS({
  community: null,
  editCommunityError: null,
  editCommunityLoading: false,
  getCommunityError: null,
  getCommunityLoading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMUNITY:
      return state.set('getCommunityLoading', true);
    case GET_COMMUNITY_SUCCESS:
      return state
        .set('community', action.community)
        .set('getCommunityLoading', false);
    case GET_COMMUNITY_ERROR:
      return state
        .set('getCommunityError', action.error)
        .set('getCommunityLoading', false);
    case EDIT_COMMUNITY:
      return state.set('editCommunityLoading', true);
    case EDIT_COMMUNITY_SUCCESS:
      return state.set('editCommunityLoading', false);
    case EDIT_COMMUNITY_ERROR:
      return state
        .set('editCommunityError', action.error)
        .set('editCommunityLoading', false);
    default:
      return state;
  }
};
