/* eslint-disable redux-saga/yield-effects */
import { select, call, take } from 'redux-saga/effects';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { LOGOUT } from 'containers/Logout/constants';

import defaultSaga, {
  sendEmailWorker,
  submitEmailWorker,
  changePasswordWorker,
  sendAnotherCode,
  sendAnotherCodeSuccess,
} from '../saga';

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL,
  SUBMIT_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
  SUBMIT_EMAIL_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  NEW_PASSWORD_FIELD,
  OLD_PASSWORD_FIELD,
  SEND_ANOTHER_CODE,
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

describe('sendAnotherCodeSuccess', () => {
  const generator = sendAnotherCodeSuccess();

  it('take SEND_OLD_EMAIL_SUCCESS', () => {
    generator.next();
    expect(take).toHaveBeenCalledWith(SEND_EMAIL_SUCCESS);
  });

  it('call successToastHandlingWithDefaultText', () => {
    call.mockImplementationOnce(() => null);

    expect(call).toHaveBeenCalledTimes(0);
    generator.next();
    expect(call).toHaveBeenCalledTimes(1);
  });
});

describe('sendAnotherCode', () => {
  const generator = sendAnotherCode();
  const email = 'email@email.em';

  it('select email', () => {
    select.mockImplementation(() => email);
    const step = generator.next();
    expect(step.value).toEqual(email);
  });

  it('call sendEmailWorker', () => {
    call.mockImplementationOnce(() => email);

    expect(call).toHaveBeenCalledTimes(0);
    generator.next(email);
    expect(call).toHaveBeenCalledTimes(1);
  });
});

describe('sendEmailWorker', () => {
  const resetForm = jest.fn();
  const email = 'email';
  const locale = 'en';

  describe('sendEmailWorker FAILED', () => {
    const generator = sendEmailWorker({ resetForm, email });

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
      expect(step.value.type).toBe(SEND_EMAIL_ERROR);
    });
  });

  describe('sendEmailWorker SUCCESS', () => {
    const generator = sendEmailWorker({ resetForm, email });

    const response = {
      OK: true,
    };

    changeCredentialsInit.mockImplementation(() => response);

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

describe('submitEmailWorker', () => {
  const resetForm = jest.fn();
  const email = 'email';
  const verificationCode = 'verificationCode';
  const locale = 'en';

  describe('submitEmailWorker FAILED', () => {
    const generator = submitEmailWorker({ resetForm, verificationCode });

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
      expect(step.value.type).toBe(SUBMIT_EMAIL_ERROR);
    });
  });

  describe('submitEmailWorker SUCCESS', () => {
    const generator = submitEmailWorker({ resetForm, verificationCode });

    const response = {
      OK: true,
    };

    changeCredentialsConfirm.mockImplementation(() => response);

    generator.next();
    generator.next(email);
    generator.next(locale);

    it('finish with @submitEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SUBMIT_EMAIL_SUCCESS);
    });

    it('resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });
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

  it('SEND_ANOTHER_CODE', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_ANOTHER_CODE);
  });

  it('SEND_ANOTHER_CODE', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_ANOTHER_CODE);
  });

  it('SEND_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_EMAIL);
  });

  it('SUBMIT_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(SUBMIT_EMAIL);
  });

  it('CHANGE_PASSWORD', () => {
    const step = generator.next();
    expect(step.value).toEqual(CHANGE_PASSWORD);
  });

  it('errorToastHandling', () => {
    const step = generator.next();
    expect(step.value).toEqual([
      SEND_EMAIL_ERROR,
      SUBMIT_EMAIL_ERROR,
      CHANGE_PASSWORD_ERROR,
    ]);
  });
});
