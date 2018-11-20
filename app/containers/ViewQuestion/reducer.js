/*
 *
 * ViewQuestion reducer
 *
 */

import { fromJS } from 'immutable';
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
} from './constants';

export const initialState = fromJS({
  questionData: null,
  getQuestionDataError: null,
  questionDataLoading: false,
  postAnswerLoading: false,
  postAnswerError: null,
  postCommentLoading: false,
  postCommentError: null,
  upVoteLoading: false,
  upVoteError: null,
  downVoteLoading: false,
  downVoteError: null,
  markAsAcceptedLoading: false,
  markAsAcceptedError: null,
});

function viewQuestionReducer(state = initialState, action) {
  const {
    type,
    questionData,
    getQuestionDataError,
    postAnswerError,
    postCommentError,
    upVoteError,
    downVoteError,
    markAsAcceptedError,
  } = action;

  switch (type) {
    case GET_QUESTION_DATA:
      return state.set('questionDataLoading', true);
    case GET_QUESTION_DATA_SUCCESS:
      return state
        .set('questionDataLoading', false)
        .set('questionData', questionData);
    case GET_QUESTION_DATA_ERROR:
      return state
        .set('questionDataLoading', false)
        .set('getQuestionDataError', getQuestionDataError);
    case POST_ANSWER:
      return state.set('postAnswerLoading', true);
    case POST_ANSWER_SUCCESS:
      return state
        .set('postAnswerLoading', false)
        .set('questionData', questionData);
    case POST_ANSWER_ERROR:
      return state
        .set('postAnswerLoading', false)
        .set('postAnswerError', postAnswerError);
    case POST_COMMENT:
      return state.set('postCommentLoading', true);
    case POST_COMMENT_SUCCESS:
      return state
        .set('postCommentLoading', false)
        .set('questionData', questionData);
    case POST_COMMENT_ERROR:
      return state
        .set('postCommentLoading', false)
        .set('postCommentError', postCommentError);
    case UP_VOTE:
      return state.set('upVoteLoading', true);
    case UP_VOTE_SUCCESS:
      return state
        .set('upVoteLoading', false)
        .set('questionData', questionData);
    case UP_VOTE_ERROR:
      return state.set('upVoteLoading', false).set('upVoteError', upVoteError);
    case DOWN_VOTE:
      return state.set('downVoteLoading', true);
    case DOWN_VOTE_SUCCESS:
      return state
        .set('downVoteLoading', false)
        .set('questionData', questionData);
    case DOWN_VOTE_ERROR:
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError);
    case MARK_AS_ACCEPTED:
      return state.set('markAsAcceptedLoading', true);
    case MARK_AS_ACCEPTED_SUCCESS:
      return state
        .set('markAsAcceptedLoading', false)
        .set('questionData', questionData);
    case MARK_AS_ACCEPTED_ERROR:
      return state
        .set('markAsAcceptedLoading', false)
        .set('markAsAcceptedError', markAsAcceptedError);
    default:
      return state;
  }
}

export default viewQuestionReducer;
