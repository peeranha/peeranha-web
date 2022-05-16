import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
  getUniqQuestions,
} from '../actions';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_UNIQ_QUESTIONS,
} from '../constants';

describe('actions', () => {
  describe('getQuestions Action', () => {
    it('GET_QUESTIONS', () => {
      const limit = 'limit';
      const skip = 'offset';
      const postTypes = 'communityIdFilter';
      const communityIdFilter = 'parentPage';
      const parentPage = 'fetcher';
      const next = 'next';
      const toUpdateQuestions = undefined;
      const isNotUpdatePromotedQuestions = undefined;

      const expected = {
        type: GET_QUESTIONS,
        limit,
        skip,
        postTypes,
        communityIdFilter,
        parentPage,
        next,
        toUpdateQuestions,
        isNotUpdatePromotedQuestions,
      };

      expect(
        getQuestions(
          limit,
          skip,
          postTypes,
          communityIdFilter,
          parentPage,
          next,
          toUpdateQuestions,
          isNotUpdatePromotedQuestions,
        ),
      ).toEqual(expected);
    });
  });

  describe('getQuestionsSuccess Action', () => {
    it('GET_QUESTIONS_SUCCESS', () => {
      const questionsList = 'questionsList';
      const next = 'next';
      const toUpdateQuestions = undefined;
      const questionFilter = 0;
      const promotedQuestions = undefined;

      const expected = {
        type: GET_QUESTIONS_SUCCESS,
        questionsList,
        next,
        toUpdateQuestions,
        questionFilter,
        promotedQuestions,
      };

      expect(
        getQuestionsSuccess(
          questionsList,
          next,
          toUpdateQuestions,
          questionFilter,
          promotedQuestions,
        ),
      ).toEqual(expected);
    });
  });

  describe('getQuestionsError Action', () => {
    it('GET_QUESTIONS_ERROR', () => {
      const questionsError = 'questionsError';

      const expected = {
        type: GET_QUESTIONS_ERROR,
        questionsError,
      };

      expect(getQuestionsError(questionsError)).toEqual(expected);
    });
  });

  describe('getUniqQuestions Action', () => {
    it('GET_UNIQ_QUESTIONS', () => {
      const questionsList = 'questionsList';

      const expected = {
        type: GET_UNIQ_QUESTIONS,
        questionsList,
      };

      expect(getUniqQuestions(questionsList)).toEqual(expected);
    });
  });
});
