import { select } from 'redux-saga/effects';

import EosioService from 'utils/eosio';
import { getProfileInfo } from 'utils/profileManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import { registerAccount } from 'utils/accountManagement';

import { INIT_EOSIO_SUCCESS } from 'containers/EosioProvider/constants';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import defaultSaga, {
  loginWithEmailWorker,
  loginWithScatterWorker,
  finishRegistrationWorker,
} from '../saga';

import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMEMBER_ME_FIELD,
  LOGIN_WITH_SCATTER,
  LOGIN_WITH_SCATTER_ERROR,
  LOGIN_WITH_SCATTER_SUCCESS,
  FINISH_REGISTRATION,
  DISPLAY_NAME,
  FINISH_REGISTRATION_SUCCESS,
  FINISH_REGISTRATION_ERROR,
} from '../constants';

class eosService {}

eosService.init = jest.fn();
eosService.getSelectedAccount = jest.fn();
eosService.forgetIdentity = jest.fn();
eosService.selectAccount = jest.fn();

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/accountManagement', () => ({
  registerAccount: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('utils/eosio');

jest.mock('utils/web_integration/src/wallet/login/login', () => ({
  login: jest.fn(),
}));

beforeEach(() => {
  eosService.init.mockClear();
  eosService.getSelectedAccount.mockClear();
  eosService.forgetIdentity.mockClear();
  eosService.selectAccount.mockClear();
});

describe('loginWithScatterWorker', () => {
  const locale = 'en';

  describe('scatter is not installed', () => {
    const generator = loginWithScatterWorker();

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
      expect(eosService.init).toHaveBeenLastCalledWith(LOGIN_WITH_SCATTER);
    });

    it('scatter is not installed', () => {
      const step = generator.next();
      expect(step.value.type).toBe(LOGIN_WITH_SCATTER_ERROR);
    });
  });

  describe('scatter account is not selected', () => {
    const account = null;

    const generator = loginWithScatterWorker();

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);

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
      expect(step.value.type).toBe(LOGIN_WITH_SCATTER_ERROR);
    });
  });

  describe('user is not registered in Peeranha', () => {
    const account = 'account';
    const profileInfo = null;

    const generator = loginWithScatterWorker();

    eosService.scatterInstalled = true;
    eosService.selectedScatterAccount = null;

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next();
    generator.next();

    it('getting of profileInfo', () => {
      generator.next(account);
      expect(getProfileInfo).toHaveBeenCalledWith(account, eosService);
    });

    it('put profileInfo to store', () => {
      const step = generator.next(profileInfo);
      expect(step.value).toEqual(getUserProfileSuccess(profileInfo));
    });

    it('error handling, profileInfo is absent', () => {
      const step = generator.next(profileInfo);
      expect(step.value.type).toBe(LOGIN_WITH_SCATTER_ERROR);
    });
  });

  describe('user is IN system, SUCCESS login', () => {
    const account = 'account';
    const profileInfo = { account };

    const generator = loginWithScatterWorker();

    eosService.scatterInstalled = true;
    eosService.selectedScatterAccount = null;

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next();
    generator.next();
    generator.next(account);
    generator.next(profileInfo);

    it('put new EosServise to store', () => {
      const step = generator.next();
      expect(step.value.type).toBe(INIT_EOSIO_SUCCESS);
    });

    it('loginWithScatterSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(LOGIN_WITH_SCATTER_SUCCESS);
    });
  });
});

