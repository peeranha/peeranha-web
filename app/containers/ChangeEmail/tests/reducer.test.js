import { fromJS } from 'immutable';

import changeEmailReducer, { initialState } from '../reducer';

import {
  sendOldEmail,
  sendOldEmailSuccess,
  sendOldEmailErr,
  confirmOldEmail,
  confirmOldEmailSuccess,
  confirmOldEmailErr,
  changeEmail,
  changeEmailSuccess,
  changeEmailErr,
  showChangeEmailModal,
  hideChangeEmailModal,
} from '../actions';

import {
  CODE_FIELD,
  OLD_EMAIL_FIELD,
  CONFIRM_EMAIL_FORM,
  OLD_EMAIL_FORM,
  CHANGE_EMAIL_FORM,
} from '../constants';

describe('changeEmailReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(changeEmailReducer(state, {})).toEqual(state);
  });

  it('showChangeEmailModal', () => {
    const content = 'content';
    const obj = state.set('showModal', true).set('content', OLD_EMAIL_FORM);

    expect(changeEmailReducer(state, showChangeEmailModal(content))).toEqual(
      obj,
    );
  });

  it('hideChangeEmailModal', () => {
    const obj = state.set('showModal', false);

    expect(changeEmailReducer(state, hideChangeEmailModal())).toEqual(obj);
  });

  it('changeEmail', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];
    const obj = state.set('changeEmailProcessing', true);

    expect(changeEmailReducer(state, changeEmail(...args))).toEqual(obj);
  });

  it('changeEmailSuccess', () => {
    const obj = state
      .set('changeEmailProcessing', false)
      .set('content', initialState.get('content'))
      .set('showModal', initialState.get('showModal'));

    expect(changeEmailReducer(state, changeEmailSuccess())).toEqual(obj);
  });

  it('changeEmailErr', () => {
    const changeEmailError = 'changeEmailError';
    const obj = state
      .set('changeEmailProcessing', false)
      .set('changeEmailError', changeEmailError);

    expect(changeEmailReducer(state, changeEmailErr(changeEmailError))).toEqual(
      obj,
    );
  });

  it('sendOldEmail', () => {
    const email = 'email';

    const args = [
      fromJS({
        [OLD_EMAIL_FIELD]: email,
      }),
      () => null,
      { reset: jest.fn() },
    ];

    const obj = state.set('sendOldEmailProcessing', true).set('email', email);

    expect(changeEmailReducer(state, sendOldEmail(...args))).toEqual(obj);
  });

  it('sendOldEmailSuccess', () => {
    const obj = state
      .set('sendOldEmailProcessing', false)
      .set('content', CONFIRM_EMAIL_FORM);

    expect(changeEmailReducer(state, sendOldEmailSuccess())).toEqual(obj);
  });

  it('sendOldEmailErr', () => {
    const sendOldEmailError = 'sendOldEmailError';
    const obj = state
      .set('sendOldEmailProcessing', false)
      .set('sendOldEmailError', sendOldEmailError);

    expect(
      changeEmailReducer(state, sendOldEmailErr(sendOldEmailError)),
    ).toEqual(obj);
  });

  it('confirmOldEmail', () => {
    const verificationCode = 'verificationCode';

    const args = [
      fromJS({
        [CODE_FIELD]: verificationCode,
      }),
      () => null,
      { reset: jest.fn() },
    ];

    const obj = state
      .set('confirmOldEmailProcessing', true)
      .set('verificationCode', verificationCode);

    expect(changeEmailReducer(state, confirmOldEmail(...args))).toEqual(obj);
  });

  it('confirmOldEmailSuccess', () => {
    const obj = state
      .set('confirmOldEmailProcessing', false)
      .set('content', CHANGE_EMAIL_FORM);

    expect(changeEmailReducer(state, confirmOldEmailSuccess())).toEqual(obj);
  });

  it('confirmOldEmailErr', () => {
    const confirmOldEmailError = 'confirmOldEmailError';
    const obj = state
      .set('confirmOldEmailProcessing', false)
      .set('confirmOldEmailError', confirmOldEmailError);

    expect(
      changeEmailReducer(state, confirmOldEmailErr(confirmOldEmailError)),
    ).toEqual(obj);
  });
});
