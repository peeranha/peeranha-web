import {select, call} from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerInit,
  registerConfirmEmail,
  registerComplete,
} from 'utils/web_integration/src/wallet/register/register';

import {
  EMAIL_FIELD as EMAIL_LOGIN_FIELD,
  PASSWORD_FIELD as PASSWORD_LOGIN_FIELD,
} from 'containers/Login/constants';

import {
  loginWithEmailWorker,
} from 'containers/Login/saga';

import defaultSaga, {
  emailCheckingWorker,
  verifyEmailWorker,
  signUpComplete,
} from '../saga';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  SIGN_UP_VIA_EMAIL,
  SIGN_UP_VIA_EMAIL_SUCCESS,
  SIGN_UP_VIA_EMAIL_ERROR,
  WHY_DO_YOU_LIKE_US_FIELD,
  ACCOUNT_NOT_CREATED_NAME,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {
  }),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/Login/saga', () => ({
  loginWithEmailWorker: jest.fn(),
}));

jest.mock('utils/web_integration/src/wallet/register/register', () => ({
  registerInit: jest.fn(),
  registerConfirmEmail: jest.fn(),
  registerComplete: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('utils/accountManagement', () => ({
  registerAccount: jest.fn(),
}));

jest.mock('utils/eosio');

const eosService = {
  getAccount: jest.fn(),
  privateToPublic: jest.fn(),
};

eosService.init = jest.fn();
eosService.getSelectedAccount = jest.fn();
eosService.forgetIdentity = jest.fn();
eosService.selectAccount = jest.fn();

beforeEach(() => {
  eosService.init.mockClear();
  call.mockClear();
  eosService.getSelectedAccount.mockClear();
  eosService.forgetIdentity.mockClear();
  eosService.selectAccount.mockClear();
});

describe('idontHaveEosAccountWorker', () => {
  const email = 'email';
  const locale = 'en';
  const encryptionKey = 'encryptionKey';
  const message = 'message';

  const masterKey = 'masterKey';
  const password = 'password';
  const storeKeys = true;
  const keys = {};

  const val = {
    [MASTER_KEY_FIELD]: masterKey,
    [PASSWORD_FIELD]: password,
    [WHY_DO_YOU_LIKE_US_FIELD]: message,
  };

  const props = {
    email,
    keys,
    masterKey: val[MASTER_KEY_FIELD],
    password: val[PASSWORD_FIELD],
    eosAccountName: ACCOUNT_NOT_CREATED_NAME,
  };

  describe('registerComplete FAILED', () => {
    const response = {
      OK: false,
      errorCode: 1,
    };

    const generator = signUpComplete({val});

    it('select @locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('select @keys', () => {
      select.mockImplementation(() => keys);
      const step = generator.next(locale);
      expect(step.value).toEqual(keys);
    });

    it('select @email', () => {
      select.mockImplementation(() => email);
      const step = generator.next(keys);
      expect(step.value).toEqual(email);
    });

    it('select @encryptionKey', () => {
      select.mockImplementation(() => encryptionKey);
      const step = generator.next(email);
      expect(step.value).toEqual(encryptionKey);
    });

    it('registerComplete', () => {
      registerComplete.mockImplementation(() => response);

      generator.next(encryptionKey);
      expect(registerComplete).toHaveBeenCalledWith(
        props,
        encryptionKey,
        storeKeys,
        message,
      );
    });

    it('error handling', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SIGN_UP_VIA_EMAIL_ERROR);
    });
  });

  describe('registerComplete SUCCESS, readyToUse true', () => {
    const response = {
      OK: true,
      body: {
        readyToUse: true,
      },
    };

    const generator = signUpComplete({val});

    registerComplete.mockImplementation(() => response);

    generator.next();
    generator.next(keys);
    generator.next(locale);
    generator.next(email);
    generator.next(encryptionKey);

    it('loginWithEmailWorker', () => {
      generator.next(response);
      expect(call).toHaveBeenCalledWith(loginWithEmailWorker, {
        val: {
          [EMAIL_LOGIN_FIELD]: email,
          [PASSWORD_LOGIN_FIELD]: val[PASSWORD_FIELD],
        },
      });
    });

    it('idontHaveEosAccountSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SIGN_UP_VIA_EMAIL_SUCCESS);
    });

    it('redirection', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(routes.questions());
    });
  });

  describe('registerComplete SUCCESS, readyToUse false', () => {
    const response = {
      OK: true,
      body: {
        readyToUse: false,
      },
    };

    const generator = signUpComplete({val});

    registerComplete.mockImplementation(() => response);

    generator.next();
    generator.next(keys);
    generator.next(locale);
    generator.next(email);
    generator.next(encryptionKey);
    generator.next(response);

    it('redirection', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.signup.almostDoneNoAccount.name,
      );
    });
  });
});

