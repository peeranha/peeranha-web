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
  GET_EXISTING_QUESTIONS_SUCCESS,
  GET_EXISTING_QUESTIONS,
  GET_EXISTING_QUESTIONS_ERROR,
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

export function askQuestionSuccess(id) {
  return {
    type: ASK_QUESTION_SUCCESS,
    id,
  };
}

export function askQuestionError(questionError) {
  return {
    type: ASK_QUESTION_ERROR,
    questionError,
  };
}

export function getExistingQuestion(query) {
  return {
    type: GET_EXISTING_QUESTIONS,
    query,
  };
}

export function getExistingQuestionSuccess(existingQuestions) {
  return {
    type: GET_EXISTING_QUESTIONS_SUCCESS,
    existingQuestions,
  };
}

export function getExistingQuestionError(getExistingQuestionsError) {
  return {
    type: GET_EXISTING_QUESTIONS_ERROR,
    getExistingQuestionsError,
  };
}
