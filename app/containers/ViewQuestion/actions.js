/*
 *
 * ViewQuestion actions
 *
 */

import {
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_SUCCESS,
  GET_QUESTION_DATA_ERROR,
  POST_ANSWER,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
} from './constants';

export function getQuestionData(questionId) {
  return {
    type: GET_QUESTION_DATA,
    questionId,
  };
}

export function getQuestionDataSuccess(questionData) {
  return {
    type: GET_QUESTION_DATA_SUCCESS,
    questionData,
  };
}

export function getQuestionDataErr(getQuestionDataError) {
  return {
    type: GET_QUESTION_DATA_ERROR,
    getQuestionDataError,
  };
}

export function postAnswer(user, questionId, answer) {
  return {
    type: POST_ANSWER,
    user,
    questionId,
    answer,
  };
}

export function postAnswerSuccess() {
  return {
    type: POST_ANSWER_SUCCESS,
  };
}

export function postAnswerErr(postAnswerError) {
  return {
    type: POST_ANSWER_ERROR,
    postAnswerError,
  };
}

export function postComment(user, questionId, answerId, comment) {
  return {
    type: POST_COMMENT,
    user,
    questionId,
    answerId,
    comment,
  };
}

export function postCommentSuccess() {
  return {
    type: POST_COMMENT_SUCCESS,
  };
}

export function postCommentErr(postCommentError) {
  return {
    type: POST_COMMENT_ERROR,
    postCommentError,
  };
}
