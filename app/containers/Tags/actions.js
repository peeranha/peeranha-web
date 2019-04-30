/*
 *
 * SuggestedTags actions
 *
 */

import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
  GET_EXISTING_TAGS,
  GET_EXISTING_TAGS_SUCCESS,
  GET_EXISTING_TAGS_ERROR,
} from './constants';

export function getSuggestedTags({ communityId, loadMore, sorting }) {
  return {
    type: GET_SUGGESTED_TAGS,
    communityId,
    sorting,
    loadMore,
  };
}

export function getSuggestedTagsSuccess(suggestedTags, loadMore) {
  return {
    type: GET_SUGGESTED_TAGS_SUCCESS,
    suggestedTags,
    loadMore,
  };
}

export function getSuggestedTagsErr(getSuggestedTagsError) {
  return {
    type: GET_SUGGESTED_TAGS_ERROR,
    getSuggestedTagsError,
  };
}

export function getExistingTags({ communityId, loadMore, sorting, text }) {
  return {
    type: GET_EXISTING_TAGS,
    communityId,
    sorting,
    loadMore,
    text,
  };
}

export function getExistingTagsSuccess(existingTags, loadMore) {
  return {
    type: GET_EXISTING_TAGS_SUCCESS,
    existingTags,
    loadMore,
  };
}

export function getExistingTagsErr(getExistingTagsError) {
  return {
    type: GET_EXISTING_TAGS_ERROR,
    getExistingTagsError,
  };
}