describe('verifyEmailWorker', () => {
  const email = 'email';
  const locale = 'en';
  const verificationCode = 'code';

  describe('registerConfirmEmail FAILED', () => {
    const response = {
      OK: false,
      errorCode: 1,
    };

    const generator = verifyEmailWorker({verificationCode});

    it('select @email', () => {
      select.mockImplementation(() => email);
      const step = generator.next();
      expect(step.value).toEqual(email);
    });

    it('select @locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(email);
      expect(step.value).toEqual(locale);
    });

    it('registerConfirmEmail', () => {
      registerConfirmEmail.mockImplementation(() => response);

      generator.next(locale);
      expect(registerConfirmEmail).toHaveBeenCalledWith(
        email,
        verificationCode,
      );
    });

    it('error handling', () => {
      const step = generator.next();
      expect(step.value.type).toBe(EMAIL_VERIFICATION_ERROR);
    });
  });

  describe('registerConfirmEmail SUCCESS', () => {
    const encryptionKey = 'encryptionKey';

    const response = {
      OK: true,
      errorCode: 1,
      body: {encryptionKey},
    };

    const generator = verifyEmailWorker({verificationCode});

    registerConfirmEmail.mockImplementation(() => response);

    generator.next();
    generator.next(email);
    generator.next(locale);

    it('checkEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(EMAIL_VERIFICATION_SUCCESS);
      expect(step.value.encryptionKey).toBe(encryptionKey);
    });

    it('redirection', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.signup.accountSetup.name,
      );
    });
  });
});

describe('emailCheckingWorker', () => {
  const email = 'email';
  const locale = 'en';

  describe('emailChecking FAILED', () => {
    const response = {
      OK: false,
      errorCode: 1,
    };

    const generator = emailCheckingWorker({email});

    it('select @locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('registerInit', () => {
      registerInit.mockImplementation(() => response);

      generator.next(locale);
      expect(registerInit).toHaveBeenCalledWith(email);
    });

    it('error handling', () => {
      const step = generator.next();
      expect(step.value.type).toBe(EMAIL_CHECKING_ERROR);
    });
  });

  describe('emailChecking SUCCESS', () => {
    const response = {
      OK: true,
      errorCode: 1,
    };

    const generator = emailCheckingWorker({email});

    registerInit.mockImplementation(() => response);

    generator.next();
    generator.next(locale);

    it('checkEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(EMAIL_CHECKING_SUCCESS);
    });

    it('redirection', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.signup.emailVerification.name,
      );
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('EMAIL_CHECKING', () => {
    const step = generator.next();
    expect(step.value).toBe(EMAIL_CHECKING);
  });

  it('EMAIL_VERIFICATION', () => {
    const step = generator.next();
    expect(step.value).toBe(EMAIL_VERIFICATION);
  });

  it('I_HAVE_NOT_EOS_ACCOUNT', () => {
    const step = generator.next();
    expect(step.value).toBe(SIGN_UP_VIA_EMAIL);
  });
});
