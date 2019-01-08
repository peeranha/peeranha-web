import {
  getInitQuestions,
  getInitQuestionsSuccess,
  getInitQuestionsError,
  getNextQuestions,
  getNextQuestionsSuccess,
  getNextQuestionsError,
  setDefaultReducer,
} from '../actions';

import {
  GET_INIT_QUESTIONS,
  GET_INIT_QUESTIONS_SUCCESS,
  GET_INIT_QUESTIONS_ERROR,
  GET_NEXT_QUESTIONS,
  GET_NEXT_QUESTIONS_SUCCESS,
  GET_NEXT_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
} from '../constants';

describe('actions', () => {
  describe('getInitQuestions Action', () => {
    it('GET_INIT_QUESTIONS', () => {
      const limit = 'limit';
      const offset = 'offset';
      const communityIdFilter = 'communityIdFilter';

      const expected = {
        type: GET_INIT_QUESTIONS,
        limit,
        offset,
        communityIdFilter,
      };

      expect(getInitQuestions(limit, offset, communityIdFilter)).toEqual(
        expected,
      );
    });
  });

  describe('getInitQuestionsSuccess Action', () => {
    it('GET_INIT_QUESTIONS_SUCCESS', () => {
      const questionsList = 'questionsList';

      const expected = {
        type: GET_INIT_QUESTIONS_SUCCESS,
        questionsList,
      };

      expect(getInitQuestionsSuccess(questionsList)).toEqual(expected);
    });
  });

  describe('getInitQuestionsError Action', () => {
    it('GET_INIT_QUESTIONS_ERROR', () => {
      const questionsError = 'questionsError';

      const expected = {
        type: GET_INIT_QUESTIONS_ERROR,
        questionsError,
      };

      expect(getInitQuestionsError(questionsError)).toEqual(expected);
    });
  });

  describe('getNextQuestions Action', () => {
    it('GET_NEXT_QUESTIONS', () => {
      const limit = 'limit';
      const offset = 'offset';
      const communityIdFilter = 'communityIdFilter';

      const expected = {
        type: GET_NEXT_QUESTIONS,
        limit,
        offset,
        communityIdFilter,
      };

      expect(getNextQuestions(limit, offset, communityIdFilter)).toEqual(
        expected,
      );
    });
  });

  describe('getNextQuestionsSuccess Action', () => {
    it('GET_NEXT_QUESTIONS_SUCCESS', () => {
      const questionsList = 'questionsList';

      const expected = {
        type: GET_NEXT_QUESTIONS_SUCCESS,
        questionsList,
      };

      expect(getNextQuestionsSuccess(questionsList)).toEqual(expected);
    });
  });

  describe('getNextQuestionsError Action', () => {
    it('GET_NEXT_QUESTIONS_ERROR', () => {
      const questionsError = 'questionsError';

      const expected = {
        type: GET_NEXT_QUESTIONS_ERROR,
        questionsError,
      };

      expect(getNextQuestionsError(questionsError)).toEqual(expected);
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
