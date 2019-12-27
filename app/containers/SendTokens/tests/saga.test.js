import { select } from 'redux-saga/effects';

import { sendTokens } from 'utils/walletManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';

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

const eosService = {
  forgetIdentity: jest.fn(),
};

describe('sendTokensWorker', () => {
  const accountFrom = 'accountFrom';
  const accountTo = 'accountTo';
  const quantity = 1000;
  const password = 'password';
  const authToken = 'authToken';
  const email = 'email';

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

      const profileInfo = {
        user: accountFrom,
        loginData: { authToken, email },
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

      it('select @profileInfo', () => {
        select.mockImplementation(() => profileInfo);
        const step = generator.next(eosService);
        expect(step.value).toEqual(profileInfo);
      });

      it('call @login, password checking', () => {
        login.mockImplementation(() => 'login via email, success');

        const step = generator.next(profileInfo);
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

      const profileInfo = {
        user: accountFrom,
        loginData: { authToken, email },
      };

      generator.next();
      generator.next(locale);
      generator.next(eosService);
      generator.next(profileInfo);

      it('error handling', () => {
        const step = generator.next(loginResponse);
        expect(step.value.type).toBe(SEND_TOKENS_ERROR);
      });
    });
  });

  describe('login via scatter', () => {
    const generator = sendTokensWorker({ resetForm, val });

    const profileInfo = {
      user: accountFrom,
      loginData: { loginWithScatter: true },
    };

    generator.next();
    generator.next(locale);
    generator.next(eosService);
    generator.next(profileInfo);

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
