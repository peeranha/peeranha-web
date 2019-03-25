import { showLoginModal, hideLoginModal } from '../actions';

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_DEFAULT_LOGIN_MODAL,
} from '../constants';

describe('Login actions', () => {
  describe('showLoginModal', () => {
    it('has a type of SHOW_LOGIN_MODAL', () => {
      const content = 'content';
      const expected1 = {
        type: SHOW_LOGIN_MODAL,
        content,
      };
      const expected2 = {
        type: SHOW_LOGIN_MODAL,
        content: SHOW_DEFAULT_LOGIN_MODAL,
      };
      expect(showLoginModal(content)).toEqual(expected1);
      expect(showLoginModal()).toEqual(expected2);
    });

    it('HIDE_LOGIN_MODAL', () => {
      const expected = {
        type: HIDE_LOGIN_MODAL,
      };
      expect(hideLoginModal()).toEqual(expected);
    });
  });
});
