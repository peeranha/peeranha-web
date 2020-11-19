import {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
  SET_MEMORIZED_ACHIEV_DATA,
  SET_MAX_GROUPS_LOWER_VALUES,
  RESET_VIEW_PROFILE_ACCOUNT,
} from '../constants';

import {
  getUserAchievements,
  setUserAchievementLoading,
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setViewProfileAccount,
  setMaxGroupsLowerValues,
  setMemorizedAchievementData,
  resetViewProfileAccount,
} from '../actions';

describe('Achievements actions', () => {
  it('getUserAchievements', () => {
    const expected = {
      type: GET_USER_ACHIEVEMENTS,
    };
    expect(getUserAchievements()).toEqual(expected);
  });

  it('setUserAchievementLoading', () => {
    const expected = {
      type: USER_ACHIEVEMENTS_LOADING,
      loading: true,
    };
    expect(setUserAchievementLoading(true)).toEqual(expected);
  });

  it('getUserAchievementsSuccess', () => {
    const userAchievements = {};
    const projectAchievements = {};
    const nextUserAchievements = {};
    const userProgressValues = {};

    const expected = {
      type: GET_USER_ACHIEVEMENTS_SUCCESS,
      userAchievements,
      projectAchievements,
      nextUserAchievements,
      userProgressValues,
    };
    expect(
      getUserAchievementsSuccess({
        userAchievements,
        projectAchievements,
        nextUserAchievements,
        userProgressValues,
      }),
    ).toEqual(expected);
  });

  it('getUserAchievementsErr', () => {
    const error = 'some error';
    const expected = {
      type: GET_USER_ACHIEVEMENTS_ERROR,
      error,
    };
    expect(getUserAchievementsErr(error)).toEqual(expected);
  });

  it('setViewProfileAccount', () => {
    const viewProfileAccount = 'someAccount';
    const expected = {
      type: SET_VIEW_PROFILE_ACCOUNT,
      viewProfileAccount,
    };
    expect(setViewProfileAccount(viewProfileAccount)).toEqual(expected);
  });

  it('resetViewProfileAccount', () => {
    const expected = {
      type: RESET_VIEW_PROFILE_ACCOUNT,
    };
    expect(resetViewProfileAccount()).toEqual(expected);
  });

  it('setMaxGroupsLowerValues', () => {
    const maxGroupsLowerValues = {};
    const expected = {
      type: SET_MAX_GROUPS_LOWER_VALUES,
      maxGroupsLowerValues,
    };
    expect(setMaxGroupsLowerValues(maxGroupsLowerValues)).toEqual(expected);
  });

  it('setMemorizedAchievementData', () => {
    const viewProfileAccount = 'someAccount';
    const memorizedAchievData = {};
    const expected = {
      type: SET_MEMORIZED_ACHIEV_DATA,
      viewProfileAccount,
      memorizedAchievData,
    };
    expect(
      setMemorizedAchievementData(viewProfileAccount, memorizedAchievData),
    ).toEqual(expected);
  });
});
