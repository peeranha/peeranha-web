/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';

import { GET_CURRENT_ACCOUNT_SUCCESS } from 'containers/AccountProvider/constants';

import defaultSaga, { followHandlerWorker } from '../saga';

import {
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

jest.mock('utils/communityManagement', () => ({
  followCommunity: jest.fn(),
  unfollowCommunity: jest.fn(),
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
  const profileInfo = {};

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

    it('props.isFollowed === false', () => {
      generator.next(account);
      expect(followCommunity).toHaveBeenCalledWith(
        eos,
        props.communityIdFilter,
        account,
      );
    });

    it('getProfileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next();
      expect(step.value).toEqual(profileInfo);
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
      expect(putDescriptor.type).toEqual(FOLLOW_HANDLER_ERROR);
    });
  });

  describe('props.isFollowed === true', () => {
    props.isFollowed = true;
    const generator = followHandlerWorker(props);

    generator.next();
    generator.next(eos);
    generator.next(account);

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
});
