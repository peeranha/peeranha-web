import { fromJS } from 'immutable';

import deleteAccountReducer, { initialState } from '../reducer';

import {
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountErr,
  showDeleteAccountModal,
  hideDeleteAccountModal,
} from '../actions';

import { EMAIL_FIELD, SUBMIT_EMAIL_FORM, EMAIL_FORM } from '../constants';

describe('deleteAccountReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(deleteAccountReducer(state, {})).toEqual(state);
  });

  it('showDeleteAccountModal', () => {
    const obj = state.set('showModal', true).set('content', EMAIL_FORM);

    expect(deleteAccountReducer(state, showDeleteAccountModal())).toEqual(obj);
  });

  it('hideDeleteAccountModal', () => {
    const obj = state
      .set('showModal', false)
      .set('content', initialState.get('content'));

    expect(deleteAccountReducer(state, hideDeleteAccountModal())).toEqual(obj);
  });

  it('deleteAccount', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];
    const obj = state.set('deleteAccountProcessing', true);

    expect(deleteAccountReducer(state, deleteAccount(args))).toEqual(obj);
  });

  it('deleteAccountSuccess', () => {
    const obj = state
      .set('deleteAccountProcessing', false)
      .set('content', initialState.get('content'))
      .set('showModal', initialState.get('showModal'));

    expect(deleteAccountReducer(state, deleteAccountSuccess())).toEqual(obj);
  });

  it('deleteAccountErr', () => {
    const deleteAccountError = 'deleteAccountError';
    const obj = state
      .set('deleteAccountProcessing', false)
      .set('deleteAccountError', deleteAccountError);

    expect(
      deleteAccountReducer(state, deleteAccountErr(deleteAccountError)),
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

    expect(deleteAccountReducer(state, sendEmail(args))).toEqual(obj);
  });

  it('sendEmailSuccess', () => {
    const obj = state
      .set('sendEmailProcessing', false)
      .set('content', SUBMIT_EMAIL_FORM);

    expect(deleteAccountReducer(state, sendEmailSuccess())).toEqual(obj);
  });

  it('sendEmailErr', () => {
    const sendEmailError = 'sendEmailError';
    const obj = state
      .set('sendEmailProcessing', false)
      .set('sendEmailError', sendEmailError);

    expect(deleteAccountReducer(state, sendEmailErr(sendEmailError))).toEqual(
      obj,
    );
  });
});
