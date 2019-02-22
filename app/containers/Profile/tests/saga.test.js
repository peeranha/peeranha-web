/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { getProfileInfo } from 'utils/profileManagement';
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

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn().mockImplementation(() => {}),
}));

describe('getProfileInfoWorker', () => {
  const generator = getProfileInfoWorker({});

  it('step1, eosService', () => {
    const eosService = {};

    select.mockImplementation(() => eosService);
    const step1 = generator.next();
    expect(step1.value).toEqual(eosService);
  });

  it('step2, profile', () => {
    const profile = { name: 'test' };

    getProfileInfo.mockImplementation(() => profile);
    const step2 = generator.next();
    expect(step2.value).toEqual(profile);
  });

  it('step3, put getProfileInfoSuccess', () => {
    const step3 = generator.next();
    expect(step3.value.type).toBe(GET_PROFILE_INFORMATION_SUCCESS);
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
