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
      const offset = 'offset';
      const communityIdFilter = 'communityIdFilter';
      const parentPage = 'parentPage';
      const fetcher = 'fetcher';
      const next = 'next';

      const expected = {
        type: GET_QUESTIONS,
        limit,
        offset,
        communityIdFilter,
        parentPage,
        fetcher,
        next,
      };

      expect(
        getQuestions(
          limit,
          offset,
          communityIdFilter,
          parentPage,
          fetcher,
          next,
        ),
      ).toEqual(expected);
    });
  });

  describe('getQuestionsSuccess Action', () => {
    it('GET_QUESTIONS_SUCCESS', () => {
      const questionsList = 'questionsList';
      const next = 'next';

      const expected = {
        type: GET_QUESTIONS_SUCCESS,
        questionsList,
        next,
      };

      expect(getQuestionsSuccess(questionsList, next)).toEqual(expected);
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
