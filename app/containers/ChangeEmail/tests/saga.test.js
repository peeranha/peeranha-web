/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { LOGOUT } from 'containers/Logout/constants';

import defaultSaga, {
  sendOldEmailWorker,
  confirmOldEmailWorker,
  changeEmailWorker,
} from '../saga';

import {
  CHANGE_EMAIL,
  CHANGE_EMAIL_ERROR,
  SEND_OLD_EMAIL,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL,
  CONFIRM_OLD_EMAIL_ERROR,
  NEW_EMAIL_FIELD,
  PASSWORD_FIELD,
  SEND_OLD_EMAIL_SUCCESS,
  CONFIRM_OLD_EMAIL_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
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

describe('sendOldEmailWorker', () => {
  const resetForm = jest.fn();
  const email = 'email';
  const locale = 'en';

  describe('sendOldEmailWorker FAILED', () => {
    const generator = sendOldEmailWorker({ resetForm, email });

    const response = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsInit.mockImplementation(() => response);

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('call changeCredentialsInit', () => {
      generator.next(locale);
      expect(changeCredentialsInit).toHaveBeenCalledWith(email);
    });

    it('error handling with talking toast', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SEND_OLD_EMAIL_ERROR);
    });
  });

  describe('sendOldEmailWorker SUCCESS', () => {
    const generator = sendOldEmailWorker({ resetForm, email });

    const response = {
      OK: true,
    };

    changeCredentialsInit.mockImplementation(() => response);

    generator.next();
    generator.next(locale);

    it('finish with @sendOldEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SEND_OLD_EMAIL_SUCCESS);
    });

    it('resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });
});

describe('confirmOldEmailWorker', () => {
  const resetForm = jest.fn();
  const email = 'email';
  const verificationCode = 'verificationCode';
  const locale = 'en';

  describe('confirmOldEmailWorker FAILED', () => {
    const generator = confirmOldEmailWorker({ resetForm, verificationCode });

    const response = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsConfirm.mockImplementation(() => response);

    it('select email', () => {
      select.mockImplementation(() => email);
      const step = generator.next();
      expect(step.value).toEqual(email);
    });

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(email);
      expect(step.value).toEqual(locale);
    });

    it('call changeCredentialsConfirm', () => {
      generator.next(locale);
      expect(changeCredentialsConfirm).toHaveBeenCalledWith(
        email,
        verificationCode,
      );
    });

    it('error handling with talking toast', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(CONFIRM_OLD_EMAIL_ERROR);
    });
  });

  describe('confirmOldEmailWorker SUCCESS', () => {
    const generator = confirmOldEmailWorker({ resetForm, verificationCode });

    const response = {
      OK: true,
    };

    changeCredentialsConfirm.mockImplementation(() => response);

    generator.next();
    generator.next(email);
    generator.next(locale);

    it('finish with @confirmOldEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(CONFIRM_OLD_EMAIL_SUCCESS);
    });

    it('resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });
});

describe('changeEmailWorker', () => {
  const resetForm = jest.fn();
  const locale = 'en';
  const password = 'password';
  const code = 'code';
  const oldEmail = 'oldEmail';
  const newEmail = 'newEmail';
  const encryptionKey = 'encryptionKey';

  const values = {
    [PASSWORD_FIELD]: password,
    [NEW_EMAIL_FIELD]: newEmail,
  };

  describe('SUCCESS', () => {
    const generator = changeEmailWorker({ resetForm, values });

    const changeCredentialsGetKeysByPwdResponse = {
      OK: true,
      body: {
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

    it('select oldEmail', () => {
      select.mockImplementation(() => oldEmail);
      const step = generator.next();
      expect(step.value).toEqual(oldEmail);
    });

    it('select verificationCode', () => {
      select.mockImplementation(() => code);
      const step = generator.next(oldEmail);
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
        oldEmail,
        password,
        code,
      );
    });

    it('call changeCredentialsComplete', () => {
      generator.next(changeCredentialsGetKeysByPwdResponse);
      expect(changeCredentialsComplete).toHaveBeenCalledWith(
        { email: newEmail },
        oldEmail,
        encryptionKey,
      );
    });

    it('logout', () => {
      const step = generator.next(changeCredentialsCompleteResponse);
      expect(step.value.type).toBe(LOGOUT);
    });

    it('changeEmailSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(CHANGE_EMAIL_SUCCESS);
    });

    it('call resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });

  describe('FAILED, trying to change email', () => {
    const generator = changeEmailWorker({ resetForm, values });

    const changeCredentialsGetKeysByPwdResponse = {
      OK: true,
      body: {
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
    generator.next(oldEmail);
    generator.next(code);
    generator.next(locale);
    generator.next(changeCredentialsGetKeysByPwdResponse);

    it('error handling', () => {
      const step = generator.next(changeCredentialsCompleteResponse);
      expect(step.value.type).toBe(CHANGE_EMAIL_ERROR);
    });
  });

  describe('FAILED, trying to get keys', () => {
    const generator = changeEmailWorker({ resetForm, values });

    const changeCredentialsGetKeysByPwdResponse = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsGetKeysByPwd.mockImplementation(
      () => changeCredentialsGetKeysByPwdResponse,
    );

    generator.next();
    generator.next(oldEmail);
    generator.next(code);
    generator.next(locale);

    it('error handling', () => {
      const step = generator.next(changeCredentialsGetKeysByPwdResponse);
      expect(step.value.type).toBe(CHANGE_EMAIL_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SEND_OLD_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_OLD_EMAIL);
  });

  it('CONFIRM_OLD_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(CONFIRM_OLD_EMAIL);
  });

  it('CHANGE_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toEqual(CHANGE_EMAIL);
  });

  it('errorToastHandling', () => {
    const step = generator.next();
    expect(step.value).toEqual([
      CHANGE_EMAIL_ERROR,
      SEND_OLD_EMAIL_ERROR,
      CONFIRM_OLD_EMAIL_ERROR,
    ]);
  });
});
