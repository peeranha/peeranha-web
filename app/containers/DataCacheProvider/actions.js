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
  GET_STAT,
  GET_STAT_SUCCESS,
  GET_STAT_ERROR,
  GET_FAQ,
  GET_FAQ_SUCCESS,
  GET_FAQ_ERROR,
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

export function getUserProfile(user, getFullProfile) {
  return {
    type: GET_USER_PROFILE,
    user,
    getFullProfile,
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

// Get stat
export function getStat() {
  return {
    type: GET_STAT,
  };
}

export function getStatSuccess(stat) {
  return {
    type: GET_STAT_SUCCESS,
    stat,
  };
}

export function getStatErr(getStatError) {
  return {
    type: GET_STAT_ERROR,
    getStatError,
  };
}

// Get FAQ
export function getFaq() {
  return {
    type: GET_FAQ,
  };
}

export function getFaqSuccess(faq) {
  return {
    type: GET_FAQ_SUCCESS,
    faq,
  };
}

export function getFaqErr(getFaqError) {
  return {
    type: GET_FAQ_ERROR,
    getFaqError,
  };
}
