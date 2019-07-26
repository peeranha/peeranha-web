/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';

import defaultSaga, { getCurrentAccountWorker } from '../saga';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
} from '../constants';

const account = 'user1';
const profileInfo = true;

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

getProfileInfo.mockImplementation(() => profileInfo);

describe('getCurrentAccountWorker', () => {
  const generator = getCurrentAccountWorker();
  const scatter = {
    scatterInstalled: true,
    initialized: true,
    getSelectedAccount: () => account,
  };

  it('selectDescriptor step', () => {
    select.mockImplementationOnce(() => scatter);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(scatter);
  });

  it('selectedScatterAccount step', () => {
    const selectedScatterAccount = generator.next(scatter);
    expect(selectedScatterAccount.value).toEqual(account);
  });

  it('profileInfo step', () => {
    const step = generator.next(account);
    expect(step.value).toEqual(profileInfo);
  });

  it('putDescriptor step', () => {
    const putDescriptor = generator.next();
    expect(putDescriptor.value.type).toEqual(GET_CURRENT_ACCOUNT_SUCCESS);
  });

  it('errorHandling step', () => {
    const err = new Error('Some error');
    const putDescriptor = generator.throw(err).value;
    expect(putDescriptor.type).toEqual(GET_CURRENT_ACCOUNT_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_CURRENT_ACCOUNT', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_CURRENT_ACCOUNT);
  });
});
