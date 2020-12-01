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
  SET_PREV_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
  SET_MEMORIZED_ACHIEV_DATA,
} from './constants';

export const initialState = fromJS({
  viewProfileAccount: null,
  prevViewProfileAccount: null,
  achievements: [],
  userAchievementsError: null,
  userAchievementsLoading: true,
  nextUserAchievements: {},
  userProgressValues: {},
  memorizedAchievData: {},
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
    prevViewProfileAccount,
    memorizedAchievData,
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

    case SET_VIEW_PROFILE_ACCOUNT:
      return state
        .set('viewProfileAccount', viewProfileAccount)
        .set('userAchievementsLoading', true);

    case SET_PREV_VIEW_PROFILE_ACCOUNT:
      return state
        .set('prevViewProfileAccount', prevViewProfileAccount)
        .set('viewProfileAccount', null);

    case USER_ACHIEVEMENTS_LOADING:
      return state.set('userAchievementsLoading', loading);

    case GET_USER_ACHIEVEMENTS_ERROR:
      return state.set('userAchievementsError', error);

    default:
      return state;
  }
}

export default achievementsReducer;
