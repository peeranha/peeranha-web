import { select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { INIT_ETHEREUM } from 'containers/EthereumProvider/constants';
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

const ethereumService = {
  forgetIdentity: jest.fn(),
};

describe('logoutWorker', () => {
  const generator = logoutWorker();

  it('select @ethereumService', () => {
    select.mockImplementation(() => ethereumService);
    const step = generator.next();
    expect(step.value).toEqual(ethereumService);
  });

  it('forget identity', () => {
    expect(ethereumService.forgetIdentity).toHaveBeenCalledTimes(0);
    generator.next(ethereumService);
    expect(ethereumService.forgetIdentity).toHaveBeenCalledTimes(1);
  });

  it('INIT_ETHEREUM', () => {
    const step = generator.next();
    expect(step.value.type).toBe(INIT_ETHEREUM);
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
