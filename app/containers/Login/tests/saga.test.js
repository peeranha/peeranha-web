import { select, call } from 'redux-saga/effects';
import createdHistory from 'createdHistory';

import EosioService from 'utils/eosio';
import { login } from 'utils/web_integration/src/wallet/login/login';

import { INIT_EOSIO_SUCCESS } from 'containers/EosioProvider/constants';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';

import defaultSaga, { loginWithEmailWorker } from '../saga';

import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMEMBER_ME_FIELD,
  WE_ARE_HAPPY_FORM,
} from '../constants';
import { loginWithEmailSuccess } from '../actions';

class eosService {}

eosService.init = jest.fn();
eosService.getSelectedAccount = jest.fn();
eosService.forgetIdentity = jest.fn();
eosService.selectAccount = jest.fn();

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/accountManagement', () => ({
  registerAccount: jest.fn(),
}));

jest.mock('containers/AccountProvider/saga', () => ({
  getCurrentAccountWorker: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('utils/eosio');

jest.mock('utils/web_integration/src/wallet/login/login', () => ({
  login: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(global, 'localStorage', { value: localStorage });

beforeEach(() => {
  eosService.init.mockClear();
  createdHistory.push.mockClear();
  eosService.getSelectedAccount.mockClear();
  eosService.forgetIdentity.mockClear();
  eosService.selectAccount.mockClear();
  call.mockClear();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

describe('loginWithEmailWorker', () => {
  const locale = 'en';
  const eosAccountName = 'eosAccountName';
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
      expect(login).toHaveBeenCalledWith(email, password, rememberMe);
    });

    it('error handling with talking toast', () => {
      const step = generator.next(loginResponse);
      expect(step.value.type).toBe(LOGIN_WITH_EMAIL_ERROR);
    });
  });

  describe('call @login is SUCCESS; user is not registered in Peeranha', () => {
    const profileInfo = null;

    const generator = loginWithEmailWorker({ val });

    const loginResponse = {
      OK: true,
      errorCode: 1,
      body: { activeKey, eosAccountName },
    };

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);

    it('getCurrentAccountWorker', () => {
      generator.next(loginResponse);
      expect(getCurrentAccountWorker).toHaveBeenLastCalledWith(eosAccountName);
    });

    it('select @profileInfo', () => {
      select.mockImplementation(() => profileInfo);
      const step = generator.next();
      expect(step.value).toEqual(profileInfo);
    });

    it('show WE_ARE_HAPPY_FORM', () => {
      const step = generator.next();
      expect(step.value).toEqual(
        loginWithEmailSuccess(eosAccountName, WE_ARE_HAPPY_FORM),
      );
    });

    it('generator has to return @null', () => {
      const step = generator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('call @login is SUCCESS; user is registered in Peeranha', () => {
    const profileInfo = { account: eosAccountName };

    const generator = loginWithEmailWorker({ val });

    const loginResponse = {
      OK: true,
      errorCode: 1,
      body: { activeKey, eosAccountName },
    };

    EosioService.mockClear();
    EosioService.mockImplementation(() => eosService);

    generator.next();
    generator.next(locale);
    generator.next(loginResponse);
    generator.next();

    it('eosService.init', () => {
      generator.next(profileInfo);
      generator.next();

      expect(call).toHaveBeenCalledWith(
        eosService.init,
        activeKey.private,
        false,
        eosAccountName,
      );
    });

    it('@initEosioSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(INIT_EOSIO_SUCCESS);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('LOGIN_WITH_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(LOGIN_WITH_EMAIL);
  });

  it('redirectToFeedWorker', () => {
    const step = generator.next();
    expect(step.value).toEqual(LOGIN_WITH_EMAIL_SUCCESS);
  });

  it('errorToastHandling', () => {
    const step = generator.next();
    expect(step.value).toEqual(LOGIN_WITH_EMAIL_ERROR);
  });
});
