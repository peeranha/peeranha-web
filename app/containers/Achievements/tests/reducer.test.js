import { fromJS } from 'immutable';

import {
  setViewProfileAccount,
  setUserAchievementLoading,
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setMemorizedAchievementData,
  setMaxGroupsLowerValues,
  resetViewProfileAccount,
} from '../actions';

import achievementsReducer from '../reducer';

describe('achievementsReducer', () => {
  let mockState;
  beforeEach(() => {
    mockState = fromJS({
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
  });

  it('should return initial state', () => {
    expect(achievementsReducer(undefined, {})).toEqual(mockState);
  });

  it('should handle getUserAchievementsSuccess action', () => {
    const userAchievements = [{}, {}, {}];
    const projectAchievements = [{}, {}, {}];
    const nextUserAchievements = {};
    const userProgressValues = {};
    expect(
      achievementsReducer(
        undefined,
        getUserAchievementsSuccess({
          userAchievements,
          projectAchievements,
          nextUserAchievements,
          userProgressValues,
        }),
      ),
    ).toEqual(
      mockState
        .set('userAchievementsLoading', false)
        .set('achievements', userAchievements)
        .set('projectAchievements', projectAchievements)
        .set('nextUserAchievements', nextUserAchievements)
        .set('userProgressValues', userProgressValues)
        .set('userAchievementsLoading', false),
    );
  });

  it('should handle setMemorizedAchievementData action', () => {
    const viewProfileAccount = 'someAccount';
    const memorizedAchievData = {};
    expect(
      achievementsReducer(
        undefined,
        setMemorizedAchievementData(viewProfileAccount, memorizedAchievData),
      ),
    ).toEqual(
      mockState.setIn(
        ['memorizedAchievData', `${viewProfileAccount}`],
        memorizedAchievData,
      ),
    );
  });

  it('should handle setMaxGroupsLowerValues action', () => {
    const maxGroupsLowerValues = {};
    expect(
      achievementsReducer(
        undefined,
        setMaxGroupsLowerValues(maxGroupsLowerValues),
      ),
    ).toEqual(mockState.set('maxGroupsLowerValues', maxGroupsLowerValues));
  });

  it('should handle setViewProfileAccount action', () => {
    const viewProfileAccount = 'someAccount';
    expect(
      achievementsReducer(undefined, setViewProfileAccount(viewProfileAccount)),
    ).toEqual(mockState.set('viewProfileAccount', viewProfileAccount));
  });

  it('should handle resetViewProfileAccount action', () => {
    expect(achievementsReducer(undefined, resetViewProfileAccount())).toEqual(
      mockState.set('viewProfileAccount', null),
    );
  });

  it('should handle setUserAchievementLoading action', () => {
    const loading = true;
    expect(
      achievementsReducer(undefined, setUserAchievementLoading(loading)),
    ).toEqual(mockState.set('userAchievementsLoading', loading));
  });

  it('should handle getUserAchievementsErr action', () => {
    const error = { message: JSON.stringify('error message') };
    expect(
      achievementsReducer(undefined, getUserAchievementsErr(error)),
    ).toEqual(mockState.set('userAchievementsError', error));
  });
});
