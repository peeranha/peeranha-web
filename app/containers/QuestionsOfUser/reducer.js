import { fromJS } from 'immutable';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from './constants';
import { DELETE_QUESTION_SUCCESS } from '../ViewQuestion/constants';

export const initialState = fromJS({
  number: 10,
  questions: [],
  questionsLoading: false,
  getQuestionsError: null,
  isLastFetch: false,
});

function questionsOfUserReducer(state = initialState, action) {
  const { type, getQuestionsError, questions, init, questionData } = action;

  const { questions: stateQuestions } = state.toJS();

  const {
    questions: initialStateQuestions,
    number: initialStateNumber,
  } = initialState.toJS();

  switch (type) {
    case GET_QUESTIONS:
      return state
        .set('questionsLoading', true)
        .set('questions', init ? initialStateQuestions : stateQuestions);
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set('questions', [...stateQuestions, ...questions])
        .set('isLastFetch', questions.length < initialStateNumber);
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('getQuestionsError', getQuestionsError);
    case DELETE_QUESTION_SUCCESS:
      return state.set(
        'questions',
        stateQuestions.filter(question => question.id !== questionData.id),
      );
    default:
      return state;
  }
}

export default questionsOfUserReducer;
