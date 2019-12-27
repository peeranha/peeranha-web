import { fromJS } from 'immutable';
import createCommunityReducer, { initialState } from '../reducer';

import {
  createCommunity,
  createCommunitySuccess,
  createCommunityErr,
  setDefaultStore,
} from '../actions';

describe('createCommunityReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(createCommunityReducer(state, {})).toEqual(state);
  });

  it('setDefaultStore', () => {
    const obj = initialState;

    expect(createCommunityReducer(state, setDefaultStore())).toEqual(obj);
  });

  it('createCommunity', () => {
    const obj = state.set('createCommunityLoading', true);

    expect(createCommunityReducer(state, createCommunity())).toEqual(obj);
  });

  it('createCommunitySuccess', () => {
    const obj = state.set('createCommunityLoading', false);

    expect(createCommunityReducer(state, createCommunitySuccess())).toEqual(
      obj,
    );
  });

  it('createCommunityErr', () => {
    const createCommunityError = 'createCommunityError';
    const obj = state
      .set('createCommunityLoading', false)
      .set('createCommunityError', createCommunityError);

    expect(
      createCommunityReducer(state, createCommunityErr(createCommunityError)),
    ).toEqual(obj);
  });
});
