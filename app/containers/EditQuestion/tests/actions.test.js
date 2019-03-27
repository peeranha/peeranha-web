import {
  getAskedQuestion,
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestion,
  editQuestionSuccess,
  editQuestionErr,
} from '../actions';

import {
  GET_ASKED_QUESTION,
  GET_ASKED_QUESTION_SUCCESS,
  GET_ASKED_QUESTION_ERROR,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
} from '../constants';

describe('actions', () => {
  describe('getAskedQuestion Action', () => {
    it('GET_ASKED_QUESTION', () => {
      const questionId = 'questionId';
      const expected = {
        type: GET_ASKED_QUESTION,
        questionId,
      };

      expect(getAskedQuestion(questionId)).toEqual(expected);
    });
  });

  describe('getAskedQuestionSuccess Action', () => {
    it('GET_ASKED_QUESTION_SUCCESS', () => {
      const question = 'question';
      const expected = {
        type: GET_ASKED_QUESTION_SUCCESS,
        question,
      };

      expect(getAskedQuestionSuccess(question)).toEqual(expected);
    });
  });

  describe('getAskedQuestionErr Action', () => {
    it('GET_ASKED_QUESTION_ERROR', () => {
      const getAskedQuestionError = 'getAskedQuestionError';
      const expected = {
        type: GET_ASKED_QUESTION_ERROR,
        getAskedQuestionError,
      };

      expect(getAskedQuestionErr(getAskedQuestionError)).toEqual(expected);
    });
  });

  describe('editQuestion Action', () => {
    it('EDIT_QUESTION', () => {
      const question = 'question';
      const questionId = 'questionId';

      const expected = {
        type: EDIT_QUESTION,
        questionId,
        question,
      };

      expect(editQuestion(question, questionId)).toEqual(expected);
    });
  });

  describe('editQuestionSuccess Action', () => {
    it('EDIT_QUESTION_SUCCESS', () => {
      const expected = {
        type: EDIT_QUESTION_SUCCESS,
      };

      expect(editQuestionSuccess()).toEqual(expected);
    });
  });

  describe('editQuestionErr Action', () => {
    it('EDIT_QUESTION_ERROR', () => {
      const editQuestionError = 'editQuestionError';
      const expected = {
        type: EDIT_QUESTION_ERROR,
        editQuestionError,
      };

      expect(editQuestionErr(editQuestionError)).toEqual(expected);
    });
  });
});
