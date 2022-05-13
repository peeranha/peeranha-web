/* eslint-disable redux-saga/yield-effects */
import { select, call} from 'redux-saga/effects';

import {
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { LOGOUT } from 'containers/Logout/constants';

import defaultSaga, {
  changePasswordWorker,
} from '../saga';

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  NEW_PASSWORD_FIELD,
  OLD_PASSWORD_FIELD,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  take: jest.fn(),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock(
  'utils/web_integration/src/wallet/change-credentials/change-credentials',
  () => ({
    changeCredentialsInit: jest.fn(),
    changeCredentialsConfirm: jest.fn(),
    changeCredentialsComplete: jest.fn(),
    changeCredentialsGetKeysByPwd: jest.fn(),
  }),
);

beforeEach(() => {
  call.mockClear();
});

describe('changePasswordWorker', () => {
  const resetForm = jest.fn();
  const locale = 'en';
  const oldPassword = 'oldPassword';
  const newPassword = 'newPassword';
  const code = 'code';
  const email = 'email';
  const encryptionKey = 'encryptionKey';

  const keys = {};

  const values = {
    [OLD_PASSWORD_FIELD]: oldPassword,
    [NEW_PASSWORD_FIELD]: newPassword,
  };

  describe('SUCCESS', () => {
    const generator = changePasswordWorker({ resetForm, values });

    const changeCredentialsGetKeysByPwdResponse = {
      OK: true,
      body: {
        keys,
        encryptionKey,
      },
    };

    const changeCredentialsCompleteResponse = {
      OK: true,
    };

    changeCredentialsGetKeysByPwd.mockImplementation(
      () => changeCredentialsGetKeysByPwdResponse,
    );

    changeCredentialsComplete.mockImplementation(
      () => changeCredentialsCompleteResponse,
    );

    it('select email', () => {
      select.mockImplementation(() => email);
      const step = generator.next();
      expect(step.value).toEqual(email);
    });

    it('select code', () => {
      select.mockImplementation(() => code);
      const step = generator.next(email);
      expect(step.value).toEqual(code);
    });

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(code);
      expect(step.value).toEqual(locale);
    });

    it('call changeCredentialsGetKeysByPwd', () => {
      generator.next(locale);
      expect(changeCredentialsGetKeysByPwd).toHaveBeenCalledWith(
        email,
        oldPassword,
        code,
      );
    });

    it('call changeCredentialsComplete', () => {
      generator.next(changeCredentialsGetKeysByPwdResponse);
      expect(changeCredentialsComplete).toHaveBeenCalledWith(
        { keys, password: newPassword },
        email,
        encryptionKey,
      );
    });

    it('logout', () => {
      const step = generator.next(changeCredentialsCompleteResponse);
      expect(step.value.type).toBe(LOGOUT);
    });

    it('changePasswordSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(CHANGE_PASSWORD_SUCCESS);
    });

    it('call resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });

  describe('FAILED, trying to change password', () => {
    const generator = changePasswordWorker({ resetForm, values });

    const changeCredentialsGetKeysByPwdResponse = {
      OK: true,
      body: {
        keys,
        encryptionKey,
      },
    };

    const changeCredentialsCompleteResponse = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsGetKeysByPwd.mockImplementation(
      () => changeCredentialsGetKeysByPwdResponse,
    );

    changeCredentialsComplete.mockImplementation(
      () => changeCredentialsCompleteResponse,
    );

    generator.next();
    generator.next(email);
    generator.next(code);
    generator.next(locale);
    generator.next(changeCredentialsGetKeysByPwdResponse);

    it('error handling', () => {
      const step = generator.next(changeCredentialsCompleteResponse);
      expect(step.value.type).toBe(CHANGE_PASSWORD_ERROR);
    });
  });

  describe('FAILED, trying to get keys', () => {
    const generator = changePasswordWorker({ resetForm, values });

    const changeCredentialsGetKeysByPwdResponse = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsGetKeysByPwd.mockImplementation(
      () => changeCredentialsGetKeysByPwdResponse,
    );

    generator.next();
    generator.next(email);
    generator.next(code);
    generator.next(locale);

    it('error handling', () => {
      const step = generator.next(changeCredentialsGetKeysByPwdResponse);
      expect(step.value.type).toBe(CHANGE_PASSWORD_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('CHANGE_PASSWORD', () => {
    const step = generator.next();
    expect(step.value).toEqual(CHANGE_PASSWORD);
  });
});
