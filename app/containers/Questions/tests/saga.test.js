/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, all, take } from 'redux-saga/effects';

import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForFollowedCommunities,
} from 'utils/questionsManagement';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';

import defaultSaga, { getQuestionsWorker, redirectWorker } from '../saga';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  take: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestions: jest.fn(),
  getQuestionsFilteredByCommunities: jest.fn(),
  getQuestionsForFollowedCommunities: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

describe('getQuestionsWorker', () => {
  const res = {
    limit: 10,
    offset: 10,
    communityIdFilter: 1,
    parentPage: routes.feed(),
    next: true,
  };

  const communities = [{ id: 1 }];
  const questions = [
    {
      user: 'user1',
    },
  ];

  const eos = { id: 1, getSelectedAccount: jest.fn() };

  describe('communityIdFilter === 0 && parentPage !== feed', () => {
    const communityIdFilter = 0;
    const parentPage = '777';

    const generator = getQuestionsWorker({
      ...res,
      communityIdFilter,
      parentPage,
    });

    it('eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('followedCommunities', () => {
      select.mockImplementation(() => communities);
      const step = generator.next(eos);
      expect(step.value).toEqual(communities);
    });

    it('getQuestions', () => {
      generator.next(communities);
      expect(getQuestions).toHaveBeenCalledWith(eos, res.limit, res.offset);
    });

    it('questionsList mapping, get author', () => {
      const waitPromise = true;

      all.mockImplementation(() => waitPromise);

      const step = generator.next(questions);
      expect(step.value).toBe(waitPromise);
    });

    it('GET_QUESTIONS_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(GET_QUESTIONS_SUCCESS);
    });

    it('error handling', () => {
      const err = 'error';
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(GET_QUESTIONS_ERROR);
    });
  });

  describe('communityIdFilter > 0', () => {
    res.communityIdFilter = 10;

    const generator = getQuestionsWorker(res);

    generator.next();
    generator.next(eos);

    it('getQuestionsFilteredByCommunities', () => {
      generator.next(communities);
      expect(getQuestionsFilteredByCommunities).toHaveBeenCalled();
    });
  });

  describe('communityIdFilter === 0 && parentPage === feed && followedCommunities', () => {
    const fetcher = {};

    res.communityIdFilter = 0;
    res.parentPage = routes.feed();
    res.fetcher = fetcher;

    const generator = getQuestionsWorker(res);

    generator.next();
    generator.next(eos);

    it('getQuestionsForFollowedCommunities', () => {
      generator.next(communities);
      expect(getQuestionsForFollowedCommunities).toHaveBeenCalledWith(
        res.limit,
        res.fetcher,
      );
    });
  });
});

describe('redirectWorker', () => {
  const communityIdFilter = 1;
  const isFollowed = true;

  describe('feed page', () => {
    const generator = redirectWorker({ communityIdFilter, isFollowed });

    it('wait for user profile getting', () => {
      generator.next();
      expect(take).toHaveBeenCalledWith(GET_USER_PROFILE_SUCCESS);
    });

    it('redirect', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          pathname: routes.feed(),
        },
      });

      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.feed(!isFollowed ? communityIdFilter : ''),
      );
    });
  });

  describe('not feed page', () => {
    const generator = redirectWorker({ communityIdFilter, isFollowed });

    generator.next();

    it('no redirect', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          pathname: '/ddadasdas',
        },
      });

      const step = generator.next();
      expect(step.done).toBe(true);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_QUESTIONS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_QUESTIONS);
  });

  it('FOLLOW_HANDLER_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(FOLLOW_HANDLER_SUCCESS);
  });
});
