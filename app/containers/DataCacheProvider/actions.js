/*
 *
 * DataCacheProvider actions
 *
 */

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
} from './constants';

export function getCommunitiesWithTags() {
  return {
    type: GET_COMMUNITIES_WITH_TAGS,
  };
}

export function getCommunitiesWithTagsSuccess(communities) {
  return {
    type: GET_COMMUNITIES_WITH_TAGS_SUCCESS,
    communities,
  };
}

export function getCommunitiesWithTagsErr(getCommunitiesWithTagsError) {
  return {
    type: GET_COMMUNITIES_WITH_TAGS_ERROR,
    getCommunitiesWithTagsError,
  };
}
