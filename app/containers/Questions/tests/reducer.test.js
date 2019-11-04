import { fromJS } from 'immutable';

import questionsReducer from '../reducer';

import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
} from '../actions';

describe('questionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questionsList: [{ id: 1 }],
    });
  });

  it('returns the initial state', () => {
    expect(questionsReducer(state, {})).toEqual(state);
  });

  it('getQuestions', () => {
    const obj = state.set('questionsLoading', true);

    expect(questionsReducer(state, getQuestions())).toEqual(obj);
  });

  it('getQuestionsSuccess', () => {
    const questionsList = [{ id: 1 }];

    const obj = state
      .set('questionsLoading', false)
      .set('questionsList', questionsList)
      .set('isLastFetch', true);

    expect(questionsReducer(state, getQuestionsSuccess(questionsList))).toEqual(
      obj,
    );
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
