import { fromJS } from 'immutable';

import questionsWithAnswersOfUserReducer from '../reducer';

import { getQuestions, getQuestionsSuccess, getQuestionsErr } from '../actions';

describe('questionsWithAnswersOfUserReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      number: 10,
      questionsWithUserAnswers: [],
    });
  });

  it('returns the initial state', () => {
    expect(questionsWithAnswersOfUserReducer(state, {})).toEqual(state);
  });

  it('getQuestions', () => {
    const obj = state.set('questionsLoading', true);
    expect(questionsWithAnswersOfUserReducer(state, getQuestions())).toEqual(
      obj,
    );
  });

  it('getQuestionsSuccess', () => {
    const questionsWithUserAnswers = [1, 2, 3];
    const obj = state
      .set('questionsLoading', false)
      .set(
        'questionsWithUserAnswers',
        state.get('questionsWithUserAnswers').concat(questionsWithUserAnswers),
      )
      .set('isLastFetch', true);

    expect(
      questionsWithAnswersOfUserReducer(
        state,
        getQuestionsSuccess(questionsWithUserAnswers),
      ),
    ).toEqual(obj);
  });

  it('getQuestionsErr', () => {
    const getQuestionsError = 'getQuestionsError';
    const obj = state
      .set('questionsLoading', false)
      .set('getQuestionsError', getQuestionsError);

    expect(
      questionsWithAnswersOfUserReducer(
        state,
        getQuestionsErr(getQuestionsError),
      ),
    ).toEqual(obj);
  });
});
