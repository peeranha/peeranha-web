/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  getOwnerKeyInitByPwd,
  getOwnerKeyByPwd,
} from 'utils/web_integration/src/wallet/get-owner-key/get-owner-key';

import defaultSaga, { sendEmailWorker, showOwnerKeyWorker } from '../saga';

import {
  SHOW_OWNER_KEY,
  SHOW_OWNER_KEY_SUCCESS,
  SHOW_OWNER_KEY_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock(
  'utils/web_integration/src/wallet/get-owner-key/get-owner-key',
  () => ({
    getOwnerKeyInitByPwd: jest.fn(),
    getOwnerKeyByPwd: jest.fn(),
  }),
);

describe('showOwnerKeyWorker', () => {
  const resetForm = jest.fn();
  const password = 'password';
  const email = 'email';
  const locale = 'en';
  const verificationCode = 'verificationCode';
  const loginData = { email };

  describe('showOwnerKeyWorker FAILED', () => {
    const generator = showOwnerKeyWorker({ resetForm, verificationCode });

    const response = {
      OK: false,
      errorCode: 1,
    };

    getOwnerKeyByPwd.mockImplementation(() => response);

    it('select loginData', () => {
      select.mockImplementation(() => loginData);
      const step = generator.next();
      expect(step.value).toEqual(loginData);
    });

    it('select password', () => {
      select.mockImplementation(() => password);
      const step = generator.next(loginData);
      expect(step.value).toEqual(password);
    });

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(password);
      expect(step.value).toEqual(locale);
    });

    it('call getOwnerKeyByPwd', () => {
      generator.next(locale);
      expect(getOwnerKeyByPwd).toHaveBeenCalledWith(
        email,
        password,
        verificationCode,
      );
    });

    it('error handling with talking toast', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SHOW_OWNER_KEY_ERROR);
    });
  });

  describe('showOwnerKeyWorker SUCCESS', () => {
    const privateOwnerKey = 'privateOwnerKey';
    const generator = showOwnerKeyWorker({ resetForm, verificationCode });

    const response = {
      OK: true,
      body: {
        keys: {
          ownerKey: {
            private: privateOwnerKey,
          },
        },
      },
    };

    getOwnerKeyByPwd.mockImplementation(() => response);

    generator.next();
    generator.next(loginData);
    generator.next(password);
    generator.next(locale);

    it('finish with @showOwnerKeySuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SHOW_OWNER_KEY_SUCCESS);
      expect(step.value.ownerKey).toBe(privateOwnerKey);
    });

    it('resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });
});

describe('sendEmailWorker', () => {
  const resetForm = jest.fn();
  const password = 'password';
  const email = 'email';
  const locale = 'en';

  describe('sendEmailWorker FAILED', () => {
    const generator = sendEmailWorker({ resetForm, password, email });

    const response = {
      OK: false,
      errorCode: 1,
    };

    getOwnerKeyInitByPwd.mockImplementation(() => response);

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('call getOwnerKeyInitByPwd', () => {
      generator.next(locale);
      expect(getOwnerKeyInitByPwd).toHaveBeenCalledWith(email, password);
    });

    it('error handling with talking toast', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SEND_EMAIL_ERROR);
    });
  });

  describe('sendEmailWorker SUCCESS', () => {
    const generator = sendEmailWorker({ resetForm, password, email });

    const response = {
      OK: true,
    };

    getOwnerKeyInitByPwd.mockImplementation(() => response);

    generator.next();
    generator.next(locale);

    it('finish with @sendEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SEND_EMAIL_SUCCESS);
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

  it('SHOW_OWNER_KEY', () => {
    const step = generator.next();
    expect(step.value).toBe(SHOW_OWNER_KEY);
  });

  it('SEND_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_EMAIL);
  });

  it('SHOW_OWNER_KEY_ERROR', () => {
    const step = generator.next();
    expect(step.value).toEqual([SHOW_OWNER_KEY_ERROR]);
  });
});
