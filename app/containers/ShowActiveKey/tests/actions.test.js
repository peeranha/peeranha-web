import { fromJS } from 'immutable';

import {
  showActiveKeyModal,
  hideActiveKeyModal,
  showActiveKey,
  showActiveKeySuccess,
  showActiveKeyErr,
  removeActiveKey,
} from '../actions';

import {
  SHOW_ACTIVE_KEY_MODAL,
  HIDE_ACTIVE_KEY_MODAL,
  SHOW_ACTIVE_KEY,
  SHOW_ACTIVE_KEY_SUCCESS,
  SHOW_ACTIVE_KEY_ERROR,
  PASSWORD_FIELD,
  REMOVE_ACTIVE_KEY,
} from '../constants';

describe('showActiveKey actions', () => {
  it('showActiveKeyModal', () => {
    const expected = {
      type: SHOW_ACTIVE_KEY_MODAL,
    };

    expect(showActiveKeyModal()).toEqual(expected);
  });

  it('hideActiveKeyModal', () => {
    const expected = {
      type: HIDE_ACTIVE_KEY_MODAL,
    };

    expect(hideActiveKeyModal()).toEqual(expected);
  });

  it('showActiveKey', () => {
    const password = '1234';
    const args = [
      fromJS({ [PASSWORD_FIELD]: password }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: SHOW_ACTIVE_KEY,
      resetForm: args[2].reset,
      password,
    };

    expect(showActiveKey(...args)).toEqual(expected);
  });

  it('showActiveKeySuccess', () => {
    const activeKey = 'activeKey';
    const expected = {
      type: SHOW_ACTIVE_KEY_SUCCESS,
      activeKey,
    };

    expect(showActiveKeySuccess(activeKey)).toEqual(expected);
  });

  it('showActiveKeyErr', () => {
    const showActiveKeyError = 'showActiveKeyError';
    const expected = {
      type: SHOW_ACTIVE_KEY_ERROR,
      showActiveKeyError,
    };

    expect(showActiveKeyErr(showActiveKeyError)).toEqual(expected);
  });

  it('removeActiveKey', () => {
    const expected = {
      type: REMOVE_ACTIVE_KEY,
    };

    expect(removeActiveKey()).toEqual(expected);
  });
});
