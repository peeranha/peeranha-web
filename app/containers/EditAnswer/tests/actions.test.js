import {
  getAnswer,
  getAnswerSuccess,
  getAnswerErr,
  editAnswer,
  editAnswerSuccess,
  editAnswerErr,
} from '../actions';

import {
  GET_ANSWER,
  GET_ANSWER_SUCCESS,
  GET_ANSWER_ERROR,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
} from '../constants';

describe('getAnswer actions', () => {
  describe('getAnswer Action', () => {
    it('GET_ANSWER', () => {
      const questionId = 'questionId';
      const answerId = 'answerId';
      const expected = {
        type: GET_ANSWER,
        questionId,
        answerId,
      };

      expect(getAnswer(questionId, answerId)).toEqual(expected);
    });
  });

  describe('getAnswerSuccess Action', () => {
    it('GET_ANSWER_SUCCESS', () => {
      const answer = 'answer';
      const expected = {
        type: GET_ANSWER_SUCCESS,
        answer,
      };

      expect(getAnswerSuccess(answer)).toEqual(expected);
    });
  });

  describe('getAnswerErr Action', () => {
    it('GET_ANSWER_ERROR', () => {
      const getAnswerError = 'getAnswerError';
      const expected = {
        type: GET_ANSWER_ERROR,
        getAnswerError,
      };

      expect(getAnswerErr(getAnswerError)).toEqual(expected);
    });
  });

  describe('editAnswer Action', () => {
    it('EDIT_ANSWER', () => {
      const answer = 'answer';
      const questionId = 'questionId';
      const answerId = 'answerId';

      const expected = {
        type: EDIT_ANSWER,
        questionId,
        answerId,
        answer,
      };

      expect(editAnswer(answer, questionId, answerId)).toEqual(expected);
    });
  });

  describe('editAnswerSuccess Action', () => {
    it('EDIT_ANSWER_SUCCESS', () => {
      const answer = 'answer';
      const expected = {
        type: EDIT_ANSWER_SUCCESS,
        answer,
      };

      expect(editAnswerSuccess(answer)).toEqual(expected);
    });
  });

  describe('editAnswerErr Action', () => {
    it('EDIT_ANSWER_ERROR', () => {
      const editAnswerError = 'editAnswerError';
      const expected = {
        type: EDIT_ANSWER_ERROR,
        editAnswerError,
      };

      expect(editAnswerErr(editAnswerError)).toEqual(expected);
    });
  });
});
