import { askQuestion, askQuestionSuccess, askQuestionError } from '../actions';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from '../constants';

describe('AskQuestions actions', () => {
  describe('askQuestion Action', () => {
    it('has a type of ASK_QUESTION', () => {
      const user = 'user';
      const questionData = { user };
      const expected = {
        type: ASK_QUESTION,
        user,
        questionData,
      };
      expect(askQuestion(user, questionData)).toEqual(expected);
    });

    it('has a type of ASK_QUESTION_SUCCESS', () => {
      const expected = {
        type: ASK_QUESTION_SUCCESS,
      };
      expect(askQuestionSuccess()).toEqual(expected);
    });

    it('has a type of ASK_QUESTION_ERROR', () => {
      const questionError = 'questionError';
      const expected = {
        type: ASK_QUESTION_ERROR,
        questionError,
      };
      expect(askQuestionError(questionError)).toEqual(expected);
    });
  });
});
