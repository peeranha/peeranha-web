/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';

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

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
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
      select.mockImplementation(() => profileInfo);
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
});
