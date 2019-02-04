/*
 *
 * Profile actions
 *
 */

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
} from './constants';

/*
 *
 * getProfileInformation actions
 *
 */

export function getProfileInfo(userKey) {
  return {
    type: GET_PROFILE_INFORMATION,
    userKey,
  };
}

export function getProfileInfoSuccess(profile) {
  return {
    type: GET_PROFILE_INFORMATION_SUCCESS,
    profile,
  };
}

export function getProfileInfoError(errorLoadProfile) {
  return {
    type: GET_PROFILE_INFORMATION_ERROR,
    errorLoadProfile,
  };
}
