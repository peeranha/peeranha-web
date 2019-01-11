/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForCommunitiesWhereIAm,
  unfollowCommunity,
  followCommunity,
} from 'utils/questionsManagement';

import { getProfileInfo } from 'utils/profileManagement';

import * as routes from 'routes-config';

import defaultSaga, { getQuestionsWorker, followHandlerWorker } from '../saga';
import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestions: jest.fn(),
  getQuestionsFilteredByCommunities: jest.fn(),
  getQuestionsForCommunitiesWhereIAm: jest.fn(),
  unfollowCommunity: jest.fn(),
  followCommunity: jest.fn(),
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

  const profile = {};
  let profileInfo = null;

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

    it('selectedAccount', () => {
      eos.getSelectedAccount.mockImplementation(() => profile);
      const step = generator.next(eos);
      expect(step.value).toEqual(profile);
    });

    it('profile', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(profile);
      expect(step.value).toEqual(profileInfo);
    });

    it('getQuestions', () => {
      const questions = [];

      getQuestions.mockImplementation(() => questions);
      const step = generator.next(profileInfo);

      expect(step.value).toEqual(questions);
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
    profileInfo = null;

    const generator = getQuestionsWorker(res);

    generator.next();
    generator.next(eos);
    generator.next(profile);

    it('getQuestionsFilteredByCommunities', () => {
      generator.next(profileInfo);
      expect(getQuestionsFilteredByCommunities).toHaveBeenCalled();
    });
  });

  describe('communityIdFilter === 0 && parentPage === feed && followedCommunities', () => {
    res.communityIdFilter = 0;
    res.parentPage = routes.feed();
    profileInfo = {
      followed_communities: [],
    };

    const generator = getQuestionsWorker(res);

    generator.next();
    generator.next(eos);
    generator.next(profile);

    it('getQuestionsFilteredByCommunities', () => {
      generator.next(profileInfo);
      expect(getQuestionsForCommunitiesWhereIAm).toHaveBeenCalledWith(
        eos,
        res.limit,
        res.offset,
        profileInfo.followed_communities,
      );
    });
  });
});

describe('followHandlerWorker', () => {
  const props = {
    communityIdFilter: 0,
    isFollowed: false,
  };

  const profile = {};
  const profileInfo = {};
  const eos = { id: 1, getSelectedAccount: jest.fn() };

  describe('isFollowed false', () => {
    const generator = followHandlerWorker(props);

    it('eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('selectedAccount', () => {
      eos.getSelectedAccount.mockImplementation(() => profile);
      const step = generator.next(eos);
      expect(step.value).toEqual(profile);
    });

    it('unfollowCommunity', () => {
      const unfollow = false;

      followCommunity.mockImplementation(() => unfollow);
      const step = generator.next(profile);
      expect(step.value).toEqual(unfollow);
    });

    it('profile', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(profile);
      expect(step.value).toEqual(profileInfo);
    });

    it('FOLLOW_HANDLER_SUCCESS', () => {
      const step = generator.next(profileInfo);
      expect(step.value.type).toBe(FOLLOW_HANDLER_SUCCESS);
    });

    it('error handling', () => {
      const err = 'error';
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(FOLLOW_HANDLER_ERROR);
    });
  });

  describe('isFollowed true', () => {
    props.isFollowed = true;
    const generator = followHandlerWorker(props);

    generator.next();
    generator.next(eos);

    it('followCommunity', () => {
      const unfollow = true;

      unfollowCommunity.mockImplementation(() => unfollow);
      const step = generator.next(profile);
      expect(step.value).toEqual(unfollow);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_QUESTIONS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_QUESTIONS);
  });

  it('FOLLOW_HANDLER', () => {
    const step = generator.next();
    expect(step.value).toBe(FOLLOW_HANDLER);
  });
});
