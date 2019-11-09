/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, all, call } from 'redux-saga/effects';

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

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
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

describe('getCurrentAccountWorker', () => {
  const account = 'user1';
  const balance = 100;
  const profileInfo = { user: 'user1' };

  const eos = {
    scatterInstalled: true,
    initialized: true,
    getSelectedAccount: () => account,
  };

  describe('prevProfile exists', () => {
    const prevProfileInfo = { user: 'user1', profile: {} };

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

    it('eosService.getSelectedAccount', () => {
      generator.next(prevProfileInfo);
      expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
    });

    it('call @all', () => {
      generator.next(account);
      expect(all).toHaveBeenCalled();
    });

    it('put GET_USER_PROFILE_SUCCESS', () => {
      const putDescriptor = generator.next([profileInfo, balance]);
      expect(putDescriptor.value.type).toBe(GET_USER_PROFILE_SUCCESS);
      expect(putDescriptor.value.profile).toEqual({
        ...profileInfo,
        profile: prevProfileInfo.profile,
      });
    });

    it('put GET_CURRENT_ACCOUNT_SUCCESS', () => {
      const putDescriptor = generator.next();
      expect(putDescriptor.value).toEqual(
        getCurrentAccountSuccess(account, balance),
      );
    });

    it('errorHandling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(GET_CURRENT_ACCOUNT_ERROR);
    });
  });

  describe('prevProfile not exists', () => {
    const prevProfileInfo = null;
    const generator = getCurrentAccountWorker();

    generator.next();
    generator.next();
    generator.next(eos);
    generator.next(prevProfileInfo);
    generator.next(account);

    it('put GET_USER_PROFILE_SUCCESS', () => {
      const putDescriptor = generator.next([profileInfo, balance]);
      expect(putDescriptor.value.profile).toEqual(profileInfo);
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
