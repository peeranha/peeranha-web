import { fromJS } from 'immutable';

import questionsReducer, { initialState } from '../reducer';

import {
  getQuestionsList,
  getQuestionsListSuccess,
  getQuestionsListError,
  setDefaultReducer,
} from '../actions';

describe('questionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questionsList: [],
    });
  });

  it('returns the initial state', () => {
    expect(questionsReducer(state, {})).toEqual(state);
  });

  it('getQuestionsList', () => {
    const obj = state.set('questionsLoading', true);
    expect(questionsReducer(state, getQuestionsList())).toEqual(obj);
  });

  it('getQuestionsListSuccess, questionsList.length > nextLoadedItems', () => {
    const questionsList = fromJS([]);
    questionsList.length = initialState.get('nextLoadedItems') + 1;

    const obj = state
      .set('questionsLoading', false)
      .set('questionsList', questionsList)
      .set('isLastFetch', false);

    expect(
      questionsReducer(state, getQuestionsListSuccess(questionsList)),
    ).toEqual(obj);
  });

  it('getQuestionsListError', () => {
    const err = 'error';
    const obj = state.set('questionsLoading', false).set('questionsError', err);

    expect(questionsReducer(state, getQuestionsListError(err))).toEqual(obj);
  });

  it('setDefaultReducer', () => {
    const obj = initialState;
    expect(questionsReducer(state, setDefaultReducer())).toEqual(obj);
  });
});
