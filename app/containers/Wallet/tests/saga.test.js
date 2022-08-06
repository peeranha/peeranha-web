import { select, call } from 'redux-saga/effects';

import { getWeekStat, pickupReward } from 'utils/walletManagement';

import defaultSaga, { getWeekStatWorker, pickupRewardWorker } from '../saga';

import {
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT,
  GET_WEEK_STAT_ERROR,
  PICKUP_REWARD_SUCCESS,
  PICKUP_REWARD,
  PICKUP_REWARD_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/walletManagement', () => ({
  getWeekStat: jest.fn(),
  pickupReward: jest.fn(),
}));

const ethereumService = {
  forgetIdentity: jest.fn(),
};

describe('pickupRewardWorker', () => {
  const account = 'account';
  const period = 1;
  const generator = pickupRewardWorker({ period });

  it('select @ethereumService', () => {
    select.mockImplementation(() => ethereumService);
    const step = generator.next();
    expect(step.value).toEqual(ethereumService);
  });

  it('select @account', () => {
    select.mockImplementation(() => account);
    const step = generator.next(ethereumService);
    expect(step.value).toEqual(account);
  });

  it('call @pickupReward', () => {
    generator.next(account);
    expect(call).toHaveBeenCalledWith(
      pickupReward,
      ethereumService,
      account,
      period,
    );
  });

  it('PICKUP_REWARD_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(PICKUP_REWARD_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(PICKUP_REWARD_ERROR);
  });
});

describe('getWeekStatWorker', () => {
  const account = 'account';
  const generator = getWeekStatWorker();

  it('select @ethereumService', () => {
    select.mockImplementation(() => ethereumService);
    const step = generator.next();
    expect(step.value).toEqual(ethereumService);
  });

  it('select @account', () => {
    select.mockImplementation(() => account);
    const step = generator.next(ethereumService);
    expect(step.value).toEqual(account);
  });

  it('call @getWeekStat', () => {
    generator.next(account);
    expect(getWeekStat).toHaveBeenCalledWith(ethereumService, account);
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
    expect(step.value).toEqual([GET_WEEK_STAT, PICKUP_REWARD_SUCCESS]);
  });

  it('PICKUP_REWARD', () => {
    const step = generator.next();
    expect(step.value).toEqual(PICKUP_REWARD);
  });
});
