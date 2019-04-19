/*
 *
 * SuggestedCommunities reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
  CLEAR_SUGGESTED_COMMUNITIES,
} from './constants';

export const initialState = fromJS({
  suggestedCommunities: [],
  getSuggestedCommunitiesError: null,
  getSuggestedCommunitiesLoading: false,
  limit: 10,
  isLastFetch: false,
});

function communitiesReducer(state = initialState, action) {
  const { type, getSuggestedCommunitiesError, suggestedCommunities } = action;

  switch (type) {
    case GET_SUGGESTED_COMMUNITIES:
      return state.set('getSuggestedCommunitiesLoading', true);
    case GET_SUGGESTED_COMMUNITIES_SUCCESS:
      return state
        .set('getSuggestedCommunitiesLoading', false)
        .set(
          'suggestedCommunities',
          state.toJS().suggestedCommunities.concat(suggestedCommunities),
        )
        .set(
          'isLastFetch',
          suggestedCommunities.length < initialState.get('limit'),
        );
    case GET_SUGGESTED_COMMUNITIES_ERROR:
      return state
        .set('getSuggestedCommunitiesLoading', false)
        .set('getSuggestedCommunitiesError', getSuggestedCommunitiesError);

    case CLEAR_SUGGESTED_COMMUNITIES:
      return state.set(
        'suggestedCommunities',
        initialState.get('suggestedCommunities'),
      );

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}

export default communitiesReducer;
