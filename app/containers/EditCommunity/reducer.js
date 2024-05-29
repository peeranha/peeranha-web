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
  FREEZE_COMMUNITY,
  FREEZE_COMMUNITY_ERROR,
  FREEZE_COMMUNITY_SUCCESS,
} from './constants';

export const initialState = fromJS({
  community: null,
  editCommunityError: null,
  editCommunityLoading: false,
  freezeCommunityError: null,
  freezeCommunityLoading: false,
  getCommunityError: null,
  getCommunityLoading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMUNITY:
      return state.set('getCommunityLoading', true);
    case GET_COMMUNITY_SUCCESS:
      return state.set('community', action.community).set('getCommunityLoading', false);
    case GET_COMMUNITY_ERROR:
      return state.set('getCommunityError', action.error).set('getCommunityLoading', false);
    case EDIT_COMMUNITY:
      return state.set('editCommunityLoading', true);
    case EDIT_COMMUNITY_SUCCESS:
      return state.set('editCommunityLoading', false);
    case EDIT_COMMUNITY_ERROR:
      return state.set('editCommunityError', action.error).set('editCommunityLoading', false);
    case FREEZE_COMMUNITY:
      return state.set('freezeCommunityLoading', true);
    case FREEZE_COMMUNITY_SUCCESS:
      return state.set('freezeCommunityLoading', false);
    case FREEZE_COMMUNITY_ERROR:
      return state.set('freezeCommunityError', action.error).set('freezeCommunityLoading', false);
    default:
      return state;
  }
};
