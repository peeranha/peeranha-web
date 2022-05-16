/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import {
  upVoteToCreateTag,
  downVoteToCreateTag,
} from 'utils/communityManagement';

import { isValid, isAuthorized } from 'containers/EosioProvider/saga';

import {downVoteWorker, upVoteWorker} from "containers/ViewQuestion/saga";
import defaultSaga from '../saga';

import {
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
  MIN_RATING_TO_UPVOTE,
  MIN_ENERGY_TO_UPVOTE,
  MIN_RATING_TO_DOWNVOTE,
  MIN_ENERGY_TO_DOWNVOTE,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, args) => x(args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/EosioProvider/saga', () => ({
  isValid: jest.fn(),
  isAuthorized: jest.fn(),
}));

jest.mock('utils/communityManagement', () => ({
  upVoteToCreateTag: jest.fn(),
  downVoteToCreateTag: jest.fn(),
}));

describe('downVoteWorker', () => {
  const props = {
    communityId: 1,
    tagId: 1,
    buttonId: 1,
  };

  const account = 'user1';
  const storedTags = [{ id: 1, creator: 'user1' }];

  const activeTag = storedTags.filter(x => x.id === props.tagId)[0];

  const eos = {};

  const generator = downVoteWorker(props);

  it('eosService', () => {
    select.mockImplementationOnce(() => eos);
    const service = generator.next();
    expect(service.value).toEqual(eos);
  });

  it('account', () => {
    select.mockImplementationOnce(() => account);
    const service = generator.next(eos);
    expect(service.value).toEqual(account);
  });

  it('storedTags', () => {
    select.mockImplementationOnce(() => storedTags);
    const step = generator.next(account);
    expect(step.value).toEqual(storedTags);
  });

  it('isAuthorized', () => {
    generator.next(storedTags);
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('isValid', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isValid, {
      creator: activeTag.creator,
      buttonId: props.buttonId,
      minRating: MIN_RATING_TO_DOWNVOTE,
      minEnergy: MIN_ENERGY_TO_DOWNVOTE,
    });
  });

  it('downVoteToCreateTag', () => {
    generator.next();
    expect(downVoteToCreateTag).toHaveBeenCalledWith(
      eos,
      account,
      props.communityId,
      props.tagId,
    );
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

describe('upVoteWorker', () => {
  const props = {
    communityId: 1,
    tagId: 1,
    buttonId: 1,
  };

  const account = 'user1';
  const storedTags = [{ id: 1, creator: 'user1' }];

  const activeTag = storedTags.filter(x => x.id === props.tagId)[0];

  const eos = {};

  const generator = upVoteWorker(props);

  it('eosService', () => {
    select.mockImplementationOnce(() => eos);
    const service = generator.next();
    expect(service.value).toEqual(eos);
  });

  it('account', () => {
    select.mockImplementationOnce(() => account);
    const service = generator.next(eos);
    expect(service.value).toEqual(account);
  });

  it('storedTags', () => {
    select.mockImplementationOnce(() => storedTags);
    const step = generator.next(account);
    expect(step.value).toEqual(storedTags);
  });

  it('isAuthorized', () => {
    generator.next(storedTags);
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('isValid', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isValid, {
      creator: activeTag.creator,
      buttonId: props.buttonId,
      minRating: MIN_RATING_TO_UPVOTE,
      minEnergy: MIN_ENERGY_TO_UPVOTE,
    });
  });

  it('upVoteToCreateTag', () => {
    generator.next();
    expect(upVoteToCreateTag).toHaveBeenCalledWith(
      eos,
      account,
      props.communityId,
      props.tagId,
    );
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
