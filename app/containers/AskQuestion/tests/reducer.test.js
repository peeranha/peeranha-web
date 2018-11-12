import { fromJS } from 'immutable';

import askQuestionReducer from '../reducer';

import { askQuestion, askQuestionSuccess, askQuestionError } from '../actions';

describe('askQuestionReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(askQuestionReducer(state, {})).toEqual(state);
  });

  it('askQuestion', () => {
    const user = 'user';
    const questionData = { questionData: [] };
    const obj = state
      .set('askQuestionLoading', true)
      .set('questionData', questionData);
    expect(askQuestionReducer(state, askQuestion(user, questionData))).toEqual(
      obj,
    );
  });

  it('askQuestionSuccess', () => {
    const obj = state.set('askQuestionLoading', false);
    expect(askQuestionReducer(state, askQuestionSuccess())).toEqual(obj);
  });

  it('askQuestionError', () => {
    const questionError = 'questionError';
    const obj = state
      .set('askQuestionLoading', false)
      .set('questionError', questionError);
    expect(askQuestionReducer(state, askQuestionError(questionError))).toEqual(
      obj,
    );
  });
});
