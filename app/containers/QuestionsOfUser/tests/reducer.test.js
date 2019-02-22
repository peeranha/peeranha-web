import { fromJS } from 'immutable';

import questionsOfUserReducer, { initialState } from '../reducer';

import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsErr,
  resetStore,
} from '../actions';

describe('questionsOfUserReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      number: 10,
      questions: [],
    });
  });

  it('returns the initial state', () => {
    expect(questionsOfUserReducer(state, {})).toEqual(state);
  });

  it('getQuestions', () => {
    const obj = state.set('questionsLoading', true);
    expect(questionsOfUserReducer(state, getQuestions())).toEqual(obj);
  });

  it('getQuestionsSuccess', () => {
    const questions = [1, 2, 3];
    const obj = state
      .set('questionsLoading', false)
      .set('questions', state.get('questions').concat(questions))
      .set('isLastFetch', true);

    expect(
      questionsOfUserReducer(state, getQuestionsSuccess(questions)),
    ).toEqual(obj);
  });

  it('getQuestionsErr', () => {
    const getQuestionsError = 'getQuestionsError';
    const obj = state
      .set('questionsLoading', false)
      .set('getQuestionsError', getQuestionsError);

    expect(
      questionsOfUserReducer(state, getQuestionsErr(getQuestionsError)),
    ).toEqual(obj);
  });

  it('resetStore', () => {
    expect(questionsOfUserReducer(state, resetStore())).toEqual(initialState);
  });
});
