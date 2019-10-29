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
    const val = fromJS({});
    const obj = state.set('askQuestionLoading', true);
    expect(askQuestionReducer(state, askQuestion(val))).toEqual(obj);
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
