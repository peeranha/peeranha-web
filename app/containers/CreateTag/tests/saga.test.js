/* eslint redux-saga/yield-effects: 0, no-underscore-dangle: 0 */
import { select, call } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { isAuthorized } from 'containers/EosioProvider/saga';

import defaultSaga, {
  suggestTagWorker,
  redirectToCreateTagWorker,
  checkReadinessWorker,
} from '../saga';

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
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

  it('step, checkReadinessWorker', () => {
    const step = generator.next(account);
    expect(typeof step.value._invoke).toBe('function');
  });

  it('suggestTagSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(SUGGEST_TAG_SUCCESS);
  });

  it('reset', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(props.reset);
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

describe('checkReadinessWorker', () => {
  const buttonId = 'buttonId';

  const generator = checkReadinessWorker({ buttonId });

  it('isAuthorized', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });
});

describe('redirectToCreateTagWorker', () => {
  const buttonId = 'buttonId';
  const communityId = 'communityId';

  const generator = redirectToCreateTagWorker({ buttonId, communityId });

  call.mockImplementationOnce((x, args) => x(args));

  it('step, checkReadinessWorker', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('redirect', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(
      createdHistory.push,
      routes.tagsCreate(communityId),
    );
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SUGGEST_TAG', () => {
    const step = generator.next();
    expect(step.value).toBe(SUGGEST_TAG);
  });

  it('SUGGEST_TAG_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(SUGGEST_TAG_SUCCESS);
  });

  it('SUGGEST_TAG_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(SUGGEST_TAG_ERROR);
  });
});
