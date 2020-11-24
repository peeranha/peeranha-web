import { fromJS } from 'immutable';
import { initialState } from '../reducer';

import {
  uniqueAchievementsArr,
  achievementsArr,
  questionsAskedArr,
  answerGivenArr,
  bestAnswerArr,
  firstAnswerArr,
  firstIn15Arr,
  questionAskedRelated,
} from '../constants';

import {
  selectUserAchievementsDomain,
  selectViewProfileAccount,
  selectRatingAchievements,
  selectQuestionAskedAchievements,
  selectAnwerGivenAchievements,
  selectBestAnswerAchievements,
  selectFirstAnswerAchievements,
  selectFirstIn15Achievements,
  selectUniqueAchievements,
  selectUniqueReachedAchievements,
  selectUniqueUnreachedAchievements,
  selectUserAchievements,
  selectAchievementsLoading,
  getReachedAchievementsIds,
  getReachedAchievements,
  getUnreachedAchievements,
  selectMemorizedUserAchievements,
  selectMaxGroupsLowerValues,
} from '../selectors';

const commonReachedAchievementId = 43;
const questionAskedReachedId = 2;
const uniqueReachedAchievementId = 35;
const uraTotalAwarded = 111;

const reachedAchievementsIdsMock = [
  commonReachedAchievementId,
  uniqueReachedAchievementId,
  questionAskedReachedId,
];

const achievementsMock = [
  // reached achievement for some other user
  {
    user: 'someAnotherAccount',
    achievements_id: 21,
  },
  // commonly available reached achievement
  {
    user: 'someAccount',
    achievements_id: commonReachedAchievementId,
  },
  // commonly available reached achievement
  {
    user: 'someAccount',
    achievements_id: questionAskedReachedId,
  },
  // unique reached achievement
  {
    user: 'someAccount',
    achievements_id: uniqueReachedAchievementId,
  },
];

const userAchievementsMock = fromJS({
  viewProfileAccount: 'someAccount',
  achievements: achievementsMock,
  userAchievementsError: 'some error',
  userAchievementsLoading: false,
  projectAchievements: [
    { id: uniqueReachedAchievementId, count: uraTotalAwarded },
  ],
  nextUserAchievements: { firstNext: 22, secondNext: 33 },
  userProgressValues: { firstValue: 50, secondValue: 60 },
  memorizedAchievData: { userAccount: { first: {}, second: {} } },
  maxGroupsLowerValues: { firstMax: 10, secondMax: 20 },
});

const globalStateMock = fromJS({
  userAchievements: userAchievementsMock,
});

const emptyGlobalState = fromJS({});

