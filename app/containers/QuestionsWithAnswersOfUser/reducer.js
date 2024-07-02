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
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_ERROR,
  UNBAN_USER,
  UNBAN_USER_SUCCESS,
  UNBAN_USER_ERROR,
} from './constants';

export const initialState = fromJS({
  number: 10,
  questionsWithUserAnswers: [],
  questionsLoading: false,
  getQuestionsError: null,
  isLastFetch: false,
  banIsInProcess: false,
  unbanIsInProcess: false,
  banUserError: null,
  unbanUserError: null,
});

function questionsWithAnswersOfUserReducer(state = initialState, action) {
  const { type, getQuestionsError, questionsWithUserAnswers, init, banUserError, unbanUserError } =
    action;

  switch (type) {
    case GET_QUESTIONS:
      return state
        .set('questionsLoading', true)
        .set(
          'questionsWithUserAnswers',
          init
            ? initialState.get('questionsWithUserAnswers')
            : state.get('questionsWithUserAnswers'),
        );
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set(
          'questionsWithUserAnswers',
          state.get('questionsWithUserAnswers').concat(questionsWithUserAnswers),
        )
        .set('isLastFetch', questionsWithUserAnswers.length < initialState.get('number'));
    case GET_QUESTIONS_ERROR:
      return state.set('questionsLoading', false).set('getQuestionsError', getQuestionsError);

    case BAN_USER:
      return state.set('banIsInProcess', true);
    case BAN_USER_SUCCESS:
      return state.set('banIsInProcess', false);
    case BAN_USER_ERROR:
      return state.set('banUserError', banUserError).set('banIsInProcess', false);

    case UNBAN_USER:
      return state.set('unbanIsInProcess', true);
    case UNBAN_USER_SUCCESS:
      return state.set('unbanIsInProcess', false);
    case UNBAN_USER_ERROR:
      return state.set('unbanUserError', unbanUserError).set('unbanIsInProcess', false);

    default:
      return state;
  }
}

export default questionsWithAnswersOfUserReducer;
