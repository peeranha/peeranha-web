/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call, take } from 'redux-saga/effects';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsGetKeysByMK,
  changeCredentialsComplete,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import defaultSaga, {
  getVerificationCodeWorker,
  verifyEmailWorker,
  changePasswordWorker,
  sendAnotherCode,
  sendAnotherCodeSuccess,
} from '../saga';

import {
  GET_VERIFICATION_CODE,
  GET_VERIFICATION_CODE_SUCCESS,
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
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
    changeCredentialsGetKeysByMK: jest.fn(),
    changeCredentialsComplete: jest.fn(),
  }),
);

beforeEach(() => {
  call.mockClear();
});

describe('sendAnotherCodeSuccess', () => {
  const generator = sendAnotherCodeSuccess();

  it('take GET_VERIFICATION_CODE_SUCCESS', () => {
    generator.next();
    expect(take).toHaveBeenCalledWith(GET_VERIFICATION_CODE_SUCCESS);
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

  it('call sendOldEmailWorker', () => {
    call.mockImplementationOnce(() => email);

    expect(call).toHaveBeenCalledTimes(0);
    generator.next(email);
    expect(call).toHaveBeenCalledTimes(1);
  });
});

describe('getVerificationCodeWorker', () => {
  const email = 'email';
  const locale = 'en';

  describe('getVerificationCodeWorker FAILED', () => {
    const generator = getVerificationCodeWorker({ email });

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
      expect(step.value.type).toBe(GET_VERIFICATION_CODE_ERROR);
    });
  });

  describe('getVerificationCodeWorker SUCCESS', () => {
    const generator = getVerificationCodeWorker({ email });

    const response = {
      OK: true,
      errorCode: 1,
    };

    changeCredentialsInit.mockImplementation(() => response);

    generator.next();
    generator.next(locale);

    it('finish with @getVerificationCodeSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(GET_VERIFICATION_CODE_SUCCESS);
    });
  });
});

describe('verifyEmailWorker', () => {
  const verificationCode = 'verificationCode';
  const locale = 'en';
  const email = 'email';

  describe('verifyEmailWorker FAILED', () => {
    const generator = verifyEmailWorker({ verificationCode });

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
      expect(step.value.type).toBe(VERIFY_EMAIL_ERROR);
    });
  });

  describe('verifyEmailWorker SUCCESS', () => {
    const generator = verifyEmailWorker({ verificationCode });

    const response = {
      OK: true,
      errorCode: 1,
    };

    changeCredentialsConfirm.mockImplementation(() => response);

    generator.next();
    generator.next(email);
    generator.next(locale);

    it('finish with @verifyEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(VERIFY_EMAIL_SUCCESS);
    });
  });
});

describe('changePasswordWorker', () => {
  const keys = { a: '1', b: '2' };
  const encryptionKey = 'encryptionKey';

  const masterKey = 'masterKey';
  const password = 'password';
  const verificationCode = 'verificationCode';
  const locale = 'en';
  const email = 'email';

  describe('getKeysByMK FAILED', () => {
    const generator = changePasswordWorker({ masterKey, password });

    const getKeysResponse = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsGetKeysByMK.mockImplementation(() => getKeysResponse);

    it('select email', () => {
      select.mockImplementation(() => email);
      const step = generator.next();
      expect(step.value).toEqual(email);
    });

    it('select verificationCode', () => {
      select.mockImplementation(() => verificationCode);
      const step = generator.next(email);
      expect(step.value).toEqual(verificationCode);
    });

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(verificationCode);
      expect(step.value).toEqual(locale);
    });

    it('call changeCredentialsGetKeysByMK', () => {
      generator.next(locale);

      expect(changeCredentialsGetKeysByMK).toHaveBeenCalledWith(
        email,
        masterKey,
        verificationCode,
      );
    });

    it('error handling with talking toast', () => {
      const step = generator.next(getKeysResponse);
      expect(step.value.type).toBe(CHANGE_PASSWORD_ERROR);
    });
  });

  describe('changeCredentialsComplete FAILED', () => {
    const generator = changePasswordWorker({ masterKey, password });

    const getKeysResponse = {
      OK: true,
      errorCode: 1,
      body: { keys, encryptionKey },
    };

    const changeCredsResponse = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsGetKeysByMK.mockImplementation(() => getKeysResponse);
    changeCredentialsComplete.mockImplementation(() => changeCredsResponse);

    generator.next();
    generator.next(email);
    generator.next(verificationCode);
    generator.next(locale);

    it('changeCredentialsComplete', () => {
      generator.next(getKeysResponse);

      expect(changeCredentialsComplete).toHaveBeenCalledWith(
        { keys, password },
        email,
        encryptionKey,
      );
    });

    it('error handling with talking toast', () => {
      const step = generator.next(changeCredsResponse);
      expect(step.value.type).toBe(CHANGE_PASSWORD_ERROR);
    });
  });

  describe('changePasswordWorker SUCCESS', () => {
    const generator = changePasswordWorker({ masterKey, password });

    const getKeysResponse = {
      OK: true,
      errorCode: 1,
      body: { keys, encryptionKey },
    };

    const changeCredsResponse = {
      OK: true,
      errorCode: 1,
    };

    changeCredentialsGetKeysByMK.mockImplementation(() => getKeysResponse);
    changeCredentialsComplete.mockImplementation(() => changeCredsResponse);

    generator.next();
    generator.next(email);
    generator.next(verificationCode);
    generator.next(locale);
    generator.next(getKeysResponse);

    it('finish with @changePasswordSuccess', () => {
      const step = generator.next(changeCredsResponse);
      expect(step.value.type).toBe(CHANGE_PASSWORD_SUCCESS);
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

  it('GET_VERIFICATION_CODE', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_VERIFICATION_CODE);
  });

  it('VERIFY_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(VERIFY_EMAIL);
  });

  it('CHANGE_PASSWORD', () => {
    const step = generator.next();
    expect(step.value).toBe(CHANGE_PASSWORD);
  });
});
