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
  SET_NEXT_USER_ACHIEVEMENTS,
  SET_USER_PROGRESS_VALUES,
  GET_USER_ACHIEVEMENTS_ERROR,
  SET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
} from './constants';

export const initialState = fromJS({
  viewProfileAccount: null,
  achievements: [],
  userAchievementsError: null,
  userAchievementsLoading: true,
  nextUserAchievements: {},
  userProgressValues: {},
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
        .set('achievements', userAchievements)
        .set('projectAchievements', projectAchievements);

    case SET_NEXT_USER_ACHIEVEMENTS:
      return state.set('nextUserAchievements', nextUserAchievements);

    case SET_USER_PROGRESS_VALUES:
      return state.set('userProgressValues', userProgressValues);

    case GET_USER_ACHIEVEMENTS_ERROR:
      return state.set('userAchievementsError', error);

    case RESET_USER_ACHIEVEMENTS:
      return initialState;

    default:
      return state;
  }
}

export default achievementsReducer;