describe('Achievements selectors', () => {
  describe('selectUserAchievementsDomain', () => {
    it('should return initial state, if userAchievements field is not defined in global state', () => {
      expect(selectUserAchievementsDomain(emptyGlobalState)).toEqual(
        initialState,
      );
    });

    it('should select userAchievements from global state', () => {
      expect(selectUserAchievementsDomain(globalStateMock)).toEqual(
        userAchievementsMock,
      );
    });
  });

  it('selectViewProfileAccount', () => {
    const viewProfileAccountSelector = selectViewProfileAccount();
    expect(viewProfileAccountSelector(initialState)).toEqual(null);
    expect(viewProfileAccountSelector(globalStateMock)).toBe(
      userAchievementsMock.toJS().viewProfileAccount,
    );
  });

  it('selectMaxGroupsLowerValues', () => {
    const maxGroupsLowerValuesSelector = selectMaxGroupsLowerValues();
    expect(maxGroupsLowerValuesSelector(initialState)).toEqual({});
    expect(maxGroupsLowerValuesSelector(globalStateMock)).toEqual(
      userAchievementsMock.toJS().maxGroupsLowerValues,
    );
  });

  describe('selectMemorizedUserAchievements', () => {
    const mockUserAccount = 'userAccount';
    const memorizedUserAchievementsSelector = selectMemorizedUserAchievements(
      mockUserAccount,
    );
    const mockUserAccount2 = 'fakeAccount';
    const memorizedUserAchievementsSelector2 = selectMemorizedUserAchievements(
      mockUserAccount2,
    );

    it('should return empty object for initialState', () => {
      expect(memorizedUserAchievementsSelector(initialState)).toEqual({});
    });

    it('should return empty object if there is no memorized achievements for current account', () => {
      expect(memorizedUserAchievementsSelector2(globalStateMock)).toEqual({});
    });

    it('should return memorized achievements for current user account', () => {
      expect(memorizedUserAchievementsSelector(globalStateMock)).toEqual(
        userAchievementsMock.toJS().memorizedAchievData[mockUserAccount],
      );
    });
  });

  it('selectUserAchievements', () => {
    const userAchievementsSelector = selectUserAchievements();
    expect(userAchievementsSelector(emptyGlobalState)).toEqual([]);
    expect(userAchievementsSelector(globalStateMock)).toEqual(
      userAchievementsMock.toJS().achievements,
    );
  });

  it('selectAchievementsLoading', () => {
    const achievementsLoadingSelector = selectAchievementsLoading();
    expect(achievementsLoadingSelector(globalStateMock)).toEqual(
      userAchievementsMock.toJS().userAchievementsLoading,
    );
  });

  describe('getReachedAchievementsIds', () => {
    it('should return empty array with userAchievements initialState argument', () => {
      expect(getReachedAchievementsIds(initialState)).toEqual([]);
    });

    it("should return array with reached achievements id's for viewProfileAccount", () => {
      expect(getReachedAchievementsIds(userAchievementsMock)).toEqual(
        expect.arrayContaining(reachedAchievementsIdsMock),
      );
    });
  });

  describe('getReachedAchievements', () => {
    it('should return empty array if reachedAchievementsIds array is empty', () => {
      expect(getReachedAchievements(achievementsArr, [])).toEqual([]);
    });

    it('should return array with reached achievements for the specified achievements group', () => {
      expect(
        getReachedAchievements(achievementsArr, [41, 43, 45, 1, 22, 33, 62])
          .length,
      ).toBe(3);
      expect(
        getReachedAchievements(firstIn15Arr, [3, 11, 22, 43, 51, 62])[0].id,
      ).toBe(51);
    });

    it('should return array with objects, that should contain "reached" field with value "true"', () => {
      expect(
        getReachedAchievements(questionsAskedArr, [1, 2, 3])[0],
      ).toHaveProperty('reached', true);
      expect(
        getReachedAchievements(questionsAskedArr, [1, 2, 3])[2],
      ).toHaveProperty('reached', true);
    });
  });

  describe('getUnreachedAchievements', () => {
    const stateMock = initialState
      .set('nextUserAchievements', {
        [questionAskedRelated]: 2,
      })
      .set('userProgressValues', { [questionAskedRelated]: 4 });

    const parameters = [
      stateMock,
      questionsAskedArr,
      questionAskedRelated,
      [1],
    ];

    it('should return empty array if there are no unreached achievements in current achievement group', () => {
      expect(
        getUnreachedAchievements(
          initialState,
          questionsAskedArr,
          questionAskedRelated,
          [1, 2, 3],
        ),
      ).toEqual([]);
    });

    it('should return array with unreached achievements for the specified achievements group', () => {
      expect(getUnreachedAchievements(...parameters).map(el => el.id)).toEqual(
        expect.arrayContaining([2, 3]),
      );
    });

    it('should return array with objects containing "isNext", "reached", "pointsToNext", "currentValue", "groupType" fields', () => {
      expect(
        getUnreachedAchievements(...parameters).filter(
          el => el.isNext === true,
        )[0],
      ).toMatchObject({
        reached: false,
        isNext: true,
        pointsToNext: expect.any(Number),
        currentValue: expect.any(Number),
        groupType: 'questionAskedRelated',
      });
      expect(
        getUnreachedAchievements(...parameters).filter(
          el => el.isNext === false,
        )[0],
      ).toMatchObject({
        reached: false,
        isNext: false,
        pointsToNext: null,
        currentValue: expect.any(Number),
        groupType: 'questionAskedRelated',
      });
    });
  });

  describe('selectRatingAchievements', () => {
    const ratingAchievementsSelector = selectRatingAchievements();

    it('should return all rating ahievements', () => {
      expect(ratingAchievementsSelector(initialState).map(el => el.id)).toEqual(
        achievementsArr.map(el => el.id),
      );
    });
  });

  describe('selectQuestionAskedAchievements', () => {
    const questionAskedAchievementsSelector = selectQuestionAskedAchievements();
    it('should return all queston asked ahievements', () => {
      expect(
        questionAskedAchievementsSelector(initialState).map(el => el.id),
      ).toEqual(questionsAskedArr.map(el => el.id));
    });
  });

  describe('selectAnwerGivenAchievements', () => {
    const anwerGivenAchievementsSelector = selectAnwerGivenAchievements();

    it('should return all answer given ahievements', () => {
      expect(
        anwerGivenAchievementsSelector(initialState).map(el => el.id),
      ).toEqual(answerGivenArr.map(el => el.id));
    });
  });
  describe('selectBestAnswerAchievements', () => {
    const bestAnswerAchievementsSelector = selectBestAnswerAchievements();

    it('should return all best answers ahievements', () => {
      expect(
        bestAnswerAchievementsSelector(initialState).map(el => el.id),
      ).toEqual(bestAnswerArr.map(el => el.id));
    });
  });

  describe('selectFirstAnswerAchievements', () => {
    const firstAnswerAchievementsSelector = selectFirstAnswerAchievements();

    it('should return all first answers ahievements', () => {
      expect(
        firstAnswerAchievementsSelector(initialState).map(el => el.id),
      ).toEqual(firstAnswerArr.map(el => el.id));
    });
  });

  describe('selectFirstIn15Achievements', () => {
    const firstIn15AchievementsSelector = selectFirstIn15Achievements();

    it('should return all answered in 15 minutes ahievements', () => {
      expect(
        firstIn15AchievementsSelector(initialState).map(el => el.id),
      ).toEqual(firstIn15Arr.map(el => el.id));
    });
  });

  describe('selectUniqueReachedAchievements', () => {
    const uniqueReachedAchievementsSelector = selectUniqueReachedAchievements();

    it('should return empty array, if there are no reached unique achievements', () => {
      expect(uniqueReachedAchievementsSelector(emptyGlobalState)).toEqual([]);
    });

    it('should return reached unique achievements', () => {
      expect(uniqueReachedAchievementsSelector(globalStateMock)[0].id).toBe(
        uniqueReachedAchievementId,
      );
    });
  });

  describe('selectUniqueUnreachedAchievements', () => {
    const uniqueUnreachedAchievementsSelector = selectUniqueUnreachedAchievements();

    const allUniqueAchievements = uniqueAchievementsArr.map(el => ({
      user: 'someAccount',
      achievements_id: el.id,
    }));

    const achievementsIds = allUniqueAchievements.map(el => el.achievements_id);
    const achievementCount = allUniqueAchievements.length;
    const randomIndex = Math.trunc(Math.random() * achievementCount);

    it('should return empty array, if all unique achievements are reached', () => {
      const stateMock = fromJS({
        userAchievements: fromJS({
          achievements: allUniqueAchievements,
          viewProfileAccount: 'someAccount',
        }),
      });
      expect(uniqueUnreachedAchievementsSelector(stateMock)).toEqual([]);
    });

    it('should return all unique achievements, if there are no unique reached achievements', () => {
      expect(uniqueUnreachedAchievementsSelector(initialState).length).toBe(
        achievementCount,
      );

      expect(
        achievementsIds.includes(
          uniqueUnreachedAchievementsSelector(initialState)[randomIndex].id,
        ),
      ).toBeTruthy();
    });

    it('should return array with objects containing "isNext", "reached", "pointsToNext", "currentValue", "totalAwarded" fields', () => {
      const mockState = initialState
        .set('nextUserAchievements', {
          uniqueRatingRelated: 31,
        })
        .set('userProgressValues', { ratingRelated: 50 });

      const globalStateMockForUUA = fromJS({
        userAchievements: mockState,
      });

      expect(
        uniqueUnreachedAchievementsSelector(globalStateMockForUUA).filter(
          el => el.isNext === true,
        )[0],
      ).toMatchObject({
        reached: false,
        totalAwarded: 0,
        isNext: true,
        pointsToNext: expect.any(Number),
        currentValue: 50,
      });
      expect(
        uniqueUnreachedAchievementsSelector(globalStateMockForUUA).filter(
          el => el.isNext === false,
        )[0],
      ).toMatchObject({
        reached: false,
        totalAwarded: 0,
        isNext: false,
        pointsToNext: null,
        currentValue: 50,
      });
    });
  });

  describe('selectUniqueAchievements', () => {
    const uniqueAchievementsSelector = selectUniqueAchievements();

    it('should return all unique ahievements', () => {
      expect(uniqueAchievementsSelector(initialState).map(el => el.id)).toEqual(
        uniqueAchievementsArr.map(el => el.id),
      );
    });
  });
});
