import { fromJS } from 'immutable';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  number: 10,
  questions: [],
  questionsLoading: false,
  getQuestionsError: null,
  isLastFetch: false,
});

function questionsOfUserReducer(state = initialState, action) {
  const { type, getQuestionsError, questions, init } = action;

  switch (type) {
    case GET_QUESTIONS:
      return state
        .set('questionsLoading', true)
        .set(
          'questions',
          init ? initialState.get('questions') : state.get('questions'),
        );
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set('questions', state.get('questions').concat(questions))
        .set('isLastFetch', questions.length < initialState.get('number'));
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('getQuestionsError', getQuestionsError);

    default:
      return state;
  }
}

export default questionsOfUserReducer;
