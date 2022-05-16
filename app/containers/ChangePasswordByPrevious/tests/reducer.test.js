import { fromJS } from 'immutable';

import changePasswordByPreviousReducer, { initialState } from '../reducer';

import {
  changePassword,
  changePasswordSuccess,
  changePasswordErr,
  showChangePasswordModal,
  hideChangePasswordModal,
} from '../actions';

import { CHANGE_PASSWORD_FORM } from '../constants';

describe('changePasswordByPreviousReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(changePasswordByPreviousReducer(state, {})).toEqual(state);
  });

  it('showChangePasswordModal', () => {
    const obj = state
      .set('showModal', true)
      .set('content', CHANGE_PASSWORD_FORM);

    expect(
      changePasswordByPreviousReducer(state, showChangePasswordModal()),
    ).toEqual(obj);
  });

  it('hideChangePasswordModal', () => {
    const obj = state
      .set('showModal', false)
      .set('content', initialState.get('content'));

    expect(
      changePasswordByPreviousReducer(state, hideChangePasswordModal()),
    ).toEqual(obj);
  });

  it('changePassword', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];
    const obj = state.set('changePasswordProcessing', true);

    expect(
      changePasswordByPreviousReducer(state, changePassword(...args)),
    ).toEqual(obj);
  });

  it('changePasswordSuccess', () => {
    const obj = state
      .set('changePasswordProcessing', false)
      .set('content', initialState.get('content'))
      .set('showModal', initialState.get('showModal'));

    expect(
      changePasswordByPreviousReducer(state, changePasswordSuccess()),
    ).toEqual(obj);
  });

  it('changePasswordErr', () => {
    const changePasswordError = 'changePasswordError';
    const obj = state
      .set('changePasswordProcessing', false)
      .set('changePasswordError', changePasswordError);

    expect(
      changePasswordByPreviousReducer(
        state,
        changePasswordErr(changePasswordError),
      ),
    ).toEqual(obj);
  });
});
