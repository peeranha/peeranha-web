import { fromJS } from 'immutable';

import accountProviderReducer from '../reducer';

import {
  getCurrentAccount,
  getCurrentAccountSuccess,
  getCurrentAccountError,
} from '../actions';

describe('accountProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(accountProviderReducer(state, {})).toEqual(state);
  });

  it('getCurrentAccount', () => {
    const obj = state.set('loading', true);
    expect(accountProviderReducer(state, getCurrentAccount())).toEqual(obj);
  });

  it('getCurrentAccountSuccess', () => {
    const account = 'user1';
    const obj = state.set('loading', false).set('account', account);

    expect(
      accountProviderReducer(state, getCurrentAccountSuccess(account)),
    ).toEqual(obj);
  });

  it('getCurrentAccountError', () => {
    const err = {};
    const obj = state.set('loading', false).set('error', err);

    expect(accountProviderReducer(state, getCurrentAccountError(err))).toEqual(
      obj,
    );
  });
});
