import { fromJS } from 'immutable';

import {
  showChangePasswordModal,
  hideChangePasswordModal,
  changePassword,
  changePasswordSuccess,
  changePasswordErr,
} from '../actions';

import {
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../constants';

describe('showChangePassword actions', () => {
  it('showChangePasswordModal', () => {
    const expected = {
      type: SHOW_CHANGE_PASSWORD_MODAL,
    };

    expect(showChangePasswordModal()).toEqual(expected);
  });

  it('hideChangePasswordModal', () => {
    const expected = {
      type: HIDE_CHANGE_PASSWORD_MODAL,
    };

    expect(hideChangePasswordModal()).toEqual(expected);
  });

  it('changePassword', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];

    const expected = {
      type: CHANGE_PASSWORD,
      resetForm: args[2].reset,
      values: args[0].toJS(),
    };

    expect(changePassword(...args)).toEqual(expected);
  });

  it('changePasswordSuccess', () => {
    const expected = {
      type: CHANGE_PASSWORD_SUCCESS,
    };

    expect(changePasswordSuccess()).toEqual(expected);
  });

  it('changePasswordErr', () => {
    const changePasswordError = 'changePasswordError';
    const expected = {
      type: CHANGE_PASSWORD_ERROR,
      changePasswordError,
    };

    expect(changePasswordErr(changePasswordError)).toEqual(expected);
  });
});
