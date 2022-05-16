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
    const obj = state;
    expect(accountProviderReducer(state, getCurrentAccount())).toEqual(obj);
  });

  describe('getCurrentAccountSuccess', () => {
    it('account, balance UNDEFINED', () => {
      const obj = state
        .set('loading', false)
        .set('lastUpdate', Date.now())
        .set('account', initialState.get('account'))
        .set('balance', initialState.get('balance'))
        .set('stakedInCurrentPeriod', initialState.get('stakedInCurrentPeriod'))
        .set('stakedInNextPeriod', initialState.get('stakedInNextPeriod'))
        .set('boost', initialState.get('boost'));

      expect(accountProviderReducer(state, getCurrentAccountSuccess())).toEqual(
        obj,
      );
    });

    it('account, balance NOT UNDEFINED', () => {
      const account = 'account';
      const balance = 'balance';
      const stakedInCurrentPeriod = 'stakedInCurrentPeriod';
      const stakedInNextPeriod = 'stakedInNextPeriod';
      const boost = 'boost';

      const obj = state
        .set('loading', false)
        .set('lastUpdate', Date.now())
        .set('account', account)
        .set('balance', balance)
        .set('stakedInCurrentPeriod', stakedInCurrentPeriod)
        .set('stakedInNextPeriod', stakedInNextPeriod)
        .set('boost', boost);

      expect(
        accountProviderReducer(
          state,
          getCurrentAccountSuccess(
            account,
            balance,
            stakedInCurrentPeriod,
            stakedInNextPeriod,
            boost,
          ),
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
