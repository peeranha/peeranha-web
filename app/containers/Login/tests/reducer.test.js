import { fromJS } from 'immutable';
import loginReducer from '../reducer';

import { showLoginModal, hideLoginModal } from '../actions';
import { SHOW_DEFAULT_LOGIN_MODAL } from '../constants';

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

  it('getCurrentAccount', () => {
    const content = 'content';
    const obj1 = state.set('showModal', true).set('content', content);
    const obj2 = state
      .set('showModal', true)
      .set('content', SHOW_DEFAULT_LOGIN_MODAL);

    expect(loginReducer(state, showLoginModal(content))).toEqual(obj1);
    expect(loginReducer(state, showLoginModal())).toEqual(obj2);
  });

  it('hideLoginModal', () => {
    const obj = state.set('showModal', false);
    expect(loginReducer(state, hideLoginModal())).toEqual(obj);
  });
});
