import { fromJS } from 'immutable';

import accountProviderReducer from '../reducer';

import {
  getCurrentAccount,
  getCurrentAccountSuccess,
  getCurrentAccountError,
  loginSignupSuccess,
  loginSignupErr,
  forgetIdentityErr,
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
    const acc = 'user1';
    const userIsInSystem = true;
    const obj = state
      .set('loading', false)
      .set('userIsInSystem', userIsInSystem)
      .set('account', acc);
    expect(
      accountProviderReducer(
        state,
        getCurrentAccountSuccess(acc, userIsInSystem),
      ),
    ).toEqual(obj);
  });

  it('getCurrentAccountError', () => {
    const err = {};
    const obj = state.set('loading', false).set('error', err);
    expect(accountProviderReducer(state, getCurrentAccountError(err))).toEqual(
      obj,
    );
  });

  it('loginSignupSuccess', () => {
    const acc = 'user1';
    const userIsInSystem = true;
    const obj = state.set('userIsInSystem', userIsInSystem).set('account', acc);

    expect(
      accountProviderReducer(state, loginSignupSuccess(acc, userIsInSystem)),
    ).toEqual(obj);
  });

  it('loginSignupErr', () => {
    const loginSignupError = true;
    const obj = state.set('loginSignupError', loginSignupError);

    expect(
      accountProviderReducer(state, loginSignupErr(loginSignupError)),
    ).toEqual(obj);
  });

  it('forgetIdentityErr', () => {
    const forgetIdentityError = true;
    const obj = state.set('forgetIdentityError', forgetIdentityError);

    expect(
      accountProviderReducer(state, forgetIdentityErr(forgetIdentityError)),
    ).toEqual(obj);
  });
});
