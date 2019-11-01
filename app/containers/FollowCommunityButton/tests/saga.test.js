/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import defaultSaga, { followHandlerWorker } from '../saga';

import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
  MIN_RATING_TO_FOLLOW,
  MIN_ENERGY_TO_FOLLOW,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/EosioProvider/saga', () => ({
  isAuthorized: jest.fn(),
  isValid: jest.fn(),
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
    buttonId: 'buttonId',
  };

  const account = 'user1';
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  describe('props.isFollowed === false', () => {
    props.isFollowed = false;
    const generator = followHandlerWorker(props);

    it('select eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next();
      expect(service.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      generator.next(eos);
      expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
    });

    it('isAuthorized', () => {
      generator.next(account);
      expect(call).toHaveBeenCalledWith(isAuthorized);
    });

    it('isValid', () => {
      call.mockImplementationOnce((x, args) => x(args));

      generator.next();
      expect(call).toHaveBeenCalledWith(isValid, {
        buttonId: props.buttonId,
        minRating: MIN_RATING_TO_FOLLOW,
        minEnergy: MIN_ENERGY_TO_FOLLOW,
      });
    });

    it('props.isFollowed === false', () => {
      generator.next();
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

  describe('props.isFollowed === true', () => {
    props.isFollowed = true;

    const generator = followHandlerWorker(props);

    generator.next();
    generator.next(eos);
    generator.next(account);
    generator.next();

    it('props.isFollowed === true', () => {
      generator.next();
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
