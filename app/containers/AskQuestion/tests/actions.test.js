import { fromJS } from 'immutable';

import {
  askQuestion,
  askQuestionSuccess,
  askQuestionError,
  redirectToAskQuestionPage,
} from '../actions';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
  REDIRECT_TO_ASK_QUESTION_PAGE,
} from '../constants';

describe('AskQuestions actions', () => {
  it('redirectToAskQuestionPage', () => {
    const ev = { currentTarget: { id: 1 } };
    const expected = {
      type: REDIRECT_TO_ASK_QUESTION_PAGE,
      buttonId: ev.currentTarget.id,
    };

    expect(redirectToAskQuestionPage(ev)).toEqual(expected);
  });

  it('ASK_QUESTION', () => {
    const val = fromJS({});
    const expected = {
      type: ASK_QUESTION,
      val: val.toJS(),
    };
    expect(askQuestion(val)).toEqual(expected);
  });

  it('ASK_QUESTION_SUCCESS', () => {
    const expected = {
      type: ASK_QUESTION_SUCCESS,
    };
    expect(askQuestionSuccess()).toEqual(expected);
  });

  it('ASK_QUESTION_ERROR', () => {
    const questionError = 'questionError';
    const expected = {
      type: ASK_QUESTION_ERROR,
      questionError,
    };
    expect(askQuestionError(questionError)).toEqual(expected);
  });
});
