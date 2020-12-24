/*
 *
 * Achievements reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_USER_ACHIEVEMENTS_SUCCESS,
  GET_USER_ACHIEVEMENTS_ERROR,
  SET_VIEW_PROFILE_ACCOUNT,
  RESET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
  SET_MEMORIZED_ACHIEV_DATA,
  SET_MAX_GROUPS_LOWER_VALUES,
} from './constants';

export const initialState = fromJS({
  viewProfileAccount: null,
  achievements: [],
  projectAchievements: [],
  nextUserAchievements: {},
  userProgressValues: {},
  memorizedAchievData: {},
  maxGroupsLowerValues: {},
  userAchievementsError: null,
  userAchievementsLoading: true,
});

function achievementsReducer(state = initialState, action) {
  const {
    type,
    error,
    userAchievements,
    projectAchievements,
    nextUserAchievements,
    userProgressValues,
    viewProfileAccount,
    memorizedAchievData,
    maxGroupsLowerValues,
    loading,
  } = action;

  switch (type) {
    case GET_USER_ACHIEVEMENTS_SUCCESS:
      return state
        .set('achievements', userAchievements)
        .set('projectAchievements', projectAchievements)
        .set('nextUserAchievements', nextUserAchievements)
        .set('userProgressValues', userProgressValues)
        .set('userAchievementsLoading', false);

    case SET_MEMORIZED_ACHIEV_DATA:
      return state.setIn(
        ['memorizedAchievData', `${viewProfileAccount}`],
        memorizedAchievData,
      );

    case SET_MAX_GROUPS_LOWER_VALUES:
      return state.set('maxGroupsLowerValues', maxGroupsLowerValues);

    case SET_VIEW_PROFILE_ACCOUNT:
      return state
        .set('viewProfileAccount', viewProfileAccount)
        .set('userAchievementsLoading', true);

    case RESET_VIEW_PROFILE_ACCOUNT:
      return state.set('viewProfileAccount', null);

    case USER_ACHIEVEMENTS_LOADING:
      return state.set('userAchievementsLoading', loading);

    case GET_USER_ACHIEVEMENTS_ERROR:
      return state.set('userAchievementsError', error);

    default:
      return state;
  }
}

export default achievementsReducer;
