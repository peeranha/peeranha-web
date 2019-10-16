/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createCommunity } from 'utils/communityManagement';

import defaultSaga, { createCommunityWorker } from '../saga';

import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/profileManagement', () => ({
  uploadImg: jest.fn(),
}));

jest.mock('utils/communityManagement', () => ({
  createCommunity: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

describe('createCommunityWorker', () => {
  const props = { community: null, reset: jest.fn() };

  const account = 'user1';
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  const generator = createCommunityWorker(props);

  it('step, eos', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('getSelectedAccount', () => {
    const step = generator.next(eos);
    expect(step.value).toEqual(account);
  });

  it('createCommunity', () => {
    generator.next(account);
    expect(createCommunity).toHaveBeenCalledWith(eos, account, props.community);
  });

  it('createCommunitySuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(CREATE_COMMUNITY_SUCCESS);
  });

  it('reset', () => {
    generator.next();
    expect(props.reset).toHaveBeenCalled();
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      `${routes.communitiesCreate()}#banner`,
    );
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(CREATE_COMMUNITY_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('CREATE_COMMUNITY', () => {
    const step = generator.next();
    expect(step.value).toBe(CREATE_COMMUNITY);
  });
});
