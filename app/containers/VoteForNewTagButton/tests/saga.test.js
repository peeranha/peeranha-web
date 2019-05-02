/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { getSuggestedTagsWorker } from 'containers/Tags/saga';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';

import defaultSaga, { upVoteWorker, downVoteWorker } from '../saga';

import {
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

jest.mock('containers/Tags/saga', () => ({
  getSuggestedTagsWorker: jest.fn(),
}));

jest.mock('utils/communityManagement', () => ({
  upVoteToCreateTag: jest.fn(),
  downVoteToCreateTag: jest.fn(),
}));

jest.mock('../validate', () => ({
  upVoteValidator: jest.fn(),
  downVoteValidator: jest.fn(),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

describe('downVoteWorker', () => {
  const props = {
    communityId: 1,
    tagId: 1,
    buttonId: 1,
  };

  const account = 'user1';
  const locale = 'en';
  const storedTags = [];
  const profileInfo = {};

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  describe('profileInfo FALSE', () => {
    const generator = downVoteWorker(props);

    generator.next();
    generator.next(locale);
    generator.next(storedTags);
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
    generator.next(storedTags);
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

    it('storedTags', () => {
      select.mockImplementationOnce(() => storedTags);
      const step = generator.next(locale);
      expect(step.value).toEqual(storedTags);
    });

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next(storedTags);
      expect(service.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      const step = generator.next(eos);
      expect(step.value).toEqual(account);
    });

    it('profileInfo', () => {
      getUserProfileWorker.mockImplementation(() => profileInfo);
      const step = generator.next(account);
      expect(step.value).toEqual(profileInfo);
    });

    it('isValid', () => {
      downVoteValidator.mockImplementation(() => isValid);
      const step = generator.next(profileInfo);
      expect(step.value).toEqual(isValid);
    });

    it('downVoteToCreateTag', () => {
      generator.next(isValid);
      expect(downVoteToCreateTag).toHaveBeenCalledWith(
        eos,
        account,
        props.communityId,
        props.tagId,
      );
    });

    it('getSuggestedTags', () => {
      getSuggestedTagsWorker.mockImplementation(() => storedTags);
      const step = generator.next();
      expect(step.value).toEqual(storedTags);
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
    tagId: 1,
    buttonId: 1,
  };

  const account = 'user1';
  const locale = 'en';
  const storedTags = [];
  const profileInfo = {};

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  describe('profileInfo FALSE', () => {
    const generator = upVoteWorker(props);

    generator.next();
    generator.next(locale);
    generator.next(storedTags);
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
    generator.next(storedTags);
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

    it('storedTags', () => {
      select.mockImplementationOnce(() => storedTags);
      const step = generator.next(locale);
      expect(step.value).toEqual(storedTags);
    });

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next(storedTags);
      expect(service.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      const step = generator.next(eos);
      expect(step.value).toEqual(account);
    });

    it('profileInfo', () => {
      getUserProfileWorker.mockImplementation(() => profileInfo);
      const step = generator.next(account);
      expect(step.value).toEqual(profileInfo);
    });

    it('isValid', () => {
      upVoteValidator.mockImplementation(() => isValid);
      const step = generator.next(profileInfo);
      expect(step.value).toEqual(isValid);
    });

    it('upVoteToCreateTag', () => {
      generator.next(isValid);
      expect(upVoteToCreateTag).toHaveBeenCalledWith(
        eos,
        account,
        props.communityId,
        props.tagId,
      );
    });

    it('getSuggestedTags', () => {
      getSuggestedTagsWorker.mockImplementation(() => storedTags);
      const step = generator.next();
      expect(step.value).toEqual(storedTags);
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

  it('UPVOTE', () => {
    const step = generator.next();
    expect(step.value).toBe(UPVOTE);
  });

  it('DOWNVOTE', () => {
    const step = generator.next();
    expect(step.value).toBe(DOWNVOTE);
  });
});
