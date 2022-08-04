import {
  GET_EXISTING_TAGS,
  GET_EXISTING_TAGS_SUCCESS,
  GET_EXISTING_TAGS_ERROR,
} from './constants';

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
