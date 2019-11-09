import { select, call } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerInit,
  registerConfirmEmail,
  registerComplete,
} from 'utils/web_integration/src/wallet/register/register';

import EosioService from 'utils/eosio';
import { registerAccount } from 'utils/accountManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { INIT_EOSIO_SUCCESS } from 'containers/EosioProvider/constants';

import {
  EMAIL_FIELD as EMAIL_LOGIN_FIELD,
  PASSWORD_FIELD as PASSWORD_LOGIN_FIELD,
} from 'containers/Login/constants';

import {
  loginWithEmailWorker,
  loginWithScatterWorker,
} from 'containers/Login/saga';

import defaultSaga, {
  emailCheckingWorker,
  verifyEmailWorker,
  iHaveEosAccountWorker,
  idontHaveEosAccountWorker,
  signUpWithScatterWorker,
  showScatterSignUpFormWorker,
} from '../saga';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_EOS_ACCOUNT_SUCCESS,
  I_HAVE_EOS_ACCOUNT_ERROR,
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  STORE_KEY_FIELD,
  I_HAVE_NOT_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  WHY_DO_YOU_LIKE_US_FIELD,
  EOS_ACCOUNT_FIELD,
  DISPLAY_NAME_FIELD,
  SIGNUP_WITH_SCATTER,
  SIGNUP_WITH_SCATTER_SUCCESS,
  SIGNUP_WITH_SCATTER_ERROR,
  SHOW_SCATTER_SIGNUP_FORM,
  SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
  ACCOUNT_NOT_CREATED_NAME,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/Login/saga', () => ({
  loginWithEmailWorker: jest.fn(),
  loginWithScatterWorker: jest.fn(),
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

describe('showScatterSignUpFormWorker', () => {
  const locale = 'en';

  describe('scatter is not installed', () => {
    const generator = showScatterSignUpFormWorker();

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    it('select @locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('eosService initialization', () => {
      eosService.scatterInstalled = false;
      EosioService.mockImplementation(() => eosService);

      generator.next(locale);
      expect(eosService.init).toHaveBeenLastCalledWith(null, true);
    });

    it('put @eosServise to store', () => {
      const step = generator.next();
      expect(step.value.type).toBe(INIT_EOSIO_SUCCESS);
    });

    it('scatter is not installed', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SHOW_SCATTER_SIGNUP_FORM_ERROR);
    });
  });

  describe('scatter account is not selected', () => {
    const account = null;

    const generator = showScatterSignUpFormWorker();

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next();

    it('forgetIdentity', () => {
      eosService.scatterInstalled = true;
      eosService.selectedScatterAccount = null;
      EosioService.mockImplementation(() => eosService);

      expect(eosService.forgetIdentity).toHaveBeenCalledTimes(0);
      generator.next();
      expect(eosService.forgetIdentity).toHaveBeenCalledTimes(1);
    });

    it('select account', () => {
      expect(eosService.selectAccount).toHaveBeenCalledTimes(0);
      generator.next();
      expect(eosService.selectAccount).toHaveBeenCalledTimes(1);
    });

    it('handling error: user is not selected', () => {
      const step = generator.next(account);
      expect(step.value.type).toBe(SHOW_SCATTER_SIGNUP_FORM_ERROR);
    });
  });

  describe('user is already registered in Peeranha, showScatterSignUpFormSuccess FAILED', () => {
    const account = 'account';
    const profileInfo = { account };

    const generator = showScatterSignUpFormWorker();

    eosService.scatterInstalled = true;
    eosService.selectedScatterAccount = null;

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next();
    generator.next();
    generator.next();

    it('getting of profileInfo', () => {
      generator.next(account);
      expect(getProfileInfo).toHaveBeenCalledWith(account, eosService);
    });

    it('error handling', () => {
      const step = generator.next(profileInfo);
      expect(step.value.type).toBe(SHOW_SCATTER_SIGNUP_FORM_ERROR);
    });
  });

  describe('user is not IN system, SUCCESS showScatterSignUpFormSuccess', () => {
    const account = 'account';
    const profileInfo = null;

    const generator = showScatterSignUpFormWorker();

    eosService.scatterInstalled = true;
    eosService.selectedScatterAccount = null;

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next();
    generator.next();
    generator.next();
    generator.next(account);
    generator.next(profileInfo);

    it('showScatterSignUpFormSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SHOW_SCATTER_SIGNUP_FORM_SUCCESS);
    });

    it('redirection', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.signup.displayName.name,
      );
    });
  });
});

