/*
 *
 * DataCacheProvider actions
 *
 */

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  REMOVE_USER_PROFILE,
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

export function getUserProfile(user) {
  return {
    type: GET_USER_PROFILE,
    user,
  };
}

export function getUserProfileSuccess(profile) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    profile,
  };
}

export function getUserProfileErr(getUserProfileError) {
  return {
    type: GET_USER_PROFILE_ERROR,
    getUserProfileError,
  };
}

export function removeUserProfile(user) {
  return {
    type: REMOVE_USER_PROFILE,
    user,
  };
}
