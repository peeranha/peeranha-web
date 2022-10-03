import {
  ADD_ROLE,
  ADD_ROLE_ERROR,
  ADD_ROLE_SUCCESS,
  GET_MODERATORS,
  GET_MODERATORS_ERROR,
  GET_MODERATORS_SUCCESS,
  REVOKE_ROLE,
  REVOKE_ROLE_ERROR,
  REVOKE_ROLE_SUCCESS,
} from 'containers/Administration/constants';
import { Moderator } from 'containers/Administration/types';

export function getModerators(communityId: number) {
  return {
    type: GET_MODERATORS,
    communityId,
  };
}

export function getModeratorsSuccess(moderatorsList: Array<Moderator>) {
  return {
    type: GET_MODERATORS_SUCCESS,
    moderatorsList,
  };
}

export function getModeratorsError(moderatorsError: Error) {
  return {
    type: GET_MODERATORS_ERROR,
    moderatorsError,
  };
}

export function addRole(
  userAddress: string,
  role: number,
  communityId: number,
) {
  return {
    type: ADD_ROLE,
    role,
    userAddress,
    communityId,
  };
}

export function addRoleSuccess() {
  return {
    type: ADD_ROLE_SUCCESS,
  };
}

export function addRoleError(moderatorsError: Error) {
  return {
    type: ADD_ROLE_ERROR,
    moderatorsError,
  };
}

export function revokeRole(
  userAddress: string,
  role: number,
  communityId: number,
) {
  return {
    type: REVOKE_ROLE,
    userAddress,
    role,
    communityId,
  };
}

export function revokeRoleSuccess() {
  return {
    type: REVOKE_ROLE_SUCCESS,
  };
}

export function revokeRoleError(moderatorsError: Error) {
  return {
    type: REVOKE_ROLE_ERROR,
    moderatorsError,
  };
}
