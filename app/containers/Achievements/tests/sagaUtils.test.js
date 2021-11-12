import {
  achievementsArr,
  answerGivenArr,
  firstAnswerArr,
  firstIn15Arr,
} from '../constants';

import {
  getMaxGroupsLowerValues,
  getNextAchievementId,
  getNextUniqueAchievementId,
  isProfileInfoUpdated,
} from '../saga';

describe('Achievements saga helper functions tests', () => {
  describe('getNextAchievementId', () => {
    it('should return correct next achievement id for common achievements', () => {
      const currentValue = 1200;
      const userAchievements = [];
      const possibleAchievements = achievementsArr;
      expect(
        getNextAchievementId(
          currentValue,
          userAchievements,
          possibleAchievements,
        ),
      ).toBe(44);
      expect(getNextAchievementId(7, [], answerGivenArr)).toBe(12);
    });
    it(`current user value less than minimal achievement group lower value`, () => {
      expect(getNextAchievementId(0, [], answerGivenArr)).toBe(10);
      expect(getNextAchievementId(0, [], firstIn15Arr)).toBe(50);
    });
    describe('should correctly handle common achievement boundary values', () => {
      const lowerValue = 1000;
      const upperValue = 2499;
      it('loverValue', () => {
        expect(getNextAchievementId(lowerValue, [], achievementsArr)).toBe(44);
      });
      it('upperValue', () => {
        expect(getNextAchievementId(upperValue, [], achievementsArr)).toBe(44);
      });
    });
    it('should return null if all achievement in the group are reached', () => {
      const userAchievements = [
        { achievements_id: 50 },
        { achievements_id: 51 },
        { achievements_id: 52 },
      ];
      expect(getNextAchievementId(0, userAchievements, firstIn15Arr)).toBe(
        null,
      );
    });
    it('should return correct id, if userValue is less than lower values of reached achievements', () => {
      let userAchievements = [{ achievements_id: 60 }, { achievements_id: 61 }];
      expect(getNextAchievementId(0, userAchievements, firstAnswerArr)).toBe(
        62,
      );
      const mockUserRating = -1000;
      userAchievements = [
        { achievements_id: 40 },
        { achievements_id: 41 },
        { achievements_id: 42 },
      ];
      expect(
        getNextAchievementId(mockUserRating, userAchievements, achievementsArr),
      ).toBe(43);
    });
  });
  describe('getNextUniqueAchievementId', () => {
    it('should return null if all unique achievement are reached', () => {
      const mockUserRating = 10000;
      const userAchievements = [];
      const mockProjectAchievements = [];
      expect(
        getNextUniqueAchievementId(
          mockUserRating,
          userAchievements,
          mockProjectAchievements,
        ),
      ).toEqual(null);
    });
    it('should return null if unique achievements are out of limit', () => {
      const mockUserRating = 2555;
      const mockProjectAchievements = [
        { id: 34, count: 5 },
        { id: 35, count: 5 },
        { id: 36, count: 10 },
      ];
      expect(
        getNextUniqueAchievementId(mockUserRating, [], mockProjectAchievements),
      ).toEqual(null);
    });
    describe('should return correct next unique achievement id', () => {
      it('if rating is between achievements lower and upper values', () => {
        const mockUserRating = 1234;
        const mockProjectAchievements = [
          { id: 33, count: 5 },
          { id: 34, count: 2 },
        ];
        expect(
          getNextUniqueAchievementId(
            mockUserRating,
            [],
            mockProjectAchievements,
          ),
        ).toBe(34);
      });
      it('if rating is less than reached achievements lower values', () => {
        const mockUserRating = -1000;
        const userAchievements = [
          { achievements_id: 30 },
          { achievements_id: 31 },
          { achievements_id: 32 },
        ];
        expect(
          getNextUniqueAchievementId(mockUserRating, userAchievements, []),
        ).toBe(33);
      });
      it('if there are out of limit achievements', () => {
        const mockUserRating = 10;
        const userAchievements = [
          { achievements_id: 30 },
          { achievements_id: 31 },
        ];
        const mockProjectAchievements = [
          { id: 32, count: 5 },
          { id: 33, count: 1 },
          { id: 34, count: 5 },
          { id: 35, count: 1 },
        ];
        expect(
          getNextUniqueAchievementId(
            mockUserRating,
            userAchievements,
            mockProjectAchievements,
          ),
        ).toBe(33);
      });
    });
    describe('should correctly handle unique achievement boundary values', () => {
      const lowerValue = 1000;
      const upperValue = 2499;
      const mockProjectAchievements = [
        { id: 33, count: 2 },
        { id: 34, count: 2 },
      ];
      it('loverValue', () => {
        expect(
          getNextUniqueAchievementId(lowerValue, mockProjectAchievements),
        ).toBe(34);
      });
      it('upperValue', () => {
        expect(
          getNextUniqueAchievementId(upperValue, mockProjectAchievements),
        ).toBe(34);
      });
    });
  });
  describe('getMaxGroupsLowerValues', () => {
    it('should return groups maximum lowerValues ', () => {
      expect(getMaxGroupsLowerValues()).toEqual({
        maxRatingLowerValue: 10000,
        maxQuestionLowerValue: 10,
        maxAnswersLowerValue: 10,
        maxBestAnswersLowerValue: 5,
        maxFirstAnswerLowerValue: 5,
        maxFirstIn15LowerValue: 5,
      });
    });
  });

  describe('isProfileInfoUpdated', () => {
    it('should return true, if currProfileInfo or prevProfileInfo have initial values or undefined', () => {
      expect(isProfileInfoUpdated()).toBe(true);
      expect(isProfileInfoUpdated(null)).toBe(true);
      expect(isProfileInfoUpdated({}, undefined)).toBe(true);
      expect(isProfileInfoUpdated(undefined, {})).toBe(true);
    });

    it('should return true, if profileInfo updated', () => {
      let currProfileInfo = { postCount: 2 };
      let prevProfileInfo = {};
      let mockMaxGroupsLowerValues = { maxQuestionLowerValue: 5 };

      expect(
        isProfileInfoUpdated(
          currProfileInfo,
          prevProfileInfo,
          mockMaxGroupsLowerValues,
        ),
      ).toBe(true);

      currProfileInfo = { integer_properties: [{ key: 12, value: 1 }] };
      prevProfileInfo = {};
      mockMaxGroupsLowerValues = { maxFirstIn15LowerValue: 5 };

      expect(
        isProfileInfoUpdated(
          currProfileInfo,
          prevProfileInfo,
          mockMaxGroupsLowerValues,
        ),
      ).toBe(true);
    });

    it('should return false, if profileInfo has not updated', () => {
      expect(isProfileInfoUpdated({}, {}, {})).toBe(false);
      expect(
        isProfileInfoUpdated(
          { rating: 222 },
          { rating: 222 },
          { maxRatingLowerValue: 10000 },
        ),
      ).toBe(false);
    });

    it('should return false, if profileInfo updated, but updated value is not related to achievements', () => {
      expect(
        isProfileInfoUpdated(
          { hello_world: 2000 },
          { hi_world: [800, 12] },
          {},
        ),
      ).toBe(false);
    });

    it('should return false, if profileInfo updated, but updated value above the corresponding value', () => {
      expect(
        isProfileInfoUpdated(
          { rating: 10001 },
          { rating: 10000 },
          { maxRatingLowerValue: 10000 },
        ),
      ).toBe(false);
    });

    it('should return true, if previous value was below maxLowerValue, but have become higher after update', () => {
      expect(
        isProfileInfoUpdated(
          { rating: 10000 },
          { rating: 9999 },
          { maxRatingLowerValue: 10000 },
        ),
      ).toBe(true);
    });
  });
});
