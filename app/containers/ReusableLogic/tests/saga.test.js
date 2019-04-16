/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  followCommunity,
  unfollowCommunity,
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
} from 'utils/communityManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';

import { GET_CURRENT_ACCOUNT_SUCCESS } from 'containers/AccountProvider/constants';
import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';

import { CLEAR_SUGGESTED_COMMUNITIES } from 'containers/Communities/constants';
import { getSuggestedCommunitiesWorker } from 'containers/Communities/saga';

import {
  upVoteValidator,
  downVoteValidator,
} from 'containers/VoteForNewCommunityButton/validate';

import defaultSaga, {
  followHandlerWorker,
  upVoteWorker,
  downVoteWorker,
} from '../saga';

import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/communityManagement', () => ({
  followCommunity: jest.fn(),
  unfollowCommunity: jest.fn(),
  upVoteToCreateCommunity: jest.fn(),
  downVoteToCreateCommunity: jest.fn(),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

jest.mock('containers/Communities/saga', () => ({
  getSuggestedCommunitiesWorker: jest.fn(),
}));

jest.mock('containers/VoteForNewCommunityButton/validate', () => ({
  upVoteValidator: jest.fn(),
  downVoteValidator: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('followHandlerWorker', () => {
  const props = {
    communityIdFilter: 1,
    isFollowed: false,
  };

  const account = 'user1';
  let profileInfo = {};

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  describe('props.isFollowed === false', () => {
    props.isFollowed = false;
    const generator = followHandlerWorker(props);

    it('eosService init step1', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next();
      expect(service.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      const step = generator.next(eos);
      expect(step.value).toEqual(account);
    });

    it('step, profileInfo', () => {
      getUserProfileWorker.mockImplementation(() => profileInfo);
      const step = generator.next(account);
      expect(step.value).toEqual(profileInfo);
    });

    it('props.isFollowed === false', () => {
      profileInfo = true;

      generator.next(profileInfo);
      expect(followCommunity).toHaveBeenCalledWith(
        eos,
        props.communityIdFilter,
        account,
      );
    });

    it('removeUserProfile', () => {
      const step = generator.next();
      expect(step.value).toEqual(removeUserProfile(account));
    });

    it('getUserProfileWorker', () => {
      generator.next();
      expect(getUserProfileWorker).toHaveBeenCalledWith({
        user: account,
      });
    });

    it('getCurrentAccountSuccess', () => {
      const step = generator.next(profileInfo);
      expect(step.value.type).toBe(GET_CURRENT_ACCOUNT_SUCCESS);
    });

    it('followHandlerSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(FOLLOW_HANDLER_SUCCESS);
    });

    it('forgetIdentityError: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toBe(FOLLOW_HANDLER_ERROR);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = followHandlerWorker(props);

    generator.next();
    generator.next(eos);
    generator.next(account);

    it('showLoginModal', () => {
      const showLoginModal = generator.next(null);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toBe(FOLLOW_HANDLER_ERROR);
    });
  });

  describe('props.isFollowed === true', () => {
    props.isFollowed = true;
    profileInfo = true;

    const generator = followHandlerWorker(props);

    generator.next();
    generator.next(eos);
    generator.next(account);
    generator.next(profileInfo);

    it('props.isFollowed === true', () => {
      expect(unfollowCommunity).toHaveBeenCalledWith(
        eos,
        props.communityIdFilter,
        account,
      );
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('FOLLOW_HANDLER', () => {
    const step = generator.next();
    expect(step.value).toBe(FOLLOW_HANDLER);
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

describe('downVoteWorker', () => {
  const props = {
    communityId: 1,
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
        props.communityId,
      );
    });

    it('clearSuggestedCommunities', () => {
      const step = generator.next();
      expect(step.value.type).toEqual(CLEAR_SUGGESTED_COMMUNITIES);
    });

    it('getSuggestedCommunitiesWorker', () => {
      getSuggestedCommunitiesWorker.mockImplementation(() => storedCommunities);
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
    communityId: 1,
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
        props.communityId,
      );
    });

    it('clearSuggestedCommunities', () => {
      const step = generator.next();
      expect(step.value.type).toEqual(CLEAR_SUGGESTED_COMMUNITIES);
    });

    it('getSuggestedCommunitiesWorker', () => {
      getSuggestedCommunitiesWorker.mockImplementation(() => storedCommunities);
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
