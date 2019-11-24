/*
 *
 * SuggestedCommunities actions
 *
 */

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
} from './constants';

export function getSuggestedCommunities() {
  return {
    type: GET_SUGGESTED_COMMUNITIES,
  };
}

export function getSuggestedCommunitiesSuccess(suggestedCommunities, init) {
  return {
    type: GET_SUGGESTED_COMMUNITIES_SUCCESS,
    suggestedCommunities,
    init,
  };
}

export function getSuggestedCommunitiesErr(getSuggestedCommunitiesError) {
  return {
    type: GET_SUGGESTED_COMMUNITIES_ERROR,
    getSuggestedCommunitiesError,
  };
}
