/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, all } from 'redux-saga/effects';

import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForFollowedCommunities,
} from 'utils/questionsManagement';

import * as routes from 'routes-config';

import defaultSaga, { getQuestionsWorker } from '../saga';
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

describe('getQuestionsWorker', () => {
  const res = {
    limit: 10,
    offset: 10,
    communityIdFilter: 1,
    parentPage: routes.feed(),
    next: true,
  };

  const communities = [];
  const questions = [
    {
      user: 'user1',
    },
  ];

  const eos = { id: 1, getSelectedAccount: jest.fn() };

  describe('communityIdFilter === 0 && parentPage !== feed', () => {
    res.communityIdFilter = 0;
    res.parentPage = '777';

    const generator = getQuestionsWorker(res);

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
      getQuestions.mockImplementation(() => questions);
      const step = generator.next(communities);

      expect(step.value).toEqual(questions);
    });

    it('questionsList mapping, get userInfo', () => {
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

    it('getQuestionsFilteredByCommunities', () => {
      generator.next(communities);
      expect(getQuestionsForFollowedCommunities).toHaveBeenCalledWith(
        res.limit,
        res.fetcher,
      );
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_QUESTIONS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_QUESTIONS);
  });
});
