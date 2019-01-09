import { fromJS } from 'immutable';

import questionsReducer, { initialState } from '../reducer';

import {
  getInitQuestions,
  getInitQuestionsSuccess,
  getInitQuestionsError,
  getNextQuestions,
  getNextQuestionsSuccess,
  getNextQuestionsError,
  setDefaultReducer,
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

  it('getInitQuestions', () => {
    const communityIdFilter = 10;
    const obj = state
      .set('questionsLoading', true)
      .set('communityIdFilter', communityIdFilter);

    expect(
      questionsReducer(state, getInitQuestions(0, 0, communityIdFilter)),
    ).toEqual(obj);
  });

  it('getInitQuestionsSuccess', () => {
    const questionsList = [{}];
    const obj = state
      .set('questionsLoading', false)
      .set('questionsList', questionsList)
      .set('isLastFetch', true);

    expect(
      questionsReducer(state, getInitQuestionsSuccess(questionsList)),
    ).toEqual(obj);
  });

  it('getInitQuestionsError', () => {
    const questionsError = 'questionsError';
    const obj = state
      .set('questionsLoading', false)
      .set('questionsError', questionsError);

    expect(
      questionsReducer(state, getInitQuestionsError(questionsError)),
    ).toEqual(obj);
  });

  it('getNextQuestions', () => {
    const obj = state.set('questionsLoading', true);

    expect(questionsReducer(state, getNextQuestions())).toEqual(obj);
  });

  it('getNextQuestionsSuccess', () => {
    const questionsList = [];
    const obj = state
      .set('questionsLoading', false)
      .set('questionsList', state.get('questionsList').concat(questionsList))
      .set('isLastFetch', true);

    expect(
      questionsReducer(state, getNextQuestionsSuccess(questionsList)),
    ).toEqual(obj);
  });

  it('getNextQuestionsError', () => {
    const questionsError = 'questionsError';
    const obj = state
      .set('questionsLoading', false)
      .set('questionsError', questionsError);

    expect(
      questionsReducer(state, getNextQuestionsError(questionsError)),
    ).toEqual(obj);
  });

  it('setDefaultReducer', () => {
    const obj = initialState;
    expect(questionsReducer(state, setDefaultReducer())).toEqual(obj);
  });
});
