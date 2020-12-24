/*
 *
 * Achievements actions
 *
 */

import {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_VIEW_PROFILE_ACCOUNT,
  RESET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
  SET_MEMORIZED_ACHIEV_DATA,
  SET_MAX_GROUPS_LOWER_VALUES,
} from './constants';

export function getUserAchievements() {
  return {
    type: GET_USER_ACHIEVEMENTS,
  };
}

export function setUserAchievementLoading(loading) {
  return {
    type: USER_ACHIEVEMENTS_LOADING,
    loading,
  };
}

export function getUserAchievementsSuccess({
  userAchievements,
  projectAchievements,
  nextUserAchievements,
  userProgressValues,
}) {
  return {
    type: GET_USER_ACHIEVEMENTS_SUCCESS,
    userAchievements,
    projectAchievements,
    nextUserAchievements,
    userProgressValues,
  };
}

export function getUserAchievementsErr(error) {
  return {
    type: GET_USER_ACHIEVEMENTS_ERROR,
    error,
  };
}

export function setViewProfileAccount(viewProfileAccount) {
  return {
    type: SET_VIEW_PROFILE_ACCOUNT,
    viewProfileAccount,
  };
}

export function resetViewProfileAccount() {
  return {
    type: RESET_VIEW_PROFILE_ACCOUNT,
  };
}

export function setMaxGroupsLowerValues(maxGroupsLowerValues) {
  return {
    type: SET_MAX_GROUPS_LOWER_VALUES,
    maxGroupsLowerValues,
  };
}

export function setMemorizedAchievementData(
  viewProfileAccount,
  memorizedAchievData,
) {
  return {
    type: SET_MEMORIZED_ACHIEV_DATA,
    viewProfileAccount,
    memorizedAchievData,
  };
}
