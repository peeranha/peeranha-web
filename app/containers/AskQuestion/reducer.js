/*
 *
 * AskQuestion reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
  GET_EXISTING_QUESTIONS,
  GET_EXISTING_QUESTIONS_SUCCESS,
  GET_EXISTING_QUESTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  postedAnswerIds: [],
  askQuestionLoading: false,
  getExistingQuestionsLoading: false,
  questionError: '',
  getExistingQuestionsError: '',
  existingQuestions: [],
});

function askQuestionReducer(state = initialState, action) {
  const { id, type, questionError } = action;

  switch (type) {
    case ASK_QUESTION:
      return state.set('askQuestionLoading', true).set('questionError', '');
    case ASK_QUESTION_SUCCESS:
      return state
        .set('askQuestionLoading', false)
        .set('postedAnswerIds', [...state.toJS().postedAnswerIds, id]);
    case ASK_QUESTION_ERROR:
      return state
        .set('askQuestionLoading', false)
        .set('questionError', questionError);

    default:
      return state;
  }
}

export function existingQuestionReducer(state = initialState, action) {
  const { type, existingQuestions, getExistingQuestionsError } = action;

  switch (type) {
    case GET_EXISTING_QUESTIONS:
      return state.set('getExistingQuestionsLoading', true);
    case GET_EXISTING_QUESTIONS_SUCCESS:
      return state
        .set('getExistingQuestionsLoading', false)
        .set(
          'existingQuestions',
          existingQuestions || initialState.get('existingQuestions'),
        );
    case GET_EXISTING_QUESTIONS_ERROR:
      return state
        .set('getExistingQuestionsLoading', false)
        .set('getExistingQuestionsError', getExistingQuestionsError);

    default:
      return state;
  }
}

export default askQuestionReducer;
