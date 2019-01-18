import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
  setDefaultReducer,
} from '../actions';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
} from '../constants';

describe('actions', () => {
  describe('getQuestions Action', () => {
    it('GET_QUESTIONS', () => {
      const limit = 'limit';
      const offset = 'offset';
      const communityIdFilter = 'communityIdFilter';
      const parentPage = 'parentPage';
      const next = 'next';

      const expected = {
        type: GET_QUESTIONS,
        limit,
        offset,
        communityIdFilter,
        parentPage,
        next,
      };

      expect(
        getQuestions(limit, offset, communityIdFilter, parentPage, next),
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

  describe('setDefaultReducer Action', () => {
    it('GET_NEXT_QUESTIONS_ERROR', () => {
      const expected = {
        type: SET_DEFAULT_REDUCER,
      };

      expect(setDefaultReducer()).toEqual(expected);
    });
  });
});
