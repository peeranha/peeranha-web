import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

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
  VOTE_TO_DELETE,
  VOTE_TO_DELETE_SUCCESS,
  VOTE_TO_DELETE_ERROR,
  RESET_STORE,
  TEXTAREA_COMMENT_FORM,
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

export function deleteQuestion(questionId, ev) {
  return {
    type: DELETE_QUESTION,
    questionId,
    postButtonId: ev.currentTarget.id,
  };
}

export function deleteQuestionSuccess(questionData) {
  return {
    type: DELETE_QUESTION_SUCCESS,
    questionData,
  };
}

export function deleteQuestionErr(deleteQuestionError) {
  return {
    type: DELETE_QUESTION_ERROR,
    deleteQuestionError,
  };
}

export function deleteAnswer(questionId, ev) {
  return {
    type: DELETE_ANSWER,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    postButtonId: ev.currentTarget.id,
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

export function deleteComment(questionId, ev) {
  return {
    type: DELETE_COMMENT,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    commentId: ev.currentTarget.dataset.commentid,
    buttonId: ev.currentTarget.id,
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

export function saveComment(questionId, ...args) {
  const { commentId, answerId, toggleView } = args[2];

  return {
    type: SAVE_COMMENT,
    questionId,
    answerId,
    commentId,
    comment: args[0].get(TEXTAREA_COMMENT_FORM),
    toggleView,
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

export function postAnswer(questionId, ...args) {
  return {
    type: POST_ANSWER,
    questionId,
    answer: args[0].get(TEXT_EDITOR_ANSWER_FORM),
    reset: args[2].reset,
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

export function postComment(questionId, ...args) {
  return {
    type: POST_COMMENT,
    questionId,
    answerId: args[2].answerId,
    comment: args[0].get(TEXTAREA_COMMENT_FORM),
    reset: args[2].reset,
    toggleView: args[2].toggleView,
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

export function upVote(questionId, ev) {
  return {
    type: UP_VOTE,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    postButtonId: ev.currentTarget.id,
    whoWasUpvoted: ev.currentTarget.dataset.whowasupvoted,
  };
}

export function upVoteSuccess(questionData, usersForUpdate) {
  return {
    type: UP_VOTE_SUCCESS,
    questionData,
    usersForUpdate,
  };
}

export function upVoteErr(upVoteError) {
  return {
    type: UP_VOTE_ERROR,
    upVoteError,
  };
}

export function downVote(questionId, ev) {
  return {
    type: DOWN_VOTE,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    postButtonId: ev.currentTarget.id,
    whoWasDownvoted: ev.currentTarget.dataset.whowasdownvoted,
  };
}

export function downVoteSuccess(questionData, usersForUpdate) {
  return {
    type: DOWN_VOTE_SUCCESS,
    questionData,
    usersForUpdate,
  };
}

export function downVoteErr(downVoteError) {
  return {
    type: DOWN_VOTE_ERROR,
    downVoteError,
  };
}

export function markAsAccepted(questionId, ev) {
  return {
    type: MARK_AS_ACCEPTED,
    questionId,
    correctAnswerId: ev.currentTarget.dataset.answerid,
    postButtonId: ev.currentTarget.id,
    whoWasAccepted: ev.currentTarget.dataset.whowasaccepted,
  };
}

export function markAsAcceptedSuccess(questionData, usersForUpdate) {
  return {
    type: MARK_AS_ACCEPTED_SUCCESS,
    questionData,
    usersForUpdate,
  };
}

export function markAsAcceptedErr(markAsAcceptedError) {
  return {
    type: MARK_AS_ACCEPTED_ERROR,
    markAsAcceptedError,
  };
}

export function voteToDelete(questionId, ev) {
  return {
    type: VOTE_TO_DELETE,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    commentId: ev.currentTarget.dataset.commentid,
    postButtonId: ev.currentTarget.id,
    whoWasVoted: ev.currentTarget.dataset.whowasvoted,
  };
}

export function voteToDeleteSuccess(questionData, usersForUpdate) {
  return {
    type: VOTE_TO_DELETE_SUCCESS,
    questionData,
    usersForUpdate,
  };
}

export function voteToDeleteErr(voteToDeleteError) {
  return {
    type: VOTE_TO_DELETE_ERROR,
    voteToDeleteError,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}
