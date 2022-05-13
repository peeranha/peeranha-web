import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import signUpReducer, { initialState } from '../reducer';

import {
  checkEmail,
  checkEmailSuccess,
  checkEmailErr,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailErr,
  signUpViaEmailComplete,
  signUpViaEmailCompleteSuccess,
  signUpViaEmailCompleteError,
  putKeysToState,
  setReducerDefault,
} from '../actions';

import { VERIFICATION_FIELD } from '../constants';

describe('signUpReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
      keys: null,
    });
  });

  it('returns the initial state', () => {
    expect(signUpReducer(state, {})).toEqual(state);
  });

  it('EMAIL_CHECKING', () => {
    const email = 'email';
    const obj = state.set('email', email).set('emailChecking', true);
    expect(signUpReducer(state, checkEmail(email))).toEqual(obj);
  });

  it('EMAIL_CHECKING_SUCCESS', () => {
    const obj = state.set('emailChecking', false);
    expect(signUpReducer(state, checkEmailSuccess())).toEqual(obj);
  });

  it('EMAIL_CHECKING_ERROR', () => {
    const emailCheckingError = 'emailCheckingError';
    const obj = state
      .set('emailChecking', false)
      .set('emailCheckingError', emailCheckingError);

    expect(signUpReducer(state, checkEmailErr(emailCheckingError))).toEqual(
      obj,
    );
  });

  it('EMAIL_VERIFICATION', () => {
    const verificationCode = 'verificationCode';

    const values = fromJS({
      [VERIFICATION_FIELD]: verificationCode,
    });

    const obj = state
      .set('verificationCode', verificationCode)
      .set('emailVerificationProcessing', true);

    expect(signUpReducer(state, verifyEmail(values))).toEqual(obj);
  });

  it('EMAIL_VERIFICATION_SUCCESS', () => {
    const encryptionKey = 'encryptionKey';

    const obj = state
      .set('encryptionKey', encryptionKey)
      .set('emailVerificationProcessing', false);

    expect(signUpReducer(state, verifyEmailSuccess(encryptionKey))).toEqual(
      obj,
    );
  });

  it('EMAIL_VERIFICATION_ERROR', () => {
    const verifyEmailError = 'verifyEmailError';

    const obj = state
      .set('verifyEmailError', verifyEmailError)
      .set('emailVerificationProcessing', false);

    expect(signUpReducer(state, verifyEmailErr(verifyEmailError))).toEqual(obj);
  });

  it('I_HAVE_NOT_EOS_ACCOUNT', () => {
    const values = fromJS({
      [VERIFICATION_FIELD]: VERIFICATION_FIELD,
    });

    const obj = state.set('idontHaveEosAccountProcessing', true);

    expect(signUpReducer(state, signUpViaEmailComplete(values))).toEqual(obj);
  });

  it('I_HAVE_NOT_EOS_ACCOUNT_SUCCESS', () => {
    const obj = state.set('idontHaveEosAccountProcessing', false);
    expect(signUpReducer(state, signUpViaEmailCompleteSuccess())).toEqual(obj);
  });

  it('I_HAVE_NOT_EOS_ACCOUNT_ERROR', () => {
    const idontHaveEosAccountError = 'idontHaveEosAccountError';
    const obj = state
      .set('idontHaveEosAccountProcessing', false)
      .set('idontHaveEosAccountError', idontHaveEosAccountError);

    expect(
      signUpReducer(
        state,
        signUpViaEmailCompleteError(idontHaveEosAccountError),
      ),
    ).toEqual(obj);
  });

  describe('PUT_KEYS_TO_STATE', () => {
    it('MERGE if @keys are in state', () => {
      const initialKeys = {
        a: 1,
        b: 2,
      };

      const newKeys = {
        c: 3,
        d: 4,
      };

      const initialStateWithKeys = state.set('keys', initialKeys);
      const updatedState = state.set('keys', {
        ...initialKeys,
        ...newKeys,
      });

      expect(
        signUpReducer(initialStateWithKeys, putKeysToState(newKeys)),
      ).toEqual(updatedState);
    });

    it('SET if @keys are NOT in state', () => {
      const initialKeys = null;

      const newKeys = {
        c: 3,
        d: 4,
      };

      const initialStateWithKeys = state.set('keys', initialKeys);
      const updatedState = state.set('keys', newKeys);

      expect(
        signUpReducer(initialStateWithKeys, putKeysToState(newKeys)),
      ).toEqual(updatedState);
    });
  });

  describe('LOCATION_CHANGE', () => {
    it('remove @keys from state if user IS not in signUp pages', () => {
      window.location = {
        pathname: {
          match: jest.fn().mockImplementationOnce(() => false),
        },
      };

      expect(signUpReducer(state, { type: LOCATION_CHANGE })).toEqual(
        state.set('keys', initialState.get('keys')),
      );
    });

    it('do NOT remove @keys from state if user IS in signUp pages', () => {
      window.location = {
        pathname: {
          match: jest.fn().mockImplementationOnce(() => true),
        },
      };

      expect(signUpReducer(state, { type: LOCATION_CHANGE })).toEqual(state);
    });
  });

  it('SET_REDUCER_DEFAULT', () => {
    expect(signUpReducer(state, setReducerDefault())).toEqual(initialState);
  });
});
