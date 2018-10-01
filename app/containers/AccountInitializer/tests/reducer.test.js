import { fromJS } from 'immutable';

import accountInitializerReducer from '../reducer';

import {
  getCurrentAccount,
  getCurrentAccountSuccess,
  getCurrentAccountError,
} from '../actions';

describe('accountInitializerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(accountInitializerReducer(state, {})).toEqual(state);
  });

  it('getCurrentAccount has to set into state @loading as true', () => {
    const obj = state.set('loading', true);
    expect(accountInitializerReducer(state, getCurrentAccount())).toEqual(obj);
  });

  it('getCurrentAccountSuccess has to set into state @loading as false and @acc as obj', () => {
    const acc = {};
    const obj = state.set('loading', false).set('account', acc);
    expect(
      accountInitializerReducer(state, getCurrentAccountSuccess(acc)),
    ).toEqual(obj);
  });

  it('getCurrentAccountError has to set into state @loading as false and @err as obj', () => {
    const err = {};
    const obj = state.set('loading', false).set('error', err);
    expect(
      accountInitializerReducer(state, getCurrentAccountError(err)),
    ).toEqual(obj);
  });
});
