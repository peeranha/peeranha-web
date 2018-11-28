import { fromJS } from 'immutable';

import editQuestionReducer from '../reducer';

import {
  getAskedQuestion,
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestion,
  editQuestionSuccess,
  editQuestionErr,
} from '../actions';

describe('editQuestionReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(editQuestionReducer(state, {})).toEqual(state);
  });

  it('getAskedQuestion', () => {
    const obj = state.set('questionLoading', true);
    expect(editQuestionReducer(state, getAskedQuestion())).toEqual(obj);
  });

  it('getAskedQuestionSuccess', () => {
    const question = 'question';
    const obj = state.set('questionLoading', false).set('question', question);

    expect(
      editQuestionReducer(state, getAskedQuestionSuccess(question)),
    ).toEqual(obj);
  });

  it('getAskedQuestionErr', () => {
    const getAskedQuestionError = 'getAskedQuestionError';
    const obj = state
      .set('questionLoading', false)
      .set('getAskedQuestionError', getAskedQuestionError);

    expect(
      editQuestionReducer(state, getAskedQuestionErr(getAskedQuestionError)),
    ).toEqual(obj);
  });

  it('editQuestion', () => {
    const obj = state.set('editQuestionLoading', true);
    expect(editQuestionReducer(state, editQuestion())).toEqual(obj);
  });

  it('editQuestionSuccess', () => {
    const obj = state.set('editQuestionLoading', false);

    expect(editQuestionReducer(state, editQuestionSuccess())).toEqual(obj);
  });

  it('editQuestionErr', () => {
    const editQuestionError = 'editQuestionError';
    const obj = state
      .set('editQuestionLoading', false)
      .set('editQuestionError', editQuestionError);

    expect(
      editQuestionReducer(state, editQuestionErr(editQuestionError)),
    ).toEqual(obj);
  });
});
