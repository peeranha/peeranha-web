/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, all, call } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { getBalance } from 'utils/walletManagement';

import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
} from 'containers/DataCacheProvider/constants';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { SHOW_SCATTER_SIGNUP_FORM_SUCCESS } from 'containers/SignUp/constants';

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
import { SEND_TOKENS_SUCCESS } from 'containers/SendTokens/constants';
import { PICKUP_REWARD_SUCCESS } from 'containers/Wallet/constants';

import {
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  SAVE_COMMENT_SUCCESS,
} from 'containers/ViewQuestion/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_COMM_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_COMM_SUCCESS,
} from 'containers/VoteForNewCommunityButton/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_TAGS_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_TAGS_SUCCESS,
} from 'containers/VoteForNewTagButton/constants';

import defaultSaga, { getCurrentAccountWorker } from '../saga';

import { GET_CURRENT_ACCOUNT, GET_CURRENT_ACCOUNT_ERROR } from '../constants';

import { getCurrentAccountSuccess } from '../actions';
import { PROFILE_INFO_LS } from 'containers/Login/constants';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

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

describe('getCurrentAccountWorker', () => {
  describe('eos service was initialized with account', () => {
    const account = 'account';
    const prevProfileInfo = null;
    const profileInfoLS = null;

    const profileInfo = {};
    const balance = 10;

    const eos = {
      scatterInstalled: true,
      initialized: true,
      getSelectedAccount: () => account,
    };

    const generator = getCurrentAccountWorker();

    it('put getUserProfile', () => {
      const step = generator.next();
      expect(step.value.type).toBe(GET_USER_PROFILE);
    });

    it('select @eosService', () => {
      select.mockImplementationOnce(() => eos);
      const selectDescriptor = generator.next();
      expect(selectDescriptor.value).toEqual(eos);
    });

    it('select @prevProfileInfo', () => {
      select.mockImplementationOnce(() => prevProfileInfo);
      const selectDescriptor = generator.next(eos);
      expect(selectDescriptor.value).toEqual(prevProfileInfo);
    });

    it('get @account', () => {
      localStorage.getItem.mockImplementationOnce(() => profileInfoLS);

      generator.next(prevProfileInfo);
      expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
    });

    it('get @profileInfo and @balance', () => {
      getProfileInfo.mockImplementationOnce(() => profileInfo);
      getBalance.mockImplementationOnce(() => balance);

      const step = generator.next(account);

      expect(step.value).toEqual([profileInfo, balance]);
      expect(call).toHaveBeenCalledWith(getBalance, eos, account);
      expect(call).toHaveBeenCalledWith(
        getProfileInfo,
        account,
        eos,
        !prevProfileInfo,
      );
    });

    it('getUserProfileSuccess', () => {
      const updatedProfileInfo = {
        ...profileInfo,
        balance,
      };

      const step = generator.next([profileInfo, balance]);

      expect(step.value).toEqual(getUserProfileSuccess(updatedProfileInfo));
      expect(profileInfo).toEqual(updatedProfileInfo);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        PROFILE_INFO_LS,
        JSON.stringify(updatedProfileInfo),
      );
    });

    it('getCurrentAccountSuccess', () => {
      const step = generator.next();
      expect(step.value).toEqual(getCurrentAccountSuccess(account, balance));
    });

    it('error handling', () => {
      const err = 'some error';
      const step = generator.throw(err);
      expect(step.value.type).toBe(GET_CURRENT_ACCOUNT_ERROR);
    });
  });

  describe('eos service was NOT initialized with account and there is no @initAccount', () => {
    const account = null;
    const prevProfileInfo = null;

    const autoLoginData = {
      eosAccountName: 'eosAccountName111',
    };

    const profileInfo = {};
    const balance = 10;

    const eos = {
      scatterInstalled: true,
      initialized: true,
      getSelectedAccount: () => account,
    };

    const generator = getCurrentAccountWorker();

    generator.next();
    generator.next();
    generator.next(eos);
    generator.next(prevProfileInfo);
    generator.next(account);

    it('test', () => {});
  });

  describe('@initAccount was passed', () => {});
  describe('@prevProfileInfo is null', () => {
    describe('userProfileLS is same as current account', () => {});
    describe('userProfileLS is NOT same as current account', () => {});
  });
  describe('@prevProfileInfo is NOT null', () => {});
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
      SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
      ASK_QUESTION_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      SEND_TOKENS_SUCCESS,
      UPVOTE_COMM_SUCCESS,
      DOWNVOTE_COMM_SUCCESS,
      UPVOTE_TAGS_SUCCESS,
      DOWNVOTE_TAGS_SUCCESS,
      PICKUP_REWARD_SUCCESS,
      DELETE_QUESTION_SUCCESS,
      DELETE_ANSWER_SUCCESS,
      DELETE_COMMENT_SUCCESS,
      SAVE_COMMENT_SUCCESS,
    ]);
  });
});
