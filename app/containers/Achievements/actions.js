/*
 *
 * Achievements actions
 *
 */

import {
  GET_USER_ACHIEVEMENTS,
  RESET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
} from './constants';

export function getUserAchievements() {
  return {
    type: GET_USER_ACHIEVEMENTS,
  };
}

export function resetUserAchievements() {
  return {
    type: RESET_USER_ACHIEVEMENTS,
  };
}

export function setUserAchievementLoading(loading) {
  return {
    type: USER_ACHIEVEMENTS_LOADING,
    loading,
  };
}

export function getUserAchievementsSuccess(
  userAchievements,
  projectAchievements,
  nextAchievement,
  nextUniqueAchievement,
) {
  return {
    type: GET_USER_ACHIEVEMENTS_SUCCESS,
    userAchievements,
    projectAchievements,
    nextAchievement,
    nextUniqueAchievement,
  };
}

export function getUserAchievementsErr(error) {
  return {
    type: GET_USER_ACHIEVEMENTS_ERROR,
    error,
  };
}

export function setviewProfileAccount(viewProfileAccount) {
  return {
    type: SET_VIEW_PROFILE_ACCOUNT,
    viewProfileAccount,
  };
}
