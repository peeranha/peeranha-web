/*
 *
 * QuestionsOfUser reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  RESET_STORE,
} from './constants';

export const initialState = fromJS({
  number: 10,
  questionsWithUserAnswers: [],
  questionsLoading: false,
  getQuestionsError: null,
  isLastFetch: false,
});

function questionsWithAnswersOfUserReducer(state = initialState, action) {
  const { type, getQuestionsError, questionsWithUserAnswers } = action;

  switch (type) {
    case GET_QUESTIONS:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set(
          'questionsWithUserAnswers',
          state
            .get('questionsWithUserAnswers')
            .concat(questionsWithUserAnswers),
        )
        .set(
          'isLastFetch',
          questionsWithUserAnswers.length < initialState.get('number'),
        );
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('getQuestionsError', getQuestionsError);

    case RESET_STORE:
      return initialState;

    default:
      return state;
  }
}

export default questionsWithAnswersOfUserReducer;
