/*
 *
 * DataCacheProvider actions
 *
 */

import {
  GET_COMMUNITIES,
  GET_COMMUNITIES_SUCCESS,
  GET_COMMUNITIES_ERROR,
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_ERROR,
  UPDATE_TAG_OF_COMMUNITY,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  UPDATE_USER_ACHIEVEMENTS,
  REMOVE_USER_PROFILE,
  GET_STAT,
  GET_STAT_SUCCESS,
  GET_STAT_ERROR,
  GET_FAQ,
  GET_FAQ_SUCCESS,
  GET_FAQ_ERROR,
  GET_TUTORIAL,
  GET_TUTORIAL_SUCCESS,
  GET_TUTORIAL_ERROR,
  GET_COMMUNITY_TAGS,
} from './constants';

export function getCommunities() {
  return {
    type: GET_COMMUNITIES,
  };
}

export function getCommunitiesSuccess(communities) {
  return {
    type: GET_COMMUNITIES_SUCCESS,
    communities,
  };
}

export function getCommunitiesErr(getCommunitiesError) {
  return {
    type: GET_COMMUNITIES_ERROR,
    getCommunitiesError,
  };
}

export function getCommunityTags(communityId) {
  return {
    type: GET_COMMUNITY_TAGS,
    communityId,
  };
}

export function getTagsSuccess(tags) {
  return {
    type: GET_TAGS_SUCCESS,
    tags,
  };
}

export function getTagsErr(getTagsError) {
  return {
    type: GET_TAGS_ERROR,
    getTagsError,
  };
}

export function updateTagOfCommunity(communityId, tagId, updatedTag) {
  return {
    type: UPDATE_TAG_OF_COMMUNITY,
    updatedTagCommId: communityId,
    updatedTagId: tagId,
    updatedTag,
  };
}

export function getUserProfile(user, getFullProfile, isLogin) {
  return {
    type: GET_USER_PROFILE,
    user,
    getFullProfile,
    isLogin,
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

export function updateCachedUserAchievements(userForUpdate, updatedAchCount) {
  return {
    type: UPDATE_USER_ACHIEVEMENTS,
    userForUpdate,
    updatedAchCount,
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

// Get TUTORIAL
export function getTutorial() {
  return {
    type: GET_TUTORIAL,
  };
}

export function getTutorialSuccess(tutorial) {
  return {
    type: GET_TUTORIAL_SUCCESS,
    tutorial,
  };
}

export function getTutorialErr(getTutorialError) {
  return {
    type: GET_TUTORIAL_ERROR,
    getTutorialError,
  };
}
