import { fromJS } from 'immutable';

import changePasswordByPreviousReducer, { initialState } from '../reducer';

import {
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  submitEmail,
  submitEmailSuccess,
  submitEmailErr,
  changePassword,
  changePasswordSuccess,
  changePasswordErr,
  showChangePasswordModal,
  hideChangePasswordModal,
} from '../actions';

import {
  CODE_FIELD,
  EMAIL_FIELD,
  SUBMIT_EMAIL_FORM,
  CHANGE_PASSWORD_FORM,
} from '../constants';

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
    const content = 'content';
    const obj = state.set('showModal', true).set('content', content);

    expect(
      changePasswordByPreviousReducer(state, showChangePasswordModal(content)),
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
      changePasswordByPreviousReducer(state, changePassword(args)),
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

  it('sendEmail', () => {
    const email = 'email';

    const args = [
      fromJS({
        [EMAIL_FIELD]: email,
      }),
      () => null,
      { reset: jest.fn() },
    ];

    const obj = state.set('sendEmailProcessing', true).set('email', email);

    expect(changePasswordByPreviousReducer(state, sendEmail(args))).toEqual(
      obj,
    );
  });

  it('sendEmailSuccess', () => {
    const obj = state
      .set('sendEmailProcessing', false)
      .set('content', SUBMIT_EMAIL_FORM);

    expect(changePasswordByPreviousReducer(state, sendEmailSuccess())).toEqual(
      obj,
    );
  });

  it('sendEmailErr', () => {
    const sendEmailError = 'sendEmailError';
    const obj = state
      .set('sendEmailProcessing', false)
      .set('sendEmailError', sendEmailError);

    expect(
      changePasswordByPreviousReducer(state, sendEmailErr(sendEmailError)),
    ).toEqual(obj);
  });

  it('submitEmail', () => {
    const verificationCode = 'verificationCode';

    const args = [
      fromJS({
        [CODE_FIELD]: verificationCode,
      }),
      () => null,
      { reset: jest.fn() },
    ];

    const obj = state
      .set('submitEmailProcessing', true)
      .set('verificationCode', verificationCode);

    expect(changePasswordByPreviousReducer(state, submitEmail(args))).toEqual(
      obj,
    );
  });

  it('submitEmailSuccess', () => {
    const obj = state
      .set('submitEmailProcessing', false)
      .set('content', CHANGE_PASSWORD_FORM);

    expect(
      changePasswordByPreviousReducer(state, submitEmailSuccess()),
    ).toEqual(obj);
  });

  it('submitEmailErr', () => {
    const submitEmailError = 'submitEmailError';
    const obj = state
      .set('submitEmailProcessing', false)
      .set('submitEmailError', submitEmailError);

    expect(
      changePasswordByPreviousReducer(state, submitEmailErr(submitEmailError)),
    ).toEqual(obj);
  });
});