describe('signUpWithScatterWorker', () => {
  const eosAccount = 'account';
  const displayName = 'displayName';

  const val = {
    [EOS_ACCOUNT_FIELD]: eosAccount,
    [DISPLAY_NAME_FIELD]: displayName,
  };

  const generator = signUpWithScatterWorker({ val });

  it('select @eosService', () => {
    select.mockImplementation(() => eosService);
    const step = generator.next();
    expect(step.value).toEqual(eosService);
  });

  it('registerAccount', () => {
    expect(registerAccount).toHaveBeenCalledTimes(0);
    generator.next();
    expect(registerAccount).toHaveBeenCalledTimes(1);
  });

  it('loginWithScatterWorker', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(loginWithScatterWorker);
  });

  it('signUpWithScatterSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toEqual(SIGNUP_WITH_SCATTER_SUCCESS);
  });

  it('redirection', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(routes.questions());
  });

  it('error handling', () => {
    const step = generator.throw('new error');
    expect(step.value.type).toEqual(SIGNUP_WITH_SCATTER_ERROR);
  });
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

    const generator = idontHaveEosAccountWorker({ val });

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
      expect(step.value.type).toBe(I_HAVE_NOT_EOS_ACCOUNT_ERROR);
    });
  });

  describe('registerComplete SUCCESS, readyToUse true', () => {
    const response = {
      OK: true,
      body: {
        readyToUse: true,
      },
    };

    const generator = idontHaveEosAccountWorker({ val });

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
      expect(step.value.type).toBe(I_HAVE_NOT_EOS_ACCOUNT_SUCCESS);
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

    const generator = idontHaveEosAccountWorker({ val });

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

describe('iHaveEosAccountWorker', () => {
  const email = 'email';
  const locale = 'en';
  const encryptionKey = 'encryptionKey';

  const eosActivePrivateKey = 'eosActivePrivateKey';
  const eosActivePublicKey = 'eosActivePublicKey';
  const eosOwnerPrivateKey = 'eosOwnerPrivateKey';
  const eosOwnerPublicKey = 'eosOwnerPublicKey';
  const masterKey = 'masterKey';
  const password = 'password';
  const storeKey = false;

  const accountInfo = {
    permissions: [
      {
        perm_name: 'active',
        required_auth: {
          keys: [
            {
              key: eosActivePublicKey,
            },
          ],
        },
      },
      {
        perm_name: 'owner',
        required_auth: {
          keys: [
            {
              key: eosOwnerPublicKey,
            },
          ],
        },
      },
    ],
  };

  const val = {
    [EOS_ACTIVE_PRIVATE_KEY_FIELD]: eosActivePrivateKey,
    [EOS_OWNER_PRIVATE_KEY_FIELD]: eosOwnerPrivateKey,
    [MASTER_KEY_FIELD]: masterKey,
    [PASSWORD_FIELD]: password,
    [STORE_KEY_FIELD]: storeKey,
  };

  const props = {
    email,
    keys: {
      activeKey: {
        private: val[EOS_ACTIVE_PRIVATE_KEY_FIELD],
      },
      ownerKey: {
        private: val[EOS_OWNER_PRIVATE_KEY_FIELD],
      },
    },
    masterKey: val[MASTER_KEY_FIELD],
    password: val[PASSWORD_FIELD],
  };

  describe('registerComplete FAILED', () => {
    const response = {
      OK: false,
      errorCode: 1,
    };

    const generator = iHaveEosAccountWorker({ val });

    it('select @locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('select @eos', () => {
      select.mockImplementation(() => eosService);
      const step = generator.next(locale);
      expect(step.value).toEqual(eosService);
    });

    it('select @encryptionKey', () => {
      select.mockImplementation(() => encryptionKey);
      const step = generator.next(eosService);
      expect(step.value).toEqual(encryptionKey);
    });

    it('select @email', () => {
      select.mockImplementation(() => email);
      const step = generator.next(encryptionKey);
      expect(step.value).toEqual(email);
    });

    it('accountInfo', () => {
      generator.next(email);
      expect(call).toHaveBeenCalledWith(
        eosService.getAccount,
        val[EOS_ACCOUNT_FIELD],
      );
    });

    it('get eosActivePublicKey', () => {
      generator.next(accountInfo);
      expect(call).toHaveBeenCalledWith(
        eosService.privateToPublic,
        val[EOS_ACTIVE_PRIVATE_KEY_FIELD],
      );
    });

    it('get eosOwnerPublicKey', () => {
      generator.next(eosActivePublicKey);
      expect(call).toHaveBeenCalledWith(
        eosService.privateToPublic,
        val[EOS_OWNER_PRIVATE_KEY_FIELD],
      );
    });

    it('registerComplete', () => {
      registerComplete.mockImplementation(() => response);

      generator.next(eosOwnerPublicKey);
      expect(registerComplete).toHaveBeenCalledWith(
        props,
        encryptionKey,
        Boolean(val[STORE_KEY_FIELD]),
      );
    });

    it('error handling', () => {
      const step = generator.next();
      expect(step.value.type).toBe(I_HAVE_EOS_ACCOUNT_ERROR);
    });
  });

  describe('no accountInfo', () => {
    const generator = iHaveEosAccountWorker({ val });

    generator.next();
    generator.next(locale);
    generator.next(eosService);
    generator.next(encryptionKey);
    generator.next(email);

    it('error handling', () => {
      const step = generator.next(null);
      expect(step.value.type).toBe(I_HAVE_EOS_ACCOUNT_ERROR);
    });
  });

  describe('registerComplete SUCCESS', () => {
    const response = {
      OK: true,
      errorCode: 1,
    };

    const generator = iHaveEosAccountWorker({ val });

    registerComplete.mockImplementation(() => response);

    generator.next();
    generator.next(locale);
    generator.next(eosService);
    generator.next(encryptionKey);
    generator.next(email);
    generator.next(accountInfo);
    generator.next(eosActivePublicKey);
    generator.next(eosOwnerPublicKey);

    it('loginWithEmailWorker', () => {
      generator.next(response);
      expect(call).toHaveBeenCalledWith(loginWithEmailWorker, {
        val: {
          [EMAIL_LOGIN_FIELD]: email,
          [PASSWORD_LOGIN_FIELD]: password,
        },
      });
    });

    it('iHaveEosAccountSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(I_HAVE_EOS_ACCOUNT_SUCCESS);
    });

    it('redirection', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(routes.questions());
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

    const generator = verifyEmailWorker({ verificationCode });

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
      body: { encryptionKey },
    };

    const generator = verifyEmailWorker({ verificationCode });

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
        routes.signup.haveEosAccount.name,
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

    const generator = emailCheckingWorker({ email });

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

    const generator = emailCheckingWorker({ email });

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

  it('I_HAVE_EOS_ACCOUNT', () => {
    const step = generator.next();
    expect(step.value).toBe(I_HAVE_EOS_ACCOUNT);
  });

  it('I_HAVE_NOT_EOS_ACCOUNT', () => {
    const step = generator.next();
    expect(step.value).toBe(I_HAVE_NOT_EOS_ACCOUNT);
  });

  it('SIGNUP_WITH_SCATTER', () => {
    const step = generator.next();
    expect(step.value).toBe(SIGNUP_WITH_SCATTER);
  });

  it('SHOW_SCATTER_SIGNUP_FORM', () => {
    const step = generator.next();
    expect(step.value).toBe(SHOW_SCATTER_SIGNUP_FORM);
  });
});
