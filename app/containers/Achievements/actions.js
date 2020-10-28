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
  SET_NEXT_USER_ACHIEVEMENTS,
  SET_USER_PROGRESS_VALUES,
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
) {
  return {
    type: GET_USER_ACHIEVEMENTS_SUCCESS,
    userAchievements,
    projectAchievements,
  };
}

export const setNextUserAchievements = nextUserAchievements => ({
  type: SET_NEXT_USER_ACHIEVEMENTS,
  nextUserAchievements,
});

export const setUserProgressValues = userProgressValues => ({
  type: SET_USER_PROGRESS_VALUES,
  userProgressValues,
});

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
