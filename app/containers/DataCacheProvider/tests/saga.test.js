/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getStat } from 'utils/statisticsManagement';
import { getFAQ } from 'utils/faqManagement';

import defaultSaga, {
  getCommunitiesWithTagsWorker,
  getUserProfileWorker,
  getStatWorker,
  getFaqWorker,
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
  GET_FAQ,
  GET_FAQ_SUCCESS,
  GET_FAQ_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/faqManagement', () => ({
  getFAQ: jest.fn(),
}));

jest.mock('utils/communityManagement', () => ({
  getAllCommunities: jest.fn(),
}));

jest.mock('utils/statisticsManagement', () => ({
  getStat: jest.fn(),
}));

jest.mock('object-hash', () => jest.fn());

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('getStatWorker', () => {
  const ethereum = {};
  const stat = {};

  const generator = getStatWorker();

  it('step, ethereum', () => {
    select.mockImplementation(() => ethereum);
    const step = generator.next();
    expect(step.value).toEqual(ethereum);
  });

  it('step, getStat', () => {
    generator.next(ethereum);
    expect(getStat).toHaveBeenCalledWith(ethereum);
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

describe('getFaqWorker', () => {
  const locale = 'en';
  const faq = {};

  const generator = getFaqWorker();

  it('step, locale', () => {
    select.mockImplementation(() => locale);
    const step = generator.next();
    expect(step.value).toEqual(locale);
  });

  it('step, faq', () => {
    generator.next(locale);
    expect(getFAQ).toHaveBeenCalledWith(locale);
  });

  it('step, getFaqSuccess', () => {
    const step = generator.next(faq);
    expect(step.value.type).toBe(GET_FAQ_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(GET_FAQ_ERROR);
  });
});

describe('getCommunitiesWithTagsWorker', () => {
  const ethereum = {};
  const generator = getCommunitiesWithTagsWorker();

  it('step, ethereum', () => {
    select.mockImplementation(() => ethereum);

    const step = generator.next();
    expect(step.value).toEqual(ethereum);
  });

  it('step, getAllCommunities', () => {
    generator.next(ethereum);
    expect(getAllCommunities).toHaveBeenCalledWith(ethereum);
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
  const ethereum = {};
  const user = 'user';
  const getFullProfile = false;

  describe('user IS in store', () => {
    const cachedUserInfo = {};
    const generator = getUserProfileWorker({ user, getFullProfile });

    it('step, ethereum', () => {
      select.mockImplementation(() => ethereum);
      const step = generator.next();
      expect(step.value).toEqual(ethereum);
    });

    it('step, cachedUserInfo', () => {
      select.mockImplementation(() => cachedUserInfo);
      const step = generator.next(ethereum);
      expect(step.value).toEqual(cachedUserInfo);
    });

    it('step, cachedUserInfo', () => {
      const step = generator.next(ethereum);
      expect(step.value).toEqual(cachedUserInfo);
    });

    it('step, done is TRUE', () => {
      const step = generator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('user IS NOT in store', () => {
    describe('updatedUserInfo differs from cachedUserInfo', () => {
      const cachedUserInfo = null;
      const updatedUserInfo = {};

      const generator = getUserProfileWorker({ user, getFullProfile });

      generator.next();
      generator.next(ethereum);

      it('getUpdatedProfileInfo', () => {
        generator.next(cachedUserInfo);
        expect(getProfileInfo).toHaveBeenCalledWith(
          user,
          ethereum,
          getFullProfile,
        );
      });

      it('put updatedUserInfo to store', () => {
        const step = generator.next(updatedUserInfo);
        expect(step.value.type).toBe(GET_USER_PROFILE_SUCCESS);
        expect(step.value.profile).toBe(updatedUserInfo);
      });

      it('to finish processing', () => {
        const step = generator.next();
        expect(step.value.type).toBe(GET_USER_PROFILE_SUCCESS);
      });

      it('return updatedUserInfo', () => {
        const step = generator.next();
        expect(step.value).toEqual(updatedUserInfo);
      });

      it('error handling', () => {
        const step = generator.throw('throw new error');
        expect(step.value.type).toBe(GET_USER_PROFILE_ERROR);
      });
    });

    describe('updatedUserInfo does not differs from cachedUserInfo', () => {
      const cachedUserInfo = null;
      const updatedUserInfo = null;

      const generator = getUserProfileWorker({ user, getFullProfile });

      getHash.mockImplementation(() => null);

      generator.next();
      generator.next(ethereum);
      generator.next(cachedUserInfo);

      it('to finish processing', () => {
        const step = generator.next(updatedUserInfo);
        expect(step.value.type).toBe(GET_USER_PROFILE_SUCCESS);
      });
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

  it('GET_FAQ', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_FAQ);
  });
});
