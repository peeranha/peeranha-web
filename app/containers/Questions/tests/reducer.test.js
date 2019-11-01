import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import questionsReducer, { initialState } from '../reducer';

import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
} from '../actions';

describe('questionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questionsList: [{}],
    });
  });

  it('returns the initial state', () => {
    expect(questionsReducer(state, {})).toEqual(state);
  });

  it('LOCATION_CHANGE', () => {
    expect(questionsReducer(state, { type: LOCATION_CHANGE })).toEqual(
      initialState,
    );
  });

  it('getQuestions', () => {
    const obj = state.set('questionsLoading', true);

    expect(questionsReducer(state, getQuestions())).toEqual(obj);
  });

  it('getQuestionsSuccess, next is true', () => {
    const questionsList = [{}];
    const next = true;

    const obj = state
      .set('questionsLoading', false)
      .set('questionsList', state.get('questionsList').concat(questionsList))
      .set('isLastFetch', true);

    expect(
      questionsReducer(state, getQuestionsSuccess(questionsList, next)),
    ).toEqual(obj);
  });

  it('getQuestionsSuccess, next is false', () => {
    const questionsList = [{}];
    const next = false;

    const obj = state
      .set('questionsLoading', false)
      .set('questionsList', questionsList)
      .set('isLastFetch', true);

    expect(
      questionsReducer(state, getQuestionsSuccess(questionsList, next)),
    ).toEqual(obj);
  });

  it('getQuestionsError', () => {
    const questionsError = 'questionsError';
    const obj = state
      .set('questionsLoading', false)
      .set('questionsError', questionsError);

    expect(questionsReducer(state, getQuestionsError(questionsError))).toEqual(
      obj,
    );
  });
});
