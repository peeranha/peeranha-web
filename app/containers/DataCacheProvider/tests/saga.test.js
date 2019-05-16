/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';

import defaultSaga, {
  getCommunitiesWithTagsWorker,
  getUserProfileWorker,
  getStatWorker,
} from '../saga';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_STAT,
  GET_STAT_SUCCESS,
  GET_STAT_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/communityManagement', () => ({
  getAllCommunities: jest.fn(),
}));

jest.mock('utils/statisticsManagement', () => ({
  getStat: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('getStatWorker', () => {
  const eos = {};
  const stat = {};

  const generator = getStatWorker();

  it('step, eos', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step, getStat', () => {
    generator.next(eos);
    expect(getStat).toHaveBeenCalledWith(eos);
  });

  it('step, getStatSuccess', () => {
    const step = generator.next(stat);
    expect(step.value.type).toBe(GET_STAT_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(GET_STAT_ERROR);
  });
});

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

describe('getUserProfileWorker', () => {
  const eos = {};
  const user = 'user';
  const userInfo = {};

  let users = { [user]: {} };

  const props = {
    user,
  };

  describe('step, users[user] TRUE', () => {
    const generator = getUserProfileWorker(props);

    it('step, eos', () => {
      select.mockImplementation(() => eos);

      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('step, selectUsers', () => {
      select.mockImplementation(() => users);

      const step = generator.next(eos);
      expect(step.value).toEqual(users);
    });

    it('step, users[user] TRUE', () => {
      users[user] = {};

      const step = generator.next(users);
      expect(step.value).toEqual(users[user]);
    });

    it('error handling', () => {
      const err = 'some error';
      const step = generator.throw(err);
      expect(step.value.type).toBe(GET_USER_PROFILE_ERROR);
    });
  });

  describe('step, users[user] FALSE', () => {
    const generator = getUserProfileWorker(props);

    generator.next();
    generator.next(eos);

    it('getProfileInfo', () => {
      users = {};
      getProfileInfo.mockImplementation(() => userInfo);

      const step = generator.next(users);
      expect(step.value).toEqual(userInfo);
    });

    it('getUserProfileSuccess', () => {
      const step = generator.next(userInfo);
      expect(step.value.type).toEqual(GET_USER_PROFILE_SUCCESS);
    });

    it('return yield userInfo', () => {
      const step = generator.next();
      expect(step.value).toEqual(userInfo);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_COMMUNITIES_WITH_TAGS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_COMMUNITIES_WITH_TAGS);
  });

  it('GET_USER_PROFILE', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_USER_PROFILE);
  });

  it('GET_STAT', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_STAT);
  });
});
