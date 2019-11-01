/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import defaultSaga, { getUsersWorker } from '../saga';
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/profileManagement', () => ({
  getUsers: jest.fn(),
}));

describe('getUsers', () => {
  const loadMore = false;
  const fetcher = {
    getNextItems: jest.fn(),
  };

  const users = {
    items: [
      {
        id: 1,
        ipfs_avatar: 'ipfs_avatar_1',
      },
    ],
  };

  const generator = getUsersWorker({ loadMore, fetcher });

  it('getUsers', () => {
    fetcher.getNextItems.mockImplementationOnce(() => users);
    const step = generator.next();
    expect(step.value).toEqual(users);
  });

  it('put user profiles to store', () => {
    generator.next(users);
    expect(put).toHaveBeenCalledWith(
      getUserProfileSuccess({
        id: 1,
        ipfs_avatar: 'ipfs_avatar_1',
      }),
    );
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

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_USERS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_USERS);
  });
});
