/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { login } from 'utils/web_integration/src/wallet/login/login';
import Cookies from 'utils/cookies';

import defaultSaga, { showActiveKeyWorker } from '../saga';

import {
  SHOW_ACTIVE_KEY,
  SHOW_ACTIVE_KEY_SUCCESS,
  SHOW_ACTIVE_KEY_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/web_integration/src/wallet/login/login', () => ({
  login: jest.fn(),
}));

jest.mock('utils/cookies', () => ({
  get: jest.fn(),
}));

describe('showActiveKeyWorker', () => {
  const resetForm = jest.fn();
  const password = 'password';
  const email = 'email';
  const locale = 'en';

  Cookies.get.mockImplementation(() => email);

  describe('showActiveKeyWorker FAILED', () => {
    const generator = showActiveKeyWorker({ resetForm, password });

    const response = {
      OK: false,
      errorCode: 1,
    };

    login.mockImplementation(() => response);

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('call login', () => {
      generator.next(locale);
      expect(login).toHaveBeenCalledWith(email, password);
    });

    it('error handling with talking toast', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SHOW_ACTIVE_KEY_ERROR);
    });
  });

  describe('showActiveKeyWorker SUCCESS', () => {
    const activeKey = 'activeKey';
    const generator = showActiveKeyWorker({ resetForm, password });

    const response = {
      OK: true,
      body: {
        activeKey,
      },
    };

    login.mockImplementation(() => response);

    generator.next();
    generator.next(locale);

    it('finish with @showActiveKeySuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SHOW_ACTIVE_KEY_SUCCESS);
    });

    it('resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SHOW_ACTIVE_KEY', () => {
    const step = generator.next();
    expect(step.value).toBe(SHOW_ACTIVE_KEY);
  });

  it('SHOW_ACTIVE_KEY_ERROR', () => {
    const step = generator.next();
    expect(step.value).toEqual([SHOW_ACTIVE_KEY_ERROR]);
  });
});
