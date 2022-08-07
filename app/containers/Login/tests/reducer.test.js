import { fromJS } from 'immutable';
import loginReducer from '../reducer';

import { showLoginModal, hideLoginModal } from '../actions';

import { EMAIL_FORM } from '../constants';

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
});
