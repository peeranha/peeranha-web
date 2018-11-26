/*
 *
 * ViewQuestion actions
 *
 */

import {
  TOGGLE_COMMENT_VISION,
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_SUCCESS,
  GET_QUESTION_DATA_ERROR,
  POST_ANSWER,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  UP_VOTE,
  UP_VOTE_SUCCESS,
  UP_VOTE_ERROR,
  DOWN_VOTE,
  DOWN_VOTE_SUCCESS,
  DOWN_VOTE_ERROR,
  MARK_AS_ACCEPTED,
  MARK_AS_ACCEPTED_SUCCESS,
  MARK_AS_ACCEPTED_ERROR,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  DELETE_ANSWER,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  SAVE_COMMENT,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_ERROR,
} from './constants';

export function toggleCommentVision(editComment) {
  return {
    type: TOGGLE_COMMENT_VISION,
    editComment,
  };
}

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

export function deleteQuestion(user, questionid, postButtonId) {
  return {
    type: DELETE_QUESTION,
    user,
    questionid,
    postButtonId,
  };
}

export function deleteQuestionSuccess() {
  return {
    type: DELETE_QUESTION_SUCCESS,
  };
}

export function deleteQuestionErr(deleteQuestionError) {
  return {
    type: DELETE_QUESTION_ERROR,
    deleteQuestionError,
  };
}

export function deleteAnswer(user, questionid, answerid, postButtonId) {
  return {
    type: DELETE_ANSWER,
    user,
    questionid,
    answerid,
    postButtonId,
  };
}

export function deleteAnswerSuccess(questionData) {
  return {
    type: DELETE_ANSWER_SUCCESS,
    questionData,
  };
}

export function deleteAnswerErr(deleteAnswerError) {
  return {
    type: DELETE_ANSWER_ERROR,
    deleteAnswerError,
  };
}

export function deleteComment(user, questionId, answerId, commentId, buttonId) {
  return {
    type: DELETE_COMMENT,
    user,
    questionId,
    answerId,
    commentId,
    buttonId,
  };
}

export function deleteCommentSuccess(questionData) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    questionData,
  };
}

export function deleteCommentErr(deleteCommentError) {
  return {
    type: DELETE_COMMENT_ERROR,
    deleteCommentError,
  };
}

export function saveComment(user, questionId, answerId, commentId, comment) {
  return {
    type: SAVE_COMMENT,
    user,
    questionId,
    answerId,
    commentId,
    comment,
  };
}

export function saveCommentSuccess(questionData) {
  return {
    type: SAVE_COMMENT_SUCCESS,
    questionData,
  };
}

export function saveCommentErr(saveCommentError) {
  return {
    type: SAVE_COMMENT_ERROR,
    saveCommentError,
  };
}

export function postAnswer(
  user,
  questionId,
  answer,
  reset,
  postButtonId,
  translations,
) {
  return {
    type: POST_ANSWER,
    user,
    questionId,
    answer,
    reset,
    postButtonId,
    translations,
  };
}

export function postAnswerSuccess(questionData) {
  return {
    type: POST_ANSWER_SUCCESS,
    questionData,
  };
}

export function postAnswerErr(postAnswerError) {
  return {
    type: POST_ANSWER_ERROR,
    postAnswerError,
  };
}

export function postComment(
  user,
  questionId,
  answerId,
  comment,
  reset,
  postButtonId,
  translations,
) {
  return {
    type: POST_COMMENT,
    user,
    questionId,
    answerId,
    comment,
    reset,
    postButtonId,
    translations,
  };
}

export function postCommentSuccess(questionData) {
  return {
    type: POST_COMMENT_SUCCESS,
    questionData,
  };
}

export function postCommentErr(postCommentError) {
  return {
    type: POST_COMMENT_ERROR,
    postCommentError,
  };
}

export function upVote(user, questionId, answerId, postButtonId, translations) {
  return {
    type: UP_VOTE,
    user,
    questionId,
    answerId,
    postButtonId,
    translations,
  };
}

export function upVoteSuccess(questionData) {
  return {
    type: UP_VOTE_SUCCESS,
    questionData,
  };
}

export function upVoteErr(upVoteError) {
  return {
    type: UP_VOTE_ERROR,
    upVoteError,
  };
}

export function downVote(
  user,
  questionId,
  answerId,
  postButtonId,
  translations,
) {
  return {
    type: DOWN_VOTE,
    user,
    questionId,
    answerId,
    postButtonId,
    translations,
  };
}

export function downVoteSuccess(questionData) {
  return {
    type: DOWN_VOTE_SUCCESS,
    questionData,
  };
}

export function downVoteErr(downVoteError) {
  return {
    type: DOWN_VOTE_ERROR,
    downVoteError,
  };
}

export function markAsAccepted(
  user,
  questionId,
  correctAnswerId,
  postButtonId,
  translations,
) {
  return {
    type: MARK_AS_ACCEPTED,
    user,
    questionId,
    correctAnswerId,
    postButtonId,
    translations,
  };
}

export function markAsAcceptedSuccess(questionData) {
  return {
    type: MARK_AS_ACCEPTED_SUCCESS,
    questionData,
  };
}

export function markAsAcceptedErr(markAsAcceptedError) {
  return {
    type: MARK_AS_ACCEPTED_ERROR,
    markAsAcceptedError,
  };
}
