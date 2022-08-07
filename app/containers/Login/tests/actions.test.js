import { showLoginModal, hideLoginModal } from '../actions';

import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL } from '../constants';

describe('Login actions', () => {
  it('showLoginModal', () => {
    const expectedWithoutContent = {
      type: SHOW_LOGIN_MODAL,
    };

    expect(showLoginModal()).toEqual(expectedWithoutContent);
  });

  it('hideLoginModal', () => {
    const expected = {
      type: HIDE_LOGIN_MODAL,
    };

    expect(hideLoginModal()).toEqual(expected);
  });
});
