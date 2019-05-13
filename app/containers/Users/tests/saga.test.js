/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getUsers } from 'utils/profileManagement';

import defaultSaga, { getUsersWorker } from '../saga';

import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/profileManagement', () => ({
  getUsers: jest.fn(),
}));

describe('getUsers', () => {
  const eos = {};
  const lowerBound = 0;
  const limit = 10;

  const users = [];

  let storedUsers = [];
  let loadMore = false;

  describe('loadMore is FALSE', () => {
    loadMore = false;

    const generator = getUsersWorker({ loadMore });

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next();
      expect(service.value).toEqual(eos);
    });

    it('storedUsers', () => {
      storedUsers = [];

      select.mockImplementationOnce(() => storedUsers);
      const step = generator.next(eos);
      expect(step.value).toEqual(storedUsers);
    });

    it('limit', () => {
      select.mockImplementationOnce(() => limit);
      const step = generator.next(storedUsers);
      expect(step.value).toEqual(limit);
    });

    it('getUsers', () => {
      getUsers.mockImplementationOnce(() => users);
      const step = generator.next(lowerBound);
      expect(step.value).toEqual(users);
    });

    it('GET_USERS_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toEqual(GET_USERS_SUCCESS);
    });

    it('GET_USERS_ERROR: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(GET_USERS_ERROR);
    });
  });

  describe('loadMore is TRUE', () => {
    loadMore = true;

    it('storedUsers is TRUE', () => {
      const generator = getUsersWorker({ loadMore });
      storedUsers = [
        { id: 123, user: 'user123' },
        { id: 1234, user: 'user1234' },
      ];

      generator.next();
      generator.next(eos);
      generator.next(storedUsers);

      const step = generator.next(limit);
      expect(step.value).toBe('user1234');
    });

    it('storedUsers is FALSE', () => {
      const generator = getUsersWorker({ loadMore });
      storedUsers = [];

      generator.next();
      generator.next(eos);
      generator.next(storedUsers);

      const step = generator.next(limit);
      expect(step.value).toBe(0);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_USERS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_USERS);
  });
});
