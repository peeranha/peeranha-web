import { fromJS } from 'immutable';

import editAnswerReducer from '../reducer';

import {
  getAnswer,
  getAnswerSuccess,
  getAnswerErr,
  editAnswer,
  editAnswerSuccess,
  editAnswerErr,
} from '../actions';

describe('editAnswerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(editAnswerReducer(state, {})).toEqual(state);
  });

  it('getAnswer', () => {
    const obj = state.set('answerLoading', true);
    expect(editAnswerReducer(state, getAnswer())).toEqual(obj);
  });

  it('getAnswerSuccess', () => {
    const answer = 'getAnswerSuccess';
    const obj = state.set('answerLoading', false).set('answer', answer);

    expect(editAnswerReducer(state, getAnswerSuccess(answer))).toEqual(obj);
  });

  it('getAnswerErr', () => {
    const getAnswerError = 'getAnswerError';
    const obj = state
      .set('answerLoading', false)
      .set('getAnswerError', getAnswerError);

    expect(editAnswerReducer(state, getAnswerErr(getAnswerError))).toEqual(obj);
  });

  it('editAnswer', () => {
    const obj = state.set('editAnswerLoading', true);
    expect(editAnswerReducer(state, editAnswer())).toEqual(obj);
  });

  it('editAnswerSuccess', () => {
    const obj = state.set('editAnswerLoading', false);

    expect(editAnswerReducer(state, editAnswerSuccess())).toEqual(obj);
  });

  it('editAnswerErr', () => {
    const editAnswerError = 'editAnswerError';
    const obj = state
      .set('editAnswerLoading', false)
      .set('editAnswerError', editAnswerError);

    expect(editAnswerReducer(state, editAnswerErr(editAnswerError))).toEqual(
      obj,
    );
  });
});
