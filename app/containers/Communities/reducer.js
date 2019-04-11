/*
 *
 * SuggestedCommunities reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
} from './constants';

export const initialState = fromJS({
  suggestedCommunities: [],
  getSuggestedCommunitiesError: null,
  getSuggestedCommunitiesLoading: false,
});

function communitiesReducer(state = initialState, action) {
  const { type, getSuggestedCommunitiesError, suggestedCommunities } = action;

  switch (type) {
    case GET_SUGGESTED_COMMUNITIES:
      return state.set('getSuggestedCommunitiesLoading', true);
    case GET_SUGGESTED_COMMUNITIES_SUCCESS:
      return state
        .set('getSuggestedCommunitiesLoading', false)
        .set('suggestedCommunities', suggestedCommunities);
    case GET_SUGGESTED_COMMUNITIES_ERROR:
      return state
        .set('getSuggestedCommunitiesLoading', false)
        .set('getSuggestedCommunitiesError', getSuggestedCommunitiesError);

    default:
      return state;
  }
}

export default communitiesReducer;
