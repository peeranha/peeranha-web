/* eslint indent: 0 */
import { fromJS } from 'immutable';
import orderBy from 'lodash/orderBy';

import {
  CHANGE_QUESTION_FILTER,
  DOWN_QUESTION,
  DOWN_QUESTION_ERROR,
  DOWN_QUESTION_SUCCESS,
  GET_FAQ,
  GET_FAQ_ERROR,
  GET_FAQ_SUCCESS,
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  GET_UNIQ_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS_ERROR,
  LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS,
  MOVE_QUESTION,
  MOVE_QUESTION_ERROR,
  MOVE_QUESTION_SUCCESS,
  REMOVE_OR_ADD_TOP_QUESTION,
  REMOVE_OR_ADD_TOP_QUESTION_ERROR,
  REMOVE_OR_ADD_TOP_QUESTION_SUCCESS,
  SET_CREATED_FILTER,
  SET_TYPE_FILTER,
  UP_QUESTION,
  UP_QUESTION_ERROR,
  UP_QUESTION_SUCCESS,
} from './constants';

export const initialState = fromJS({
  faqLoading: true,
  faqList: [],
  faqError: '',
});

function questionsReducer(state = initialState, action) {
  const { type, faqList = [], faqError } = action;

  switch (type) {
    case GET_FAQ:
      return state.set('questionsLoading', true);
    case GET_FAQ_SUCCESS:
      return state.set('faqLoading', false).set('faqList', faqList);
    case GET_FAQ_ERROR:
      return state.set('faqLoading', false).set('faqError', faqError);
    default:
      return state;
  }
}

export default questionsReducer;
