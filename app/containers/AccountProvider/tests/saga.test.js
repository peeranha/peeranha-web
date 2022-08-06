/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { getBalance } from 'utils/walletManagement';

import { GET_USER_PROFILE } from 'containers/DataCacheProvider/constants';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';

import {
  ASK_QUESTION_SUCCESS,
  REDIRECT_TO_ASK_QUESTION_PAGE,
} from 'containers/AskQuestion/constants';

import {
  CREATE_COMMUNITY_SUCCESS,
  REDIRECT_TO_CREATE_COMMUNITY,
} from 'containers/CreateCommunity/constants';

import {
  SUGGEST_TAG_SUCCESS,
  REDIRECT_TO_CREATE_TAG,
} from 'containers/CreateTag/constants';

import { EDIT_ANSWER_SUCCESS } from 'containers/EditAnswer/constants';
import { EDIT_QUESTION_SUCCESS } from 'containers/EditQuestion/constants';
import { PICKUP_REWARD_SUCCESS } from 'containers/Wallet/constants';
import { PROFILE_INFO_LS } from 'containers/Login/constants';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import {
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  SAVE_COMMENT_SUCCESS,
} from 'containers/ViewQuestion/constants';

import defaultSaga, { getCurrentAccountWorker } from '../saga';

import { GET_CURRENT_ACCOUNT, GET_CURRENT_ACCOUNT_ERROR } from '../constants';

import { getCurrentAccountSuccess } from '../actions';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(arr => arr),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('utils/walletManagement', () => ({
  getBalance: jest.fn(),
}));

const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(global, 'localStorage', { value: localStorage });

beforeEach(() => {
  call.mockClear();
  getProfileInfo.mockClear();
  getBalance.mockClear();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

describe('getCurrentAccountWorker', () => {
  describe('@initAccount was passed', () => {
    const account = 'account';
    const prevProfileInfo = { profile: {} };

    const profileInfo = {};
    const balance = 10;

    const ethereum = {
      initialized: true,
      getSelectedAccount: () => account,
    };

    const generator = getCurrentAccountWorker(account);

    generator.next();
    generator.next();
    generator.next(ethereum);
    generator.next(prevProfileInfo);
    generator.next(account);
    generator.next([profileInfo, balance]);

    it('getCurrentAccountSuccess with @account', () => {
      const step = generator.next();
      expect(step.value).toEqual(getCurrentAccountSuccess(account, balance));
    });
  });

  describe('@prevProfileInfo is null', () => {
    describe('userProfileLS is same as current account', () => {
      const account = 'account';
      const prevProfileInfo = null;

      const profileInfoLS = { user: account, balance: 10 };

      const ethereum = {
        initialized: true,
        getSelectedAccount: () => account,
      };

      const generator = getCurrentAccountWorker(account);

      generator.next();
      generator.next();
      generator.next(ethereum);
      generator.next(prevProfileInfo);

      it('getUserProfileSuccess', () => {
        localStorage.getItem.mockImplementationOnce(() =>
          JSON.stringify(profileInfoLS),
        );

        const step = generator.next(account);
        expect(step.value).toEqual(getUserProfileSuccess(profileInfoLS));
      });

      it('getCurrentAccountSuccess', () => {
        const step = generator.next();
        expect(step.value).toEqual(
          getCurrentAccountSuccess(profileInfoLS.user, profileInfoLS.balance),
        );
      });

      it('done is TRUE', () => {
        const step = generator.next();
        expect(step.done).toBe(true);
      });
    });

    describe('userProfileLS is NOT same as current account', () => {
      const account = 'account';
      const prevProfileInfo = null;

      const profileInfoLS = { user: `another-${account}`, balance: 10 };

      const profileInfo = {};
      const balance = 10;

      const ethereum = {
        initialized: true,
        getSelectedAccount: () => null,
      };

      const generator = getCurrentAccountWorker(account);

      generator.next();
      generator.next();
      generator.next(ethereum);
      generator.next(prevProfileInfo);

      it('current account is not equal to local storage profile', () => {
        getProfileInfo.mockImplementationOnce(() => profileInfo);
        getBalance.mockImplementationOnce(() => balance);

        localStorage.getItem.mockImplementationOnce(() =>
          JSON.stringify(profileInfoLS),
        );

        const step = generator.next(account);
        expect(step.value).toEqual([profileInfo, balance]);
      });

      it('getUserProfileSuccess', () => {
        const step = generator.next([profileInfo, balance]);
        expect(step.value).toEqual(getUserProfileSuccess(profileInfo));
      });

      it('getCurrentAccountSuccess', () => {
        const step = generator.next();
        expect(step.value).toEqual(getCurrentAccountSuccess(account, balance));
      });
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('REDIRECT_TO_ASK_QUESTION_PAGE', () => {
    const step = generator.next();
    expect(step.value).toBe(REDIRECT_TO_ASK_QUESTION_PAGE);
  });

  it('REDIRECT_TO_CREATE_COMMUNITY', () => {
    const step = generator.next();
    expect(step.value).toBe(REDIRECT_TO_CREATE_COMMUNITY);
  });

  it('REDIRECT_TO_CREATE_TAG', () => {
    const step = generator.next();
    expect(step.value).toBe(REDIRECT_TO_CREATE_TAG);
  });

  it('getCurrentAccountWorker TAKES array', () => {
    const step = generator.next();

    expect(step.value).toEqual([
      GET_CURRENT_ACCOUNT,
      FOLLOW_HANDLER_SUCCESS,
      ASK_QUESTION_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      PICKUP_REWARD_SUCCESS,
      DELETE_QUESTION_SUCCESS,
      DELETE_ANSWER_SUCCESS,
      DELETE_COMMENT_SUCCESS,
      SAVE_COMMENT_SUCCESS,
    ]);
  });
});
