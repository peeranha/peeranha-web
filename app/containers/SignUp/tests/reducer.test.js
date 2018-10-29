import { fromJS } from 'immutable';

import signUpReducer from '../reducer';

import {
  fetchRegisterAcc,
  registerAccSuccess,
  registerAccError,
  showSignUpModal,
  hideSignUpModal,
  setReducerDefault,
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

  it('showSignUpModal', () => {
    const content = 'content';
    const obj = state.set('content', content).set('showModal', true);
    expect(signUpReducer(state, showSignUpModal(content))).toEqual(obj);
  });

  it('showSignUpModal', () => {
    const obj = state.set('showModal', false);
    expect(signUpReducer(state, hideSignUpModal())).toEqual(obj);
  });

  it('setReducerDefault', () => {
    const obj = state.set('showModal', false);
    expect(signUpReducer(state, setReducerDefault())).toEqual(obj);
  });
});
