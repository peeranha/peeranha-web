/*
 *
 * userAchievements reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  GET_USER_ACHIEVEMENTS_ERROR,
} from './constants';

export const initialState = fromJS({
  currentAccount: null,
  achievements: [],
  getUserAchievementsError: null,
  getUserAchievementsLoading: false,
});

function communitiesReducer(state = initialState, action) {
  const { type, error, achievements, currentAccount } = action;

  switch (type) {
    case GET_USER_ACHIEVEMENTS:
      return state.set('getUserAchievementsLoading', true);

    case GET_USER_ACHIEVEMENTS_SUCCESS:
      return state
        .set('getUserAchievementsLoading', false)
        .set('currentAccount', currentAccount)
        .set('achievements', achievements);

    case GET_USER_ACHIEVEMENTS_ERROR:
      return state
        .set('getUserAchievementsLoading', false)
        .set('getUserAchievementsError', error.message);

    default:
      return state;
  }
}

export default communitiesReducer;
