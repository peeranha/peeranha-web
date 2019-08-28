import { select } from 'redux-saga/effects';

import { sendTokens } from 'utils/walletManagement';
import Cookies from 'utils/cookies';
import { login } from 'utils/web_integration/src/wallet/login/login';

import { LOGIN_WITH_EMAIL } from 'containers/Login/constants';

import defaultSaga, { sendTokensWorker } from '../saga';

import {
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS,
  SEND_TOKENS_ERROR,
  EOS_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  HIDE_SENDTOKENS_MODAL,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/walletManagement', () => ({
  sendTokens: jest.fn(),
}));

jest.mock('utils/web_integration/src/wallet/login/login', () => ({
  login: jest.fn(),
}));

jest.mock('utils/cookies', () => ({
  get: jest.fn(),
}));

const eosService = {
  forgetIdentity: jest.fn(),
};

describe('sendTokensWorker', () => {
  const accountFrom = 'accountFrom';
  const accountTo = 'accountTo';
  const quantity = 1000;
  const password = 'password';

  const locale = 'en';
  const resetForm = jest.fn();

  const val = {
    [EOS_ACCOUNT_FIELD]: accountTo,
    [AMOUNT_FIELD]: quantity,
    [PASSWORD_FIELD]: password,
  };

  describe('login via email', () => {
    describe('success', () => {
      const generator = sendTokensWorker({ resetForm, val });
      const loginResponse = {
        OK: true,
      };

      it('select @locale', () => {
        select.mockImplementation(() => locale);
        const step = generator.next();
        expect(step.value).toEqual(locale);
      });

      it('select @eosService', () => {
        select.mockImplementation(() => eosService);
        const step = generator.next(locale);
        expect(step.value).toEqual(eosService);
      });

      it('select @account', () => {
        select.mockImplementation(() => accountFrom);
        const step = generator.next(eosService);
        expect(step.value).toEqual(accountFrom);
      });

      it('call @login, password checking', () => {
        Cookies.get.mockImplementation(() => LOGIN_WITH_EMAIL);

        login.mockImplementation(() => 'login via email, success');

        const step = generator.next(accountFrom);
        expect(step.value).toBe('login via email, success');
      });

      it('call @sendTokens', () => {
        generator.next(loginResponse);
        expect(sendTokens).toHaveBeenCalledWith(eosService, {
          from: accountFrom,
          to: accountTo,
          quantity,
        });
      });

      it('put @sendTokensSuccess', () => {
        const step = generator.next();
        expect(step.value.type).toBe(SEND_TOKENS_SUCCESS);
      });

      it('put @hideSendTokensModal', () => {
        const step = generator.next();
        expect(step.value.type).toBe(HIDE_SENDTOKENS_MODAL);
      });

      it('call @resetForm', () => {
        expect(resetForm).toHaveBeenCalledTimes(0);
        generator.next();
        expect(resetForm).toHaveBeenCalledTimes(1);
      });
    });

    describe('fail', () => {
      const generator = sendTokensWorker({ resetForm, val });
      const loginResponse = {
        OK: false,
        errorCode: 1,
      };

      Cookies.get.mockImplementation(() => LOGIN_WITH_EMAIL);

      generator.next();
      generator.next(locale);
      generator.next(eosService);
      generator.next(accountFrom);

      it('error handling', () => {
        const step = generator.next(loginResponse);
        expect(step.value.type).toBe(SEND_TOKENS_ERROR);
      });
    });
  });

  describe('login via scatter', () => {
    Cookies.get.mockImplementation(() => `NOT_WITH_${LOGIN_WITH_EMAIL}`);

    const generator = sendTokensWorker({ resetForm, val });

    generator.next();
    generator.next(locale);
    generator.next(eosService);
    generator.next(accountFrom);

    it('put @sendTokensSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SEND_TOKENS_SUCCESS);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SEND_TOKENS', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_TOKENS);
  });

  it('SEND_TOKENS_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_TOKENS_SUCCESS);
  });

  it('SEND_TOKENS_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_TOKENS_ERROR);
  });

  it('SEND_TOKENS_ERROR', () => {
    const step = generator.next();
    expect(step.value).toEqual([SEND_TOKENS_ERROR]);
  });
});
