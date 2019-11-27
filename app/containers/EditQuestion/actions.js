/*
 *
 * EditQuestion actions
 *
 */

import {
  GET_ASKED_QUESTION,
  GET_ASKED_QUESTION_SUCCESS,
  GET_ASKED_QUESTION_ERROR,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
} from './constants';

export function getAskedQuestion(questionId) {
  return {
    type: GET_ASKED_QUESTION,
    questionId,
  };
}

export function getAskedQuestionSuccess(question) {
  return {
    type: GET_ASKED_QUESTION_SUCCESS,
    question,
  };
}

export function getAskedQuestionErr(getAskedQuestionError) {
  return {
    type: GET_ASKED_QUESTION_ERROR,
    getAskedQuestionError,
  };
}

export function editQuestion(question, questionId) {
  return {
    type: EDIT_QUESTION,
    question,
    questionId,
  };
}

export function editQuestionSuccess(questionData) {
  return {
    type: EDIT_QUESTION_SUCCESS,
    questionData,
  };
}

export function editQuestionErr(editQuestionError) {
  return {
    type: EDIT_QUESTION_ERROR,
    editQuestionError,
  };
}
