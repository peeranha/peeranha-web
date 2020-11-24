import { select, put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { getAchievements } from 'utils/achievementsManagement';

import {
  USER_ACHIEVEMENTS_TABLE,
  PROJECT_ACHIEVEMENTS_TABLE,
  ALL_ACHIEVEMENTS_SCOPE,
} from 'utils/constants';

import { UPDATE_USER_ACHIEVEMENTS } from 'containers/DataCacheProvider/constants';

import {
  achievementsArr,
  questionsAskedArr,
  answerGivenArr,
  bestAnswerArr,
  firstAnswerArr,
  firstIn15Arr,
  ratingRelated,
  uniqueRatingRelated,
  questionAskedRelated,
  answerGivenRelated,
  bestAnswerRelated,
  firstAnswerIn15Related,
  firstAnswerRelated,
  SET_MAX_GROUPS_LOWER_VALUES,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_MEMORIZED_ACHIEV_DATA,
  GET_USER_ACHIEVEMENTS_ERROR,
  USER_ACHIEVEMENTS_LOADING,
  GET_USER_ACHIEVEMENTS,
} from '../constants';
import {
  getMaxGroupsLowerValues,
  getNextAchievementId,
  getNextUniqueAchievementId,
  getUserAchievementsWorker,
  isProfileInfoUpdated,
  updateUserAchievementsWorker,
} from '../saga';

jest.mock('redux-saga/effects');
jest.mock('containers/DataCacheProvider/selectors');

jest.mock('utils/achievementsManagement', () => ({
  getAchievements: jest.fn().mockImplementation(() => {}),
}));

const error = 'some error';
const viewProfileAccount = 'userAccount';
const profileInfo = { integer_properties: [] };
const maxGroupsLowerValues = { firstMaxLowerValue: 'someValue' };
const emptyMaxGroupsLowerValues = {};
const memorizedUserAchievements = { profileInfo: { integer_properties: [1] } };
const profileInfoUpdatedTrue = true;
const profileInfoUpdatedFalse = false;
const eos = { eosfield: '' };
const cachedUserAchievements = [];
const projectAchievements = [];
const userRating = 1;
const questionsAskedValue = 2;
const answersGivenValue = 3;
const bestAnswersValue = 4;
const firstAnwersValue = 5;
const firstIn15AnwersValue = 6;
const nextUniqueRatingAch = 33;
const nextRatingAchId = 42;
const nextQuestionAskedAchId = 2;
const nextAnswerGivenAchId = 11;
const nextAnswerBestAchId = 22;
const nextAnswerFirstAchId = 60;
const nextAnswerFirstIn15AchId = 52;

const nextUserAchievements = {
  [ratingRelated]: nextRatingAchId,
  [uniqueRatingRelated]: nextUniqueRatingAch,
  [questionAskedRelated]: nextQuestionAskedAchId,
  [answerGivenRelated]: nextAnswerGivenAchId,
  [bestAnswerRelated]: nextAnswerBestAchId,
  [firstAnswerRelated]: nextAnswerFirstAchId,
  [firstAnswerIn15Related]: nextAnswerFirstIn15AchId,
};

const userProgressValues = {
  [ratingRelated]: userRating,
  [questionAskedRelated]: questionsAskedValue,
  [answerGivenRelated]: answersGivenValue,
  [bestAnswerRelated]: bestAnswersValue,
  [firstAnswerIn15Related]: firstIn15AnwersValue,
  [firstAnswerRelated]: firstAnwersValue,
};

const memorizedAchievData = {
  nextUserAchievements,
  userProgressValues,
  userAchievements: cachedUserAchievements,
  projectAchievements,
  profileInfo,
};

describe('getUserAchievementsWorker', () => {
  const generator = cloneableGenerator(getUserAchievementsWorker)();
  let clone = null;

  describe('should handle errors in catch block', () => {
    clone = generator.clone();

    it('should dispatch getUserAchievementsErr action', () => {
      select.mockImplementation(() => {
        throw new Error(error);
      });
      clone.next();
      expect(put).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: GET_USER_ACHIEVEMENTS_ERROR,
        }),
      );
    });

    it('should set userAchievementLoading false', () => {
      clone.next();
      expect(put).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: USER_ACHIEVEMENTS_LOADING,
          loading: false,
        }),
      );
    });

    it('should finish work', () => {
      expect(clone.next().done).toBe(true);
    });
  });

  describe('should execute the main script', () => {
    it('should select viewProfileAccount', () => {
      select.mockImplementation(() => 'userAccount');
      expect(generator.next().value).toBe('userAccount');
    });

    it('should select profileInfo', () => {
      select.mockImplementation(() => ({}));
      expect(generator.next(viewProfileAccount).value).toEqual({});
    });

    it('should select maxGroupsLowerValues', () => {
      select.mockImplementation(() => ({}));
      expect(generator.next(profileInfo).value).toEqual({});
      clone = generator.clone();
    });

    it('should handle empty maxGroupsLowerValues -> get maxGroupsLowerValues', () => {
      call.mockImplementation(fn => fn());
      clone.next(emptyMaxGroupsLowerValues);
      expect(call).toBeCalledWith(getMaxGroupsLowerValues);
    });

    it('should handle empty maxGroupsLowerValues -> put maxGroupsLowerValues to the store', () => {
      clone.next();
      expect(put).toBeCalledWith(
        expect.objectContaining({ type: SET_MAX_GROUPS_LOWER_VALUES }),
      );
    });

    it('should select memorizedUserAchievements', () => {
      select.mockImplementation(() => ({}));
      expect(generator.next(maxGroupsLowerValues).value).toEqual({});
    });

    it('should get profileInfoUpdated value', () => {
      call.mockImplementation((fn, ...args) => fn(...args));
      generator.next(memorizedUserAchievements);
      expect(call).toBeCalledWith(
        isProfileInfoUpdated,
        profileInfo,
        memorizedUserAchievements.profileInfo,
        maxGroupsLowerValues,
      );
      clone = generator.clone();
    });

    describe('should handle stored memorizedUserAchievements', () => {
      it('should set memorizedUserAchievements to the store', () => {
        put.mockImplementation(() => {});
        clone.next(profileInfoUpdatedFalse);
        expect(put).toBeCalledWith(
          expect.objectContaining({ type: GET_USER_ACHIEVEMENTS_SUCCESS }),
        );
      });

      it('finish work', () => {
        expect(clone.next().done).toBe(true);
      });
    });

    describe('should update user achievements', () => {
      it('should select eos', () => {
        select.mockImplementation(() => eos);
        expect(generator.next(profileInfoUpdatedTrue).value).toEqual(eos);
      });

      it('should select cached user achievements', () => {
        select.mockImplementation(() => cachedUserAchievements);
        expect(generator.next(eos).value).toEqual(cachedUserAchievements);
        clone = generator.clone();
      });

      it('should handle empty cachedUserAchievements -> get user achievements', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        clone.next(undefined);
        expect(call).toBeCalledWith(
          getAchievements,
          eos,
          USER_ACHIEVEMENTS_TABLE,
          viewProfileAccount,
        );
      });

      it('should handle empty cachedUserAchievements -> update cached user achievements', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        clone.next(cachedUserAchievements);
        expect(call).toBeCalledWith(
          updateUserAchievementsWorker,
          viewProfileAccount,
          {
            updatedAchievements: cachedUserAchievements,
            updateRender: false,
          },
        );
      });

      it('should get all project achievements', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(cachedUserAchievements);
        expect(call).toBeCalledWith(
          getAchievements,
          eos,
          PROJECT_ACHIEVEMENTS_TABLE,
          ALL_ACHIEVEMENTS_SCOPE,
        );
      });

      it('should select user rating', () => {
        select.mockImplementation(() => userRating);
        expect(generator.next(projectAchievements).value).toEqual(userRating);
      });

      it('should select user questionsAskedValue', () => {
        select.mockImplementation(() => questionsAskedValue);
        expect(generator.next(userRating).value).toEqual(questionsAskedValue);
      });

      it('should select user answersGivenValue', () => {
        select.mockImplementation(() => answersGivenValue);
        expect(generator.next(questionsAskedValue).value).toEqual(
          answersGivenValue,
        );
      });

      it('should select user bestAnswersValue', () => {
        select.mockImplementation(() => bestAnswersValue);
        expect(generator.next(answersGivenValue).value).toEqual(
          bestAnswersValue,
        );
      });

      it('should select user firstAnwersValue', () => {
        select.mockImplementation(() => firstAnwersValue);
        expect(generator.next(bestAnswersValue).value).toEqual(
          firstAnwersValue,
        );
      });

      it('should select user firstIn15AnwersValue', () => {
        select.mockImplementation(() => firstIn15AnwersValue);
        expect(generator.next(firstAnwersValue).value).toEqual(
          firstIn15AnwersValue,
        );
      });

      it('should get user nextUniqueRatingAch', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(firstIn15AnwersValue);
        expect(call).toHaveBeenLastCalledWith(
          getNextUniqueAchievementId,
          userRating,
          cachedUserAchievements,
          projectAchievements,
        );
      });

      it('should get user nextRatingAchId', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(nextUniqueRatingAch);
        expect(call).toHaveBeenLastCalledWith(
          getNextAchievementId,
          userRating,
          cachedUserAchievements,
          achievementsArr,
        );
      });

      it('should get user nextQuestionAskedAchId', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(nextRatingAchId);
        expect(call).toHaveBeenLastCalledWith(
          getNextAchievementId,
          questionsAskedValue,
          cachedUserAchievements,
          questionsAskedArr,
        );
      });

      it('should get user nextAnswerGivenAchId', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(nextQuestionAskedAchId);
        expect(call).toHaveBeenLastCalledWith(
          getNextAchievementId,
          answersGivenValue,
          cachedUserAchievements,
          answerGivenArr,
        );
      });

      it('should get user nextAnswerBestAchId', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(nextAnswerGivenAchId);
        expect(call).toHaveBeenLastCalledWith(
          getNextAchievementId,
          bestAnswersValue,
          cachedUserAchievements,
          bestAnswerArr,
        );
      });

      it('should get user nextAnswerFirstAchId', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(nextAnswerBestAchId);
        expect(call).toHaveBeenLastCalledWith(
          getNextAchievementId,
          firstAnwersValue,
          cachedUserAchievements,
          firstAnswerArr,
        );
      });

      it('should get user nextAnswerFirstIn15AchId', () => {
        call.mockImplementation((fn, ...args) => fn(...args));
        generator.next(nextAnswerFirstAchId);
        expect(call).toHaveBeenLastCalledWith(
          getNextAchievementId,
          firstIn15AnwersValue,
          cachedUserAchievements,
          firstIn15Arr,
        );
      });

      it('should dispatch getUserAchievementsSuccess action', () => {
        generator.next(nextAnswerFirstIn15AchId);
        expect(put).toHaveBeenLastCalledWith(
          expect.objectContaining({
            type: GET_USER_ACHIEVEMENTS_SUCCESS,
            userAchievements: cachedUserAchievements,
            projectAchievements,
            nextUserAchievements,
            userProgressValues,
          }),
        );
      });

      it('should set user achievements data to the store', () => {
        generator.next();
        expect(put).toHaveBeenLastCalledWith(
          expect.objectContaining({
            type: SET_MEMORIZED_ACHIEV_DATA,
            viewProfileAccount,
            memorizedAchievData,
          }),
        );
      });

      it('should finish work', () => {
        expect(generator.next().done).toBe(true);
      });
    });
  });
});

