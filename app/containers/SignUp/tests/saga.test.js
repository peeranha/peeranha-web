/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { registerAccount } from 'utils/accountManagement';

import {
  closeModals,
  loginSignupWorker,
} from 'containers/AccountProvider/saga';

import defaultSaga, { resistrAccWorker } from '../saga';

import {
  FETCH_REGISTER_ACC,
  REGISTER_ACC_SUCCESS,
  REGISTER_ACC_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/accountManagement', () => ({
  registerAccount: jest.fn().mockImplementation(() => {}),
}));

jest.mock('containers/AccountProvider/saga', () => ({
  closeModals: jest.fn().mockImplementation(() => {}),
  loginSignupWorker: jest.fn(),
}));

describe('resistrAccWorker', () => {
  const props = {
    obj: {
      eosAccount: 'user1',
      displayName: 'user',
    },
  };
  const generator = resistrAccWorker(props);

  it('step1, eosService', () => {
    select.mockImplementation(() => props);
    const step1 = generator.next();
    expect(step1.value).toEqual(props);
  });

  it('step2, registrUser', () => {
    const registred = 'registred';

    registerAccount.mockImplementation(() => registred);
    const step2 = generator.next();
    expect(step2.value).toEqual(registred);
  });

  it('step3, registerAccSuccess', () => {
    const step3 = generator.next();
    expect(step3.value.type).toBe(REGISTER_ACC_SUCCESS);
  });

  it('step4, loginSignupWorker', () => {
    generator.next();
    expect(loginSignupWorker).toHaveBeenCalledWith({ methods: { type: null } });
  });

  it('step5, closeModals', () => {
    const close = 'closeModals';

    closeModals.mockImplementation(() => close);
    const step5 = generator.next();
    expect(step5.value).toBe(close);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(REGISTER_ACC_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('FETCH_REGISTER_ACC', () => {
    const step = generator.next();
    expect(step.value).toBe(FETCH_REGISTER_ACC);
  });
});
