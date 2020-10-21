/*
 *
 * Achievements reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_USER_ACHIEVEMENTS,
  RESET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  GET_USER_ACHIEVEMENTS_ERROR,
  SET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
} from './constants';

export const initialState = fromJS({
  viewProfileAccount: null,
  achievements: [],
  userAchievementsError: null,
  userAchievementsLoading: false,
});

function AchievementsReducer(state = initialState, action) {
  const {
    type,
    error,
    userAchievements,
    projectAchievements,
    nextAchievement,
    nextUniqueAchievement,
    viewProfileAccount,
    loading,
  } = action;

  switch (type) {
    case GET_USER_ACHIEVEMENTS:
      return state.set('userAchievementsLoading', true);

    case SET_VIEW_PROFILE_ACCOUNT:
      return state.set('viewProfileAccount', viewProfileAccount);

    case USER_ACHIEVEMENTS_LOADING:
      return state.set('userAchievementsLoading', loading);

    case GET_USER_ACHIEVEMENTS_SUCCESS:
      return state
        .set('userAchievementsLoading', false)
        .set('achievements', userAchievements)
        .set('projectAchievements', projectAchievements)
        .set('nextAchievement', nextAchievement)
        .set('nextUniqueAchievement', nextUniqueAchievement);

    case GET_USER_ACHIEVEMENTS_ERROR:
      return state
        .set('userAchievementsLoading', false)
        .set('userAchievementsError', error);

    case RESET_USER_ACHIEVEMENTS:
      return initialState;

    default:
      return state;
  }
}

export default AchievementsReducer;
