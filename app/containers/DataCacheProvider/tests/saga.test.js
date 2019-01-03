/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { getAllCommunities } from 'utils/dataCacheManagement';

import defaultSaga, { getCommunitiesWithTagsWorker } from '../saga';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/dataCacheManagement', () => ({
  getAllCommunities: jest.fn(),
}));

describe('getCommunitiesWithTagsWorker', () => {
  const eos = {};
  const generator = getCommunitiesWithTagsWorker();

  it('step, eos', () => {
    select.mockImplementation(() => eos);

    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step, getAllCommunities', () => {
    generator.next(eos);
    expect(getAllCommunities).toHaveBeenCalledWith(eos);
  });

  it('step, getCommunitiesWithTagsSuccess', () => {
    const communities = [];
    const step = generator.next(communities);

    expect(step.value.type).toBe(GET_COMMUNITIES_WITH_TAGS_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(GET_COMMUNITIES_WITH_TAGS_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_COMMUNITIES_WITH_TAGS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_COMMUNITIES_WITH_TAGS);
  });
});
