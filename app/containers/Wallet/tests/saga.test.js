import { select } from 'redux-saga/effects';

import { getWeekStat } from 'utils/walletManagement';

import defaultSaga, { getWeekStatWorker } from '../saga';

import {
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT,
  GET_WEEK_STAT_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/walletManagement', () => ({
  getWeekStat: jest.fn(),
}));

const eosService = {
  forgetIdentity: jest.fn(),
};

describe('getWeekStatWorker', () => {
  const account = 'account';
  const generator = getWeekStatWorker();

  it('select @eosService', () => {
    select.mockImplementation(() => eosService);
    const step = generator.next();
    expect(step.value).toEqual(eosService);
  });

  it('select @account', () => {
    select.mockImplementation(() => account);
    const step = generator.next(eosService);
    expect(step.value).toEqual(account);
  });

  it('call @getWeekStat', () => {
    generator.next(account);
    expect(getWeekStat).toHaveBeenCalledWith(eosService, account);
  });

  it('GET_WEEK_STAT_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(GET_WEEK_STAT_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(GET_WEEK_STAT_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_WEEK_STAT', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_WEEK_STAT);
  });
});
