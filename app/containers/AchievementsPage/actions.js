/*
 *
 * SuggestedCommunities actions
 *
 */

import {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_CURRENT_ACCOUNT,
} from './constants';

export function getUserAchievements(currentAccount) {
  return {
    type: GET_USER_ACHIEVEMENTS,
    currentAccount,
  };
}

export function getUserAchievementsSuccess(achievements) {
  return {
    type: GET_USER_ACHIEVEMENTS_SUCCESS,
    achievements,
  };
}

export function getUserAchievementsErr(error) {
  return {
    type: GET_USER_ACHIEVEMENTS_ERROR,
    error,
  };
}

export function setCurrentAccount(currentAccount) {
  return {
    type: SET_CURRENT_ACCOUNT,
    currentAccount,
  };
}
