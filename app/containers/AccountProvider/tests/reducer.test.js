import { fromJS } from 'immutable';

import accountProviderReducer, { initialState } from '../reducer';

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

  describe('getCurrentAccountSuccess', () => {
    it('account, balance UNDEFINED', () => {
      const obj = state
        .set('loading', false)
        .set('account', initialState.get('account'))
        .set('balance', initialState.get('balance'));

      expect(accountProviderReducer(state, getCurrentAccountSuccess())).toEqual(
        obj,
      );
    });

    it('account, balance NOT UNDEFINED', () => {
      const account = 'account';
      const balance = 'balance';

      const obj = state
        .set('loading', false)
        .set('account', account)
        .set('balance', balance);

      expect(
        accountProviderReducer(
          state,
          getCurrentAccountSuccess(account, balance),
        ),
      ).toEqual(obj);
    });
  });

  it('getCurrentAccountError', () => {
    const err = {};
    const obj = state.set('loading', false).set('error', err);

    expect(accountProviderReducer(state, getCurrentAccountError(err))).toEqual(
      obj,
    );
  });
});