describe('loginWithEmailWorker', () => {
  const locale = 'en';
  const activeKey = { private: 'private', public: 'public' };

  const email = 'email';
  const password = 'password';

  const rememberMe = false;

  const val = {
    [EMAIL_FIELD]: email,
    [PASSWORD_FIELD]: password,
    [REMEMBER_ME_FIELD]: rememberMe,
  };

  describe('call @login FAILED', () => {
    const generator = loginWithEmailWorker({ val });

    const loginResponse = {
      OK: false,
      errorCode: 1,
    };

    it('select @locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('call @login method', () => {
      generator.next(locale);
      expect(login).toHaveBeenCalledWith(email, password);
    });

    it('error handling with talking toast', () => {
      const step = generator.next(loginResponse);
      expect(step.value.type).toBe(LOGIN_WITH_EMAIL_ERROR);
    });
  });

  describe('call @login is SUCCESS; user is not registered in Peeranha', () => {
    const selectedAccount = null;
    const profileInfo = null;

    const generator = loginWithEmailWorker({ val });

    const loginResponse = {
      OK: true,
      errorCode: 1,
      body: { activeKey },
    };

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);

    it('initialization of new EosService', () => {
      generator.next(loginResponse);

      expect(eosService.init).toHaveBeenLastCalledWith(
        LOGIN_WITH_EMAIL,
        activeKey.private,
      );
    });

    it('getting of selected @eosAccount', () => {
      eosService.getSelectedAccount.mockImplementation(() => selectedAccount);
      EosioService.mockImplementation(() => eosService);

      expect(eosService.getSelectedAccount).toHaveBeenCalledTimes(0);
      generator.next();
      expect(eosService.getSelectedAccount).toHaveBeenCalledTimes(1);
    });

    it('getting of profileInfo', () => {
      generator.next(selectedAccount);
      expect(getProfileInfo).toHaveBeenCalledWith(selectedAccount, eosService);
    });

    it('put new eosService to redux store', () => {
      const step = generator.next(profileInfo);
      expect(step.value.type).toBe(INIT_EOSIO_SUCCESS);
    });

    it('@loginWithEmailSuccess put @eosAccount', () => {
      const step = generator.next();
      expect(step.value.type).toBe(LOGIN_WITH_EMAIL_SUCCESS);
      expect(step.value.eosAccount).toBe(selectedAccount);
    });

    it('generator has to return @null', () => {
      const step = generator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('call @login is SUCCESS; user is registered in Peeranha', () => {
    const selectedAccount = 'user1';
    const profileInfo = { account: selectedAccount };

    const generator = loginWithEmailWorker({ val });

    const loginResponse = {
      OK: true,
      errorCode: 1,
      body: { activeKey },
    };

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next(loginResponse);
    generator.next();
    generator.next(selectedAccount);
    generator.next(profileInfo);

    it('put @account and @profileInfo to store', () => {
      const step = generator.next();
      expect(step.value.profile).toBe(profileInfo);
    });

    it('@loginWithEmailSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(LOGIN_WITH_EMAIL_SUCCESS);
    });
  });
});

describe('finishRegistrationWorker', () => {
  const eosAccount = 'eosAccount';

  const val = {
    [DISPLAY_NAME]: DISPLAY_NAME,
  };

  const profile = {
    accountName: eosAccount,
    displayName: val[DISPLAY_NAME],
  };

  const generator = finishRegistrationWorker({ val });

  it('select @eosService', () => {
    select.mockImplementation(() => eosService);
    const step = generator.next();
    expect(step.value).toEqual(eosService);
  });

  it('select @eosAccount', () => {
    select.mockImplementation(() => eosAccount);
    const step = generator.next(eosService);
    expect(step.value).toEqual(eosAccount);
  });

  it('registerAccount', () => {
    generator.next(eosAccount);
    expect(registerAccount).toHaveBeenCalledWith(profile, eosService);
  });

  it('finish registration with success', () => {
    const step = generator.next();
    expect(step.value.type).toBe(FINISH_REGISTRATION_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(FINISH_REGISTRATION_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('LOGIN_WITH_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(LOGIN_WITH_EMAIL);
  });

  it('LOGIN_WITH_SCATTER', () => {
    const step = generator.next();
    expect(step.value).toBe(LOGIN_WITH_SCATTER);
  });

  it('FINISH_REGISTRATION', () => {
    const step = generator.next();
    expect(step.value).toBe(FINISH_REGISTRATION);
  });
});
