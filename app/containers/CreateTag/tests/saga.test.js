/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { suggestTag } from 'utils/communityManagement';

import defaultSaga, { suggestTagWorker } from '../saga';

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/communityManagement', () => ({
  suggestTag: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

describe('suggestTagWorker', () => {
  const props = {
    tag: {
      communityId: 1,
    },
    reset: jest.fn(),
  };

  const account = 'user1';
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  const generator = suggestTagWorker(props);

  it('step, eos', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('getSelectedAccount', () => {
    const step = generator.next(eos);
    expect(step.value).toEqual(account);
  });

  it('suggestTag', () => {
    generator.next(account);
    expect(suggestTag).toHaveBeenCalledWith(eos, account, props.tag);
  });

  it('suggestTagSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(SUGGEST_TAG_SUCCESS);
  });

  it('reset', () => {
    generator.next();
    expect(props.reset).toHaveBeenCalled();
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      routes.suggestedTags(props.tag.communityId),
    );
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(SUGGEST_TAG_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SUGGEST_TAG', () => {
    const step = generator.next();
    expect(step.value).toBe(SUGGEST_TAG);
  });
});
