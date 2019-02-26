/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import defaultSaga, { getProfileInfoWorker } from '../saga';

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

describe('getProfileInfoWorker', () => {
  const userKey = 'userKey';
  const generator = getProfileInfoWorker({ userKey });

  it('step, profile', () => {
    const profile = { name: 'test' };

    getUserProfileWorker.mockImplementation(() => profile);

    const step = generator.next();
    expect(step.value).toEqual(profile);
    expect(getUserProfileWorker).toHaveBeenCalledWith({ user: userKey });
  });

  it('step, put getProfileInfoSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(GET_PROFILE_INFORMATION_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some err');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(GET_PROFILE_INFORMATION_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_PROFILE_INFORMATION', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_PROFILE_INFORMATION);
  });
});
