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
  deleteQuestionLoading: false,
  deleteQuestionError: null,
  deleteAnswerLoading: false,
  deleteAnswerError: null,
  deleteCommentLoading: false,
  deleteCommentError: null,
  saveCommentLoading: false,
  saveCommentError: null,
  voteToDeleteLoading: false,
  voteToDeleteError: null,
  ids: new Set(),
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
    deleteQuestionError,
    deleteAnswerError,
    deleteCommentError,
    saveCommentError,
    voteToDeleteError,
    buttonId,
  } = action;

  /* eslint default-case: 0 */
  switch (type) {
    case POST_COMMENT:
    case UP_VOTE:
    case DOWN_VOTE:
    case MARK_AS_ACCEPTED:
    case DELETE_QUESTION:
    case DELETE_ANSWER:
    case DELETE_COMMENT:
    case SAVE_COMMENT:
    case VOTE_TO_DELETE:
      state.set('ids', new Set([...state.toJS().ids.add(buttonId)]));
      break;

    case POST_COMMENT_SUCCESS:
    case POST_COMMENT_ERROR:
    case UP_VOTE_SUCCESS:
    case UP_VOTE_ERROR:
    case DOWN_VOTE_SUCCESS:
    case DOWN_VOTE_ERROR:
    case MARK_AS_ACCEPTED_SUCCESS:
    case MARK_AS_ACCEPTED_ERROR:
    case DELETE_QUESTION_SUCCESS:
    case DELETE_QUESTION_ERROR:
    case DELETE_ANSWER_SUCCESS:
    case DELETE_ANSWER_ERROR:
    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_ERROR:
    case SAVE_COMMENT_SUCCESS:
    case SAVE_COMMENT_ERROR:
    case VOTE_TO_DELETE_SUCCESS:
    case VOTE_TO_DELETE_ERROR:
      state.toJS().ids.delete(buttonId);
      state.set('ids', new Set([...state.toJS().ids]));
      break;
  }

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
      return state.set('postAnswerLoading', false);
    case POST_ANSWER_ERROR:
      return state
        .set('postAnswerLoading', false)
        .set('postAnswerError', postAnswerError);

    case POST_COMMENT:
      return state.set('postCommentLoading', true);
    case POST_COMMENT_SUCCESS:
      return state.set('postCommentLoading', false);
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

    case DELETE_QUESTION:
      return state.set('deleteQuestionLoading', true);
    case DELETE_QUESTION_SUCCESS:
      return state.set('deleteQuestionLoading', false);
    case DELETE_QUESTION_ERROR:
      return state
        .set('deleteQuestionError', deleteQuestionError)
        .set('deleteQuestionLoading', false);

    case DELETE_ANSWER:
      return state.set('deleteAnswerLoading', true);
    case DELETE_ANSWER_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('deleteAnswerLoading', false);
    case DELETE_ANSWER_ERROR:
      return state
        .set('deleteAnswerError', deleteAnswerError)
        .set('deleteAnswerLoading', false);

    case DELETE_COMMENT:
      return state.set('deleteCommentLoading', true);
    case DELETE_COMMENT_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('deleteCommentLoading', false);
    case DELETE_COMMENT_ERROR:
      return state
        .set('deleteCommentError', deleteCommentError)
        .set('deleteCommentLoading', false);

    case SAVE_COMMENT:
      return state.set('saveCommentLoading', true);
    case SAVE_COMMENT_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('saveCommentLoading', false);
    case SAVE_COMMENT_ERROR:
      return state
        .set('saveCommentError', saveCommentError)
        .set('saveCommentLoading', false);

    case VOTE_TO_DELETE:
      return state.set('voteToDeleteLoading', true);
    case VOTE_TO_DELETE_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('voteToDeleteLoading', false);
    case VOTE_TO_DELETE_ERROR:
      return state
        .set('voteToDeleteError', voteToDeleteError)
        .set('voteToDeleteLoading', false);

    case RESET_STORE:
      return initialState;

    default:
      return state;
  }
}

export default viewQuestionReducer;
