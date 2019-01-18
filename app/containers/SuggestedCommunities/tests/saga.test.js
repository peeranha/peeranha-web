/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  getSuggestedCommunities,
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';

import defaultSaga, {
  upVoteWorker,
  downVoteWorker,
  getSuggestedCommunitiesWorker,
} from '../saga';

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from '../constants';

import { upVoteValidator, downVoteValidator } from '../validate';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/communityManagement', () => ({
  getSuggestedCommunities: jest.fn(),
  upVoteToCreateCommunity: jest.fn(),
  downVoteToCreateCommunity: jest.fn(),
}));

jest.mock('../validate', () => ({
  upVoteValidator: jest.fn(),
  downVoteValidator: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('getSuggestedCommunitiesWorker', () => {
  const eos = {};
  const communities = [];
  const generator = getSuggestedCommunitiesWorker();

  it('eosService', () => {
    select.mockImplementationOnce(() => eos);
    const service = generator.next();
    expect(service.value).toEqual(eos);
  });

  it('getSuggestedCommunities', () => {
    getSuggestedCommunities.mockImplementationOnce(() => communities);
    const step = generator.next(eos);
    expect(step.value).toEqual(communities);
  });

  it('GET_SUGGESTED_COMMUNITIES_ERROR', () => {
    const step = generator.next(communities);
    expect(step.value.type).toEqual(GET_SUGGESTED_COMMUNITIES_SUCCESS);
  });

  it('GET_SUGGESTED_COMMUNITIES_ERROR: error handling', () => {
    const err = new Error('Some error');
    const putDescriptor = generator.throw(err).value;
    expect(putDescriptor.type).toEqual(GET_SUGGESTED_COMMUNITIES_ERROR);
  });
});

describe('downVoteWorker', () => {
  const props = {
    communityid: 1,
    buttonId: 1,
  };

  const account = 'user1';
  const locale = 'en';
  const storedCommunities = [];
  const profileInfo = {};

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  describe('profileInfo FALSE', () => {
    const generator = downVoteWorker(props);

    generator.next();
    generator.next(locale);
    generator.next(storedCommunities);
    generator.next(eos);
    generator.next(account);

    it('showLoginModal', () => {
      const step = generator.next(null);
      expect(step.value.type).toBe(SHOW_LOGIN_MODAL);
    });
  });

  describe('profileInfo TRUE, isValid FALSE', () => {
    const isValid = false;
    const generator = downVoteWorker(props);

    generator.next();
    generator.next(locale);
    generator.next(storedCommunities);
    generator.next(eos);
    generator.next(account);
    generator.next(profileInfo);

    it('isValid', () => {
      const step = generator.next(isValid);
      expect(step.value.type).toBe(DOWNVOTE_ERROR);
    });
  });

  describe('profileInfo TRUE, isValid TRUE', () => {
    const isValid = true;
    const generator = downVoteWorker(props);

    it('locale', () => {
      select.mockImplementationOnce(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('storedCommunities', () => {
      select.mockImplementationOnce(() => storedCommunities);
      const step = generator.next(locale);
      expect(step.value).toEqual(storedCommunities);
    });

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next(storedCommunities);
      expect(service.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      const step = generator.next(eos);
      expect(step.value).toEqual(account);
    });

    it('profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(account);
      expect(step.value).toEqual(profileInfo);
    });

    it('isValid', () => {
      downVoteValidator.mockImplementation(() => isValid);
      const step = generator.next(profileInfo);
      expect(step.value).toEqual(isValid);
    });

    it('downVoteToCreateCommunity', () => {
      generator.next(isValid);
      expect(downVoteToCreateCommunity).toHaveBeenCalledWith(
        eos,
        account,
        props.communityid,
      );
    });

    it('getSuggestedCommunities', () => {
      getSuggestedCommunities.mockImplementation(() => storedCommunities);
      const step = generator.next();
      expect(step.value).toEqual(storedCommunities);
    });

    it('DOWNVOTE_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(DOWNVOTE_SUCCESS);
    });

    it('DOWNVOTE_ERROR: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(DOWNVOTE_ERROR);
    });
  });
});

describe('upVoteWorker', () => {
  const props = {
    communityid: 1,
    buttonId: 1,
  };

  const account = 'user1';
  const locale = 'en';
  const storedCommunities = [];
  const profileInfo = {};

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  describe('profileInfo FALSE', () => {
    const generator = upVoteWorker(props);

    generator.next();
    generator.next(locale);
    generator.next(storedCommunities);
    generator.next(eos);
    generator.next(account);

    it('showLoginModal', () => {
      const step = generator.next(null);
      expect(step.value.type).toBe(SHOW_LOGIN_MODAL);
    });
  });

  describe('profileInfo TRUE, isValid FALSE', () => {
    const isValid = false;
    const generator = upVoteWorker(props);

    generator.next();
    generator.next(locale);
    generator.next(storedCommunities);
    generator.next(eos);
    generator.next(account);
    generator.next(profileInfo);

    it('isValid', () => {
      const step = generator.next(isValid);
      expect(step.value.type).toBe(UPVOTE_ERROR);
    });
  });

  describe('profileInfo TRUE, isValid TRUE', () => {
    const isValid = true;
    const generator = upVoteWorker(props);

    it('locale', () => {
      select.mockImplementationOnce(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('storedCommunities', () => {
      select.mockImplementationOnce(() => storedCommunities);
      const step = generator.next(locale);
      expect(step.value).toEqual(storedCommunities);
    });

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next(storedCommunities);
      expect(service.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      const step = generator.next(eos);
      expect(step.value).toEqual(account);
    });

    it('profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(account);
      expect(step.value).toEqual(profileInfo);
    });

    it('isValid', () => {
      upVoteValidator.mockImplementation(() => isValid);
      const step = generator.next(profileInfo);
      expect(step.value).toEqual(isValid);
    });

    it('upVoteToCreateCommunity', () => {
      generator.next(isValid);
      expect(upVoteToCreateCommunity).toHaveBeenCalledWith(
        eos,
        account,
        props.communityid,
      );
    });

    it('getSuggestedCommunities', () => {
      getSuggestedCommunities.mockImplementation(() => storedCommunities);
      const step = generator.next();
      expect(step.value).toEqual(storedCommunities);
    });

    it('UPVOTE_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(UPVOTE_SUCCESS);
    });

    it('UPVOTE_ERROR: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(UPVOTE_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_SUGGESTED_COMMUNITIES', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_SUGGESTED_COMMUNITIES);
  });

  it('UPVOTE', () => {
    const step = generator.next();
    expect(step.value).toBe(UPVOTE);
  });

  it('DOWNVOTE', () => {
    const step = generator.next();
    expect(step.value).toBe(DOWNVOTE);
  });
});
