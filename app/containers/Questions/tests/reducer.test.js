import { fromJS } from 'immutable';

import questionsReducer from '../reducer';

import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
  getUniqQuestions,
} from '../actions';

describe('questionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questionsList: [{ id: 1 }, { id: 2 }],
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
      .set('questionsList', [{ id: 1 }, { id: 2 }, { id: 1 }])
      .set('isLastFetch', true);

    expect(questionsReducer(state, getQuestionsSuccess(questionsList))).toEqual(
      obj,
    );
  });

  it('getUniqQuestions', () => {
    const questionsList = [{ id: 1, title: 'title' }, { id: 2 }];
    const obj = state.set('questionsList', questionsList);

    expect(questionsReducer(state, getUniqQuestions(questionsList))).toEqual(
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
