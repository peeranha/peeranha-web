import { select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { INIT_EOSIO } from 'containers/EosioProvider/constants';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';

import defaultSaga, { logoutWorker } from '../saga';
import { LOGOUT_SUCCESS, LOGOUT, LOGOUT_ERROR } from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

const eosService = {
  forgetIdentity: jest.fn(),
};

describe('logoutWorker', () => {
  const generator = logoutWorker();

  it('select @eosService', () => {
    select.mockImplementation(() => eosService);
    const step = generator.next();
    expect(step.value).toEqual(eosService);
  });

  it('forget identity', () => {
    expect(eosService.forgetIdentity).toHaveBeenCalledTimes(0);
    generator.next(eosService);
    expect(eosService.forgetIdentity).toHaveBeenCalledTimes(1);
  });

  it('INIT_EOSIO', () => {
    const step = generator.next();
    expect(step.value.type).toBe(INIT_EOSIO);
  });

  it('GET_CURRENT_ACCOUNT_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toEqual(getCurrentAccountSuccess());
  });

  it('LOGOUT_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(LOGOUT_SUCCESS);
  });

  it('redirection', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(routes.questions());
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(LOGOUT_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('LOGOUT', () => {
    const step = generator.next();
    expect(step.value).toBe(LOGOUT);
  });
});
