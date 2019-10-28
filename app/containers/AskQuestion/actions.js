/*
 *
 * AskQuestion actions
 *
 */

import {
  REDIRECT_TO_ASK_QUESTION_PAGE,
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from './constants';

export function redirectToAskQuestionPage(ev) {
  return {
    type: REDIRECT_TO_ASK_QUESTION_PAGE,
    buttonId: ev.currentTarget.id,
  };
}

export function askQuestion(val) {
  return {
    type: ASK_QUESTION,
    val: val.toJS(),
  };
}

export function askQuestionSuccess() {
  return {
    type: ASK_QUESTION_SUCCESS,
  };
}

export function askQuestionError(questionError) {
  return {
    type: ASK_QUESTION_ERROR,
    questionError,
  };
}
