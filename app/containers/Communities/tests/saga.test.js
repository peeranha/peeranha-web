/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getSuggestedCommunities } from 'utils/communityManagement';

import defaultSaga, { getSuggestedCommunitiesWorker } from '../saga';

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/communityManagement', () => ({
  getSuggestedCommunities: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('getSuggestedCommunitiesWorker', () => {
  const eos = {};
  let storedComm = [];
  let lowerBound = 0;
  const limit = 10;

  const communities = [];

  describe('storedComm []', () => {
    const generator = getSuggestedCommunitiesWorker();

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next();
      expect(service.value).toEqual(eos);
    });

    it('storedComm', () => {
      storedComm = [];

      select.mockImplementationOnce(() => storedComm);
      const step = generator.next(eos);
      expect(step.value).toEqual(storedComm);
    });

    it('limit', () => {
      select.mockImplementationOnce(() => limit);
      const step = generator.next(storedComm);
      expect(step.value).toEqual(limit);
    });

    it('lowerBound === 0', () => {
      lowerBound = 0;

      const step = generator.next(limit);
      expect(step.value).toEqual(0);
    });

    it('getSuggestedCommunities', () => {
      getSuggestedCommunities.mockImplementationOnce(() => communities);
      const step = generator.next(lowerBound);
      expect(step.value).toEqual(communities);
    });

    it('GET_SUGGESTED_COMMUNITIES_ERROR', () => {
      const step = generator.next();
      expect(step.value.type).toEqual(GET_SUGGESTED_COMMUNITIES_SUCCESS);
    });

    it('GET_SUGGESTED_COMMUNITIES_ERROR: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(GET_SUGGESTED_COMMUNITIES_ERROR);
    });
  });

  describe('storedComm [item1, item2, ...]', () => {
    const generator = getSuggestedCommunitiesWorker();
    storedComm = [{ id: 123 }, { id: 1234 }];

    generator.next();
    generator.next(eos);
    generator.next(storedComm);

    it('lowerBound', () => {
      const step = generator.next(limit);
      expect(step.value).toBe(1234 + 1);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_SUGGESTED_COMMUNITIES', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_SUGGESTED_COMMUNITIES);
  });
});
