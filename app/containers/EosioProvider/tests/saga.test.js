/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { autoLogin } from 'utils/web_integration/src/wallet/login/login';
import EosioService from 'utils/eosio';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';

import defaultSaga, { initEosioWorker, isAuthorized, isValid } from '../saga';

import { INIT_EOSIO, INIT_EOSIO_SUCCESS, INIT_EOSIO_ERROR } from '../constants';

import validate from '../validate';
const eosService = new EosioService();

eosService.init = jest.fn();

jest.mock('utils/eosio');

jest.mock('redux-saga/effects', () => ({
  call: jest.fn().mockImplementation((x, args) => x(args)),
  takeLatest: jest.fn().mockImplementation(x => x),
  put: jest.fn().mockImplementation(x => x),
  select: jest.fn().mockImplementation(() => {}),
}));

jest.mock('containers/AccountProvider/saga', () => ({
  getCurrentAccountWorker: jest.fn(),
}));

jest.mock('utils/web_integration/src/wallet/login/login', () => ({
  autoLogin: jest.fn(),
}));

jest.mock('../validate');

describe('isValid', () => {
  const creator = 'user1';
  const buttonId = 'buttonId';
  const minRating = 30;
  const minEnergy = 30;

  const locale = 'en';
  const selectedAccount = 'user1';

  const profileInfo = {
    rating: 30,
    energy: 30,
  };

  const generator = isValid({ creator, buttonId, minRating, minEnergy });

  it('step, locale', () => {
    select.mockImplementation(() => locale);
    const step = generator.next();
    expect(step.value).toEqual(locale);
  });

  it('step, profileInfo', () => {
    select.mockImplementation(() => profileInfo);
    const step = generator.next(locale);
    expect(step.value).toEqual(profileInfo);
  });

  it('step, selectedAccount', () => {
    select.mockImplementation(() => selectedAccount);
    const step = generator.next(profileInfo);
    expect(step.value).toEqual(selectedAccount);
  });

  it('validate', () => {
    generator.next(selectedAccount);
    expect(validate).toHaveBeenCalledWith({
      rating: profileInfo.rating,
      translations: translationMessages[locale],
      actor: selectedAccount,
      creator,
      buttonId,
      energy: profileInfo.energy,
      minRating,
      minEnergy,
    });
  });
});

describe('isAuthorized', () => {
  describe('with profileInfo', () => {
    const generator = isAuthorized();

    const profileInfo = {};

    generator.next();

    it('check that it is done', () => {
      const step = generator.next(profileInfo);
      expect(step.done).toBe(true);
    });
  });

  describe('without profileInfo', () => {
    const generator = isAuthorized();

    const profileInfo = null;

    it('step, profileInfo', () => {
      select.mockImplementation(() => profileInfo);
      const step = generator.next();
      expect(step.value).toEqual(profileInfo);
    });

    it('show login modal', () => {
      try {
        const step = generator.next(profileInfo);
        expect(step.value.type).toBe(SHOW_LOGIN_MODAL);
      } catch ({ message }) {
        expect(message).toBe('Not authorized');
      }
    });
  });
});

describe('initEosioWorker Saga', () => {
  const generator = initEosioWorker();
  const privateKey = 'privateKey';
  const eosAccountName = 'eosAccountName';

  EosioService.mockImplementation(() => eosService);

  const response = {
    OK: true,
    body: {
      eosAccountName,
      activeKey: {
        private: privateKey,
      },
    },
  };

  it('eosioService init', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(eosService.init);
  });

  it('initEosioSuccess', () => {
    const step = generator.next();
    expect(step.value.eos instanceof EosioService).toBe(true);
  });

  it('call @autoLogin', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(autoLogin);
  });

  it('init eosio', () => {
    generator.next(response);
    expect(call).toHaveBeenCalledWith(
      eosService.init,
      privateKey,
      false,
      eosAccountName,
    );
  });

  it('getCurrentAccountWorker', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(
      getCurrentAccountWorker,
      response.body.eosAccountName,
    );
  });

  it('put @eosioService to store', () => {
    const step = generator.next();
    expect(step.value.type).toBe(INIT_EOSIO_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(INIT_EOSIO_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('INIT_EOSIO', () => {
    const step = generator.next();
    expect(step.value).toBe(INIT_EOSIO);
  });
});
