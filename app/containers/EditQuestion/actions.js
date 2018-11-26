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

export function getAskedQuestion(user, link, questionid) {
  return {
    type: GET_ASKED_QUESTION,
    user,
    link,
    questionid,
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

export function editQuestion(user, question, questionid) {
  return {
    type: EDIT_QUESTION,
    user,
    question,
    questionid,
  };
}

export function editQuestionSuccess() {
  return {
    type: EDIT_QUESTION_SUCCESS,
  };
}

export function editQuestionErr(editQuestionError) {
  return {
    type: EDIT_QUESTION_ERROR,
    editQuestionError,
  };
}
