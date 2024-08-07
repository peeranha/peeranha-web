import { ANSWER_TYPE_FORM, TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

import {
  CHANGE_QUESTION_TYPE_ERROR,
  CHANGE_QUESTION_TYPE_SUCCESS,
  DELETE_ANSWER,
  DELETE_ANSWER_ERROR,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_ERROR,
  DELETE_QUESTION_SUCCESS,
  DOWN_VOTE,
  DOWN_VOTE_ERROR,
  DOWN_VOTE_SUCCESS,
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_ERROR,
  GET_QUESTION_DATA_SUCCESS,
  PAY_BOUNTY,
  PAY_BOUNTY_ERROR,
  PAY_BOUNTY_SUCCESS,
  MARK_AS_ACCEPTED,
  MARK_AS_ACCEPTED_ERROR,
  MARK_AS_ACCEPTED_SUCCESS,
  POST_ANSWER,
  POST_ANSWER_ERROR,
  POST_ANSWER_SUCCESS,
  CHECK_ADD_COMMENT_AVAILABLE,
  SHOW_ADD_COMMENT_FORM,
  HIDE_ADD_COMMENT_FORM,
  POST_COMMENT,
  POST_COMMENT_BUTTON,
  POST_COMMENT_ERROR,
  POST_COMMENT_SUCCESS,
  RESET_STORE,
  SAVE_COMMENT,
  SAVE_COMMENT_BUTTON,
  SAVE_COMMENT_ERROR,
  SAVE_COMMENT_SUCCESS,
  TEXTAREA_COMMENT_FORM,
  UP_VOTE,
  UP_VOTE_ERROR,
  UP_VOTE_SUCCESS,
  VOTE_TO_DELETE,
  GET_HISTORIES,
  GET_HISTORIES_SUCCESS,
  GET_HISTORIES_ERROR,
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

export function deleteQuestion(questionId, isDocumentation, ev) {
  return {
    type: DELETE_QUESTION,
    questionId,
    isDocumentation,
    buttonId: ev.currentTarget.id,
  };
}

export function deleteQuestionSuccess(questionData, buttonId) {
  return {
    type: DELETE_QUESTION_SUCCESS,
    questionData,
    buttonId,
  };
}

export function deleteQuestionErr(deleteQuestionError, buttonId) {
  return {
    type: DELETE_QUESTION_ERROR,
    deleteQuestionError,
    buttonId,
  };
}

export function deleteAnswer(questionId, ev) {
  return {
    type: DELETE_ANSWER,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    buttonId: ev.currentTarget.id,
  };
}

export function deleteAnswerSuccess(questionData, buttonId) {
  return {
    type: DELETE_ANSWER_SUCCESS,
    questionData,
    buttonId,
  };
}

export function deleteAnswerErr(deleteAnswerError, buttonId) {
  return {
    type: DELETE_ANSWER_ERROR,
    deleteAnswerError,
    buttonId,
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

export function deleteCommentSuccess(questionData, buttonId) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    questionData,
    buttonId,
  };
}

export function deleteCommentErr(deleteCommentError, buttonId) {
  return {
    type: DELETE_COMMENT_ERROR,
    deleteCommentError,
    buttonId,
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
    buttonId: `${SAVE_COMMENT_BUTTON}${answerId}`,
  };
}

export function saveCommentSuccess(questionData, buttonId, commentId) {
  return {
    type: SAVE_COMMENT_SUCCESS,
    questionData,
    buttonId,
    commentId,
  };
}

export function saveCommentErr(saveCommentError, buttonId, commentId) {
  return {
    type: SAVE_COMMENT_ERROR,
    saveCommentError,
    buttonId,
    commentId,
  };
}

export function postAnswer(questionId, ...args) {
  return {
    type: POST_ANSWER,
    questionId,
    answer: args[0].get(TEXT_EDITOR_ANSWER_FORM),
    official: args[0].get(ANSWER_TYPE_FORM),
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

export function checkAddCommentAvailable(toggleFormButtonId, answerId) {
  return {
    type: CHECK_ADD_COMMENT_AVAILABLE,
    toggleFormButtonId,
    answerId,
  };
}

export function showAddCommentForm(toggleFormButtonId) {
  return {
    type: SHOW_ADD_COMMENT_FORM,
    toggleFormButtonId,
  };
}

export function hideAddCommentForm(toggleFormButtonId) {
  return {
    type: HIDE_ADD_COMMENT_FORM,
    toggleFormButtonId,
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
    buttonId: `${POST_COMMENT_BUTTON}${args[2].answerId}`,
  };
}

export function postCommentSuccess(questionData, buttonId) {
  return {
    type: POST_COMMENT_SUCCESS,
    questionData,
    buttonId,
  };
}

export function postCommentErr(postCommentError, buttonId) {
  return {
    type: POST_COMMENT_ERROR,
    postCommentError,
    buttonId,
  };
}

export function upVote(questionId, ev) {
  return {
    type: UP_VOTE,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    buttonId: ev.currentTarget.id,
    whoWasUpvoted: ev.currentTarget.dataset.whowasupvoted,
  };
}

export function upVoteSuccess(questionData, usersForUpdate, buttonId) {
  return {
    type: UP_VOTE_SUCCESS,
    questionData,
    usersForUpdate,
    buttonId,
  };
}

export function upVoteErr(upVoteError, buttonId) {
  return {
    type: UP_VOTE_ERROR,
    upVoteError,
    buttonId,
  };
}

export function downVote(questionId, ev) {
  return {
    type: DOWN_VOTE,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    buttonId: ev.currentTarget.id,
    whoWasDownvoted: ev.currentTarget.dataset.whowasdownvoted,
  };
}

export function downVoteSuccess(questionData, usersForUpdate, buttonId) {
  return {
    type: DOWN_VOTE_SUCCESS,
    questionData,
    usersForUpdate,
    buttonId,
  };
}

export function downVoteErr(downVoteError, buttonId) {
  return {
    type: DOWN_VOTE_ERROR,
    downVoteError,
    buttonId,
  };
}

export function markAsAccepted(questionId, ev) {
  return {
    type: MARK_AS_ACCEPTED,
    questionId,
    correctAnswerId: ev.currentTarget.dataset.answerid,
    buttonId: ev.currentTarget.id,
    whoWasAccepted: ev.currentTarget.dataset.whowasaccepted,
  };
}

export function markAsAcceptedSuccess(questionData, usersForUpdate, buttonId) {
  return {
    type: MARK_AS_ACCEPTED_SUCCESS,
    questionData,
    usersForUpdate,
    buttonId,
  };
}

export function markAsAcceptedErr(markAsAcceptedError, buttonId) {
  return {
    type: MARK_AS_ACCEPTED_ERROR,
    markAsAcceptedError,
    buttonId,
  };
}

export function voteToDelete(questionId, ev) {
  return {
    type: VOTE_TO_DELETE,
    questionId,
    answerId: ev.currentTarget.dataset.answerid,
    commentId: ev.currentTarget.dataset.commentid,
    buttonId: ev.currentTarget.id,
    whoWasVoted: ev.currentTarget.dataset.whowasvoted,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}

export const changeQuestionTypeSuccess = (buttonId) => ({
  type: CHANGE_QUESTION_TYPE_SUCCESS,
  buttonId,
});

export const changeQuestionTypeErr = (changeQuestionTypeError, buttonId) => ({
  type: CHANGE_QUESTION_TYPE_ERROR,
  changeQuestionTypeError,
  buttonId,
});

export const payBounty = (event) => ({
  type: PAY_BOUNTY,
  buttonId: event.currentTarget.id,
});

export const payBountySuccess = (buttonId) => ({
  type: PAY_BOUNTY_SUCCESS,
  buttonId,
});

export const payBountyError = (giveBountyErr, buttonId) => ({
  type: PAY_BOUNTY_ERROR,
  giveBountyErr,
  buttonId,
});

export function getHistories(postId) {
  return {
    type: GET_HISTORIES,
    postId,
  };
}

export function getHistoriesSuccess(histories) {
  return {
    type: GET_HISTORIES_SUCCESS,
    histories,
  };
}

export function getHistoriesErr(getHistoriesError) {
  return {
    type: GET_HISTORIES_ERROR,
    getHistoriesError,
  };
}
