/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';

import { autoLogin } from 'utils/web_integration/src/wallet/login/login';
import EosioService from 'utils/eosio';

import defaultSaga, { initEosioWorker } from '../saga';

import { INIT_EOSIO, INIT_EOSIO_SUCCESS, INIT_EOSIO_ERROR } from '../constants';

const eosService = new EosioService();

eosService.init = jest.fn();

jest.mock('utils/eosio');

jest.mock('redux-saga/effects', () => ({
  call: jest.fn(),
  takeLatest: jest.fn().mockImplementation(x => x),
  put: jest.fn().mockImplementation(x => x),
}));

jest.mock('utils/web_integration/src/wallet/login/login', () => ({
  autoLogin: jest.fn(),
}));

describe('initEosioWorker Saga', () => {
  const generator = initEosioWorker();
  const privateKey = 'privateKey';

  EosioService.mockImplementation(() => eosService);

  it('call @autoLogin', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(autoLogin);
  });

  it('init eosio', () => {
    const response = {
      OK: true,
      body: {
        activeKey: {
          private: privateKey,
        },
      },
    };

    generator.next(response);
    expect(call).toHaveBeenCalledWith(eosService.init, privateKey);
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
