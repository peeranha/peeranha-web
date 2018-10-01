import { fromJS } from 'immutable';

import signUpReducer from '../reducer';

import {
  fetchRegistrAcc,
  registrAccSuccess,
  registrAccError,
} from '../actions';

describe('signUpReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(signUpReducer(state, {})).toEqual(state);
  });

  it('fetchRegistrAcc: set @loading true', () => {
    const obj = state.set('loading', true);
    expect(signUpReducer(state, fetchRegistrAcc())).toEqual(obj);
  });

  it('registrAccSuccess: set @loading false / @registred true', () => {
    const obj = state.set('loading', false).set('registred', true);
    expect(signUpReducer(state, registrAccSuccess())).toEqual(obj);
  });

  it('registrAccError: set @loading false / @error {}', () => {
    const obj = state.set('loading', false).set('error', {});
    expect(signUpReducer(state, registrAccError({}))).toEqual(obj);
  });
});
