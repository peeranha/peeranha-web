/*
 *
 * EditCommunity actions
 *
 */

import {
  EDIT_COMMUNITY,
  EDIT_COMMUNITY_ERROR,
  EDIT_COMMUNITY_SUCCESS,
  GET_COMMUNITY,
  GET_COMMUNITY_ERROR,
  GET_COMMUNITY_SUCCESS,
  FREEZE_COMMUNITY,
  FREEZE_COMMUNITY_ERROR,
  FREEZE_COMMUNITY_SUCCESS,
} from './constants';

export function editCommunity(communityId, communityData) {
  return {
    type: EDIT_COMMUNITY,
    communityId,
    communityData,
  };
}

export function editCommunitySuccess() {
  return {
    type: EDIT_COMMUNITY_SUCCESS,
  };
}

export function editCommunityError(error) {
  return {
    type: EDIT_COMMUNITY_ERROR,
    error,
  };
}

export function getCommunity(communityId) {
  return {
    type: GET_COMMUNITY,
    communityId,
  };
}

export function getCommunitySuccess(community) {
  return {
    type: GET_COMMUNITY_SUCCESS,
    community,
  };
}

export function getCommunityError(error) {
  return {
    type: GET_COMMUNITY_ERROR,
    error,
  };
}

export function freezeCommunity(isFrozen, communityId) {
  return {
    type: FREEZE_COMMUNITY,
    isFrozen,
    communityId,
  };
}

export function freezeCommunitySuccess() {
  return {
    type: FREEZE_COMMUNITY_SUCCESS,
  };
}

export function freezeCommunityError(error) {
  return {
    type: FREEZE_COMMUNITY_ERROR,
    error,
  };
}
