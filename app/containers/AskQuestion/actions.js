/*
 *
 * AskQuestion actions
 *
 */

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from './constants';

export function askQuestion(user, questionData) {
  return {
    type: ASK_QUESTION,
    user,
    questionData,
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
