/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, all } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { SHOW_SCATTER_SIGNUP_FORM_SUCCESS } from 'containers/SignUp/constants';
import { ASK_QUESTION_SUCCESS } from 'containers/AskQuestion/constants';
import { CREATE_COMMUNITY_SUCCESS } from 'containers/CreateCommunity/constants';
import { SUGGEST_TAG_SUCCESS } from 'containers/CreateTag/constants';
import { EDIT_ANSWER_SUCCESS } from 'containers/EditAnswer/constants';
import { SAVE_PROFILE_ACTION_SUCCESS } from 'containers/EditProfilePage/constants';
import { EDIT_QUESTION_SUCCESS } from 'containers/EditQuestion/constants';
import { SEND_TOKENS_SUCCESS } from 'containers/SendTokens/constants';
import { PICKUP_REWARD_SUCCESS } from 'containers/Wallet/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_COMM_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_COMM_SUCCESS,
} from 'containers/VoteForNewCommunityButton/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_TAGS_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_TAGS_SUCCESS,
} from 'containers/VoteForNewTagButton/constants';

import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_SCATTER_SUCCESS,
  FINISH_REGISTRATION_SUCCESS,
} from 'containers/Login/constants';

import defaultSaga, { getCurrentAccountWorker } from '../saga';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
} from '../constants';

const account = 'user1';
const profileInfo = true;

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(arr => arr.forEach(f => f)),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

getProfileInfo.mockImplementation(() => profileInfo);

describe('getCurrentAccountWorker', () => {
  const generator = getCurrentAccountWorker();
  const eos = {
    scatterInstalled: true,
    initialized: true,
    getSelectedAccount: () => account,
  };

  it('select @eosService', () => {
    select.mockImplementationOnce(() => eos);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(eos);
  });

  it('select @account', () => {
    const selectedScatterAccount = generator.next(eos);
    expect(selectedScatterAccount.value).toEqual(account);
  });

  it('call @all', () => {
    expect(all).toHaveBeenCalledTimes(0);
    generator.next(account);
    expect(all).toHaveBeenCalledTimes(1);
  });

  it('put GET_USER_PROFILE_SUCCESS', () => {
    const putDescriptor = generator.next();
    expect(putDescriptor.value.type).toEqual(GET_USER_PROFILE_SUCCESS);
  });

  it('put GET_CURRENT_ACCOUNT_SUCCESS', () => {
    const putDescriptor = generator.next();
    expect(putDescriptor.value.type).toEqual(GET_CURRENT_ACCOUNT_SUCCESS);
  });

  it('errorHandling', () => {
    const err = new Error('Some error');
    const putDescriptor = generator.throw(err).value;
    expect(putDescriptor.type).toEqual(GET_CURRENT_ACCOUNT_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('getCurrentAccountWorker TAKES array', () => {
    const step = generator.next();
    expect(step.value).toEqual([
      GET_CURRENT_ACCOUNT,
      FOLLOW_HANDLER_SUCCESS,
      LOGIN_WITH_EMAIL_SUCCESS,
      LOGIN_WITH_SCATTER_SUCCESS,
      FINISH_REGISTRATION_SUCCESS,
      SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
      ASK_QUESTION_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      SAVE_PROFILE_ACTION_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      FOLLOW_HANDLER_SUCCESS,
      FINISH_REGISTRATION_SUCCESS,
      SEND_TOKENS_SUCCESS,
      UPVOTE_COMM_SUCCESS,
      DOWNVOTE_COMM_SUCCESS,
      UPVOTE_TAGS_SUCCESS,
      DOWNVOTE_TAGS_SUCCESS,
      PICKUP_REWARD_SUCCESS,
    ]);
  });
});
