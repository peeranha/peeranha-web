import { fromJS } from 'immutable';
import loginReducer, { initialState } from '../reducer';

import {
  showLoginModal,
  hideLoginModal,
  loginWithEmail,
  loginWithEmailSuccess,
  loginWithEmailErr,
} from '../actions';

import { EMAIL_FORM, EMAIL_FIELD } from '../constants';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(loginReducer(state, {})).toEqual(state);
  });

  it('SHOW_LOGIN_MODAL', () => {
    const objWithoutContent = state
      .set('showModal', true)
      .set('content', EMAIL_FORM);

    expect(loginReducer(state, showLoginModal())).toEqual(objWithoutContent);
  });

  it('HIDE_LOGIN_MODAL', () => {
    const obj = state.set('showModal', false);
    expect(loginReducer(state, hideLoginModal())).toEqual(obj);
  });

  it('LOGIN_WITH_EMAIL', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const obj = state.set('loginProcessing', true);

    expect(loginReducer(state, loginWithEmail(val))).toEqual(obj);
  });

  it('LOGIN_WITH_EMAIL_SUCCESS', () => {
    const eosAccount = 'eosAccount';

    const obj = state
      .set('loginProcessing', false)
      .set('eosAccount', eosAccount)
      .set('showModal', initialState.get('showModal'))
      .set('content', initialState.get('content'));

    expect(loginReducer(state, loginWithEmailSuccess(eosAccount))).toEqual(obj);
  });

  it('LOGIN_WITH_EMAIL_ERROR', () => {
    const loginWithEmailError = 'loginWithEmailError';

    const obj = state
      .set('loginProcessing', false)
      .set('loginWithEmailError', loginWithEmailError);

    expect(loginReducer(state, loginWithEmailErr(loginWithEmailError))).toEqual(
      obj,
    );
  });
});
