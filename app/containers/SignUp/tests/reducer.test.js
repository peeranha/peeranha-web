import { fromJS } from 'immutable';

import signUpReducer from '../reducer';

import {
  fetchRegisterAcc,
  registerAccSuccess,
  registerAccError,
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

  it('fetchRegisterAcc: set @loading true', () => {
    const obj = state.set('loading', true);
    expect(signUpReducer(state, fetchRegisterAcc())).toEqual(obj);
  });

  it('registerAccSuccess: set @loading false / @registered true', () => {
    const obj = state.set('loading', false).set('registered', true);
    expect(signUpReducer(state, registerAccSuccess())).toEqual(obj);
  });

  it('registerAccError: set @loading false / @error {}', () => {
    const obj = state.set('loading', false).set('error', {});
    expect(signUpReducer(state, registerAccError({}))).toEqual(obj);
  });
});
