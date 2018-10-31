/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { getProfileInfo, getCitiesList } from 'utils/profileManagement';
import defaultSaga, {
  getProfileInfoWorker,
  getCitiesListWorker,
} from '../saga';

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/profileManagement', () => ({
  getCitiesList: jest.fn().mockImplementation(() => {}),
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

describe('getCitiesListWorker', () => {
  const generator = getCitiesListWorker({});

  it('step1, call getCitiesList', () => {
    const citiesList = ['Minsk', 'Chicago'];

    getCitiesList.mockImplementation(() => citiesList);
    const step1 = generator.next();
    expect(step1.value).toEqual(citiesList);
  });

  it('step2, put getCitiesListSuccess', () => {
    const step2 = generator.next();
    expect(step2.value.type).toBe(GET_LOCATION_LIST_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some err');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(GET_LOCATION_LIST_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_PROFILE_INFORMATION', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_PROFILE_INFORMATION);
  });

  it('GET_LOCATION_LIST', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_LOCATION_LIST);
  });
});
