/*
 *
 * Achievements reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  GET_USER_ACHIEVEMENTS_ERROR,
  SET_CURRENT_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
} from './constants';

export const initialState = fromJS({
  currentAccount: null,
  achievements: [],
  userAchievementsError: null,
  userAchievementsLoading: false,
});

function communitiesReducer(state = initialState, action) {
  const {
    type,
    error,
    userAchievements,
    projectAchievements,
    nextAchievement,
    nextUniqueAchievement,
    currentAccount,
    loading,
  } = action;

  switch (type) {
    case GET_USER_ACHIEVEMENTS:
      return state.set('userAchievementsLoading', true);

    case SET_CURRENT_ACCOUNT:
      return state.set('currentAccount', currentAccount);

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
        .set(
          'userAchievementsError',
          error ? JSON.parse(error.message) : error,
        );

    default:
      return state;
  }
}

export default communitiesReducer;
