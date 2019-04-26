/*
 *
 * SuggestedTags actions
 *
 */

import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
} from './constants';

export function getSuggestedTags(communityId) {
  return {
    type: GET_SUGGESTED_TAGS,
    communityId,
  };
}

export function getSuggestedTagsSuccess(tags) {
  return {
    type: GET_SUGGESTED_TAGS_SUCCESS,
    tags,
  };
}

export function getSuggestedTagsErr(getSuggestedTagsError) {
  return {
    type: GET_SUGGESTED_TAGS_ERROR,
    getSuggestedTagsError,
  };
}
