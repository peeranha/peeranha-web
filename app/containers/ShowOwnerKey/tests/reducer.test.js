import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import showOwnerKeyReducer, { initialState } from '../reducer';

import {
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  showOwnerKey,
  showOwnerKeySuccess,
  showOwnerKeyErr,
  showOwnerKeyModal,
  hideOwnerKeyModal,
  removeOwnerKey,
} from '../actions';

import {
  PASSWORD_FIELD,
  EMAIL_FIELD,
  SUBMIT_EMAIL_FORM,
  EMAIL_FORM,
} from '../constants';

describe('showOwnerKeyReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(showOwnerKeyReducer(state, {})).toEqual(state);
  });

  it('removeOwnerKey', () => {
    const obj = state.set('ownerKey', initialState.get('ownerKey'));
    expect(showOwnerKeyReducer(state, removeOwnerKey())).toEqual(obj);
  });

  it('showOwnerKeyModal', () => {
    const obj = state.set('showModal', true).set('content', EMAIL_FORM);
    expect(showOwnerKeyReducer(state, showOwnerKeyModal())).toEqual(obj);
  });

  it('hideOwnerKeyModal', () => {
    const obj = state
      .set('showModal', false)
      .set('content', initialState.get('content'));

    expect(showOwnerKeyReducer(state, hideOwnerKeyModal())).toEqual(obj);
  });

  it('showOwnerKey', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];
    const obj = state.set('showOwnerKeyProcessing', true);

    expect(showOwnerKeyReducer(state, showOwnerKey(...args))).toEqual(obj);
  });

  it('showOwnerKeySuccess', () => {
    const ownerKey = 'ownerKey';
    const obj = state
      .set('showOwnerKeyProcessing', false)
      .set('ownerKey', ownerKey)
      .set('content', initialState.get('content'))
      .set('showModal', initialState.get('showModal'));

    expect(showOwnerKeyReducer(state, showOwnerKeySuccess(ownerKey))).toEqual(
      obj,
    );
  });

  it('showOwnerKeyErr', () => {
    const showOwnerKeyError = 'showOwnerKeyError';
    const obj = state
      .set('showOwnerKeyProcessing', false)
      .set('showOwnerKeyError', showOwnerKeyError);

    expect(
      showOwnerKeyReducer(state, showOwnerKeyErr(showOwnerKeyError)),
    ).toEqual(obj);
  });

  it('sendEmail', () => {
    const email = 'email';
    const password = 'password';

    const args = [
      fromJS({
        [EMAIL_FIELD]: email,
        [PASSWORD_FIELD]: password,
      }),
      () => null,
      { reset: jest.fn() },
    ];

    const obj = state
      .set('sendEmailProcessing', true)
      .set('password', password);

    expect(showOwnerKeyReducer(state, sendEmail(...args))).toEqual(obj);
  });

  it('sendEmailSuccess', () => {
    const verificationCode = 'verificationCode';
    const obj = state
      .set('sendEmailProcessing', false)
      .set('content', SUBMIT_EMAIL_FORM);

    expect(
      showOwnerKeyReducer(state, sendEmailSuccess(verificationCode)),
    ).toEqual(obj);
  });

  it('sendEmailErr', () => {
    const sendEmailError = 'sendEmailError';
    const obj = state
      .set('sendEmailProcessing', false)
      .set('sendEmailError', sendEmailError);

    expect(showOwnerKeyReducer(state, sendEmailErr(sendEmailError))).toEqual(
      obj,
    );
  });

  it('LOCATION_CHANGE', () => {
    expect(showOwnerKeyReducer(state, { type: LOCATION_CHANGE })).toEqual(
      initialState,
    );
  });
});
