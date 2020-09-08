/*
 *
 * SuggestedCommunities actions
 *
 */

import {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
} from './constants';

export function getUserAchievements(currentAccount) {
  return {
    type: GET_USER_ACHIEVEMENTS,
    currentAccount,
  };
}

export function getUserAchievementsSuccess(currentAccount, achievements) {
  return {
    type: GET_USER_ACHIEVEMENTS_SUCCESS,
    currentAccount,
    achievements,
  };
}

export function getUserAchievementsErr(error) {
  return {
    type: GET_USER_ACHIEVEMENTS_ERROR,
    error,
  };
}
