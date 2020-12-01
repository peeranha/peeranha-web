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
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_TYPE_SUCCESS,
  CHANGE_QUESTION_TYPE_ERROR,
} from './constants';

export const initialState = fromJS({
  questionData: null,
  getQuestionDataError: null,
  questionDataLoading: true,
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
  ids: [],
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

  switch (type) {
    case GET_QUESTION_DATA:
      return state.set('questionDataLoading', true);
    case GET_QUESTION_DATA_SUCCESS:
      return state
        .set('questionDataLoading', false)
        .set('questionData', questionData);
    case GET_QUESTION_DATA_ERROR:
      return state
        .set('questionData', null)
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
      return state
        .set('postCommentLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case POST_COMMENT_SUCCESS:
      return state
        .set('postCommentLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case POST_COMMENT_ERROR:
      return state
        .set('postCommentLoading', false)
        .set('postCommentError', postCommentError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case UP_VOTE:
      return state
        .set('upVoteLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case UP_VOTE_SUCCESS:
      return state
        .set('upVoteLoading', false)
        .set('questionData', questionData)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case UP_VOTE_ERROR:
      return state
        .set('upVoteLoading', false)
        .set('upVoteError', upVoteError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case DOWN_VOTE:
      return state
        .set('downVoteLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case DOWN_VOTE_SUCCESS:
      return state
        .set('downVoteLoading', false)
        .set('questionData', questionData)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case DOWN_VOTE_ERROR:
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case MARK_AS_ACCEPTED:
      return state
        .set('markAsAcceptedLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case MARK_AS_ACCEPTED_SUCCESS:
      return state
        .set('markAsAcceptedLoading', false)
        .set('questionData', questionData)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case MARK_AS_ACCEPTED_ERROR:
      return state
        .set('markAsAcceptedLoading', false)
        .set('markAsAcceptedError', markAsAcceptedError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case DELETE_QUESTION:
      return state
        .set('deleteQuestionLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case DELETE_QUESTION_SUCCESS:
      return state
        .set('deleteQuestionLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case DELETE_QUESTION_ERROR:
      return state
        .set('deleteQuestionError', deleteQuestionError)
        .set('deleteQuestionLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case DELETE_ANSWER:
      return state
        .set('deleteAnswerLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case DELETE_ANSWER_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('deleteAnswerLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case DELETE_ANSWER_ERROR:
      return state
        .set('deleteAnswerError', deleteAnswerError)
        .set('deleteAnswerLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case DELETE_COMMENT:
      return state
        .set('deleteCommentLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case DELETE_COMMENT_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('deleteCommentLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case DELETE_COMMENT_ERROR:
      return state
        .set('deleteCommentError', deleteCommentError)
        .set('deleteCommentLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case SAVE_COMMENT:
      return state
        .set('saveCommentLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case SAVE_COMMENT_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('saveCommentLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case SAVE_COMMENT_ERROR:
      return state
        .set('saveCommentError', saveCommentError)
        .set('saveCommentLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case VOTE_TO_DELETE:
      return state
        .set('voteToDeleteLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case VOTE_TO_DELETE_SUCCESS:
      return state
        .set('questionData', questionData)
        .set('voteToDeleteLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case VOTE_TO_DELETE_ERROR:
      return state
        .set('voteToDeleteError', voteToDeleteError)
        .set('voteToDeleteLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case CHANGE_QUESTION_TYPE:
      return state
        .set('changeQuestionTypeLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case CHANGE_QUESTION_TYPE_SUCCESS:
      return state
        .set('changeQuestionTypeLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case CHANGE_QUESTION_TYPE_ERROR:
      return state
        .set('changeQuestionTypeLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case RESET_STORE:
      return initialState;

    default:
      return state;
  }
}

export default viewQuestionReducer;