const updatedAccount = 'updated account';
const notUpdatedAchievements = [];
const updatedAchievements = [2];

describe('updateUserAchievementsWorker', () => {
  const generator = cloneableGenerator(updateUserAchievementsWorker)(
    updatedAccount,
    { updateRender: true },
  );

  let clone = null;

  describe('should handle errors', () => {
    clone = generator.clone();

    it('should dispatch getUserAchievementsErr action', () => {
      select.mockImplementation(() => {
        throw new Error(error);
      });
      clone.next();
      expect(put).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: GET_USER_ACHIEVEMENTS_ERROR,
        }),
      );
    });

    it('should finish work', () => {
      expect(clone.next().done).toBe(true);
    });
  });

  describe('should execute the main script', () => {
    it('should select eos', () => {
      select.mockImplementation(() => eos);
      expect(generator.next().value).toEqual(eos);
    });

    it('should handle not defined updatedAchievements -> get user achievements', () => {
      generator.next(eos);
      expect(call).toHaveBeenLastCalledWith(
        getAchievements,
        eos,
        USER_ACHIEVEMENTS_TABLE,
        updatedAccount,
      );

      clone = generator.clone();
    });

    describe('should handle not updated achievements', () => {
      it('should select cached user achievements', () => {
        select.mockImplementation(() => cachedUserAchievements);
        expect(clone.next(notUpdatedAchievements).value).toEqual(
          cachedUserAchievements,
        );
      });

      it('should finish work', () => {
        expect(clone.next(cachedUserAchievements).done).toBe(true);
      });
    });

    describe('should handle updated achievements', () => {
      it('should select cached user achievements', () => {
        select.mockImplementation(() => cachedUserAchievements);
        expect(generator.next(updatedAchievements).value).toEqual(
          cachedUserAchievements,
        );
      });

      it('should update user achievements in DataCacheProvider', () => {
        generator.next(cachedUserAchievements);
        expect(put).toHaveBeenCalledWith({
          type: UPDATE_USER_ACHIEVEMENTS,
          userForUpdate: updatedAccount,
          updatedAchCount: updatedAchievements,
        });
      });

      it('should select viewProfileAccount', () => {
        select.mockImplementation(() => 'userAccount');
        expect(generator.next().value).toBe('userAccount');

        clone = generator.clone();
      });

      it('should update render if updated user achievements are  currently displayed', () => {
        clone.next(updatedAccount);
        expect(put).toHaveBeenCalledWith({
          type: GET_USER_ACHIEVEMENTS,
        });
      });

      it('generator should finish word after update', () => {
        expect(clone.next().done).toBe(true);
      });

      it('main script generator should finish work', () => {
        expect(generator.next().done).toBe(true);
      });
    });
  });
});
