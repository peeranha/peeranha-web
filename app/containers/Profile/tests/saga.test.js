/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { getProfileInfoWorker, getCitiesListWorker } from '../saga';

import {
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
} from '../constants';

describe('getProfileInfoWorker Saga', () => {
  const generator = getProfileInfoWorker({ userKey: 'acc' });

  it('Checking, profile is action with GET_PROFILE_INFORMATION_SUCCESS type', () => {
    generator.next();
    const profile = generator.next();
    expect(profile.value.PUT.action.type).toBe(GET_PROFILE_INFORMATION_SUCCESS);
  });

  it('Error: Completing action with GET_PROFILE_INFORMATION_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(
      GET_PROFILE_INFORMATION_ERROR,
    );
  });
});

describe('getCitiesListWorker Saga', () => {
  const generator = getCitiesListWorker({ locationSearch: 'minsk' });

  it('Checking, resp is action with GET_LOCATION_LIST_SUCCESS type', () => {
    generator.next();
    const resp = generator.next();
    expect(resp.value.PUT.action.type).toBe(GET_LOCATION_LIST_SUCCESS);
  });

  it('Error: Completing action with GET_LOCATION_LIST_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(GET_LOCATION_LIST_ERROR);
  });
});
