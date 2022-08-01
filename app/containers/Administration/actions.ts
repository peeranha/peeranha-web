import {
  ADD_MODERATOR,
  ADD_MODERATOR_ERROR,
  ADD_MODERATOR_SUCCESS,
  GET_MODERATORS,
  GET_MODERATORS_ERROR,
  GET_MODERATORS_SUCCESS,
  REVOKE_MODERATOR,
  REVOKE_MODERATOR_ERROR,
  REVOKE_MODERATOR_SUCCESS,
} from 'containers/Administration/constants';

export function getModerators(communityId: number) {
  return {
    type: GET_MODERATORS,
    communityId,
  };
}

export function getModeratorsSuccess(moderatorsList: Array<object>) {
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

export function addModerator(userAddress: string, communityId: number) {
  return {
    type: ADD_MODERATOR,
    userAddress,
    communityId,
  };
}

export function addModeratorSuccess() {
  return {
    type: ADD_MODERATOR_SUCCESS,
  };
}

export function addModeratorError(moderatorsError: Error) {
  return {
    type: ADD_MODERATOR_ERROR,
    moderatorsError,
  };
}

export function revokeModerator(userAddress: string, communityId: number) {
  return {
    type: REVOKE_MODERATOR,
    userAddress,
    communityId,
  };
}

export function revokeModeratorSuccess() {
  return {
    type: REVOKE_MODERATOR_SUCCESS,
  };
}

export function revokeModeratorError(moderatorsError: Error) {
  return {
    type: REVOKE_MODERATOR_ERROR,
    moderatorsError,
  };
}
