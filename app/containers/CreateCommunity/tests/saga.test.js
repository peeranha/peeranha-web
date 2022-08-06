/* eslint redux-saga/yield-effects: 0, no-underscore-dangle: 0 */
import { select, call } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createCommunity } from 'utils/communityManagement';

import { isValid, isAuthorized } from 'containers/EthereumProvider/saga';

import defaultSaga, {
  createCommunityWorker,
  checkReadinessWorker,
  redirectToCreateCommunityWorker,
} from '../saga';

import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  MIN_RATING_TO_CREATE_COMMUNITY,
  MIN_ENERGY_TO_CREATE_COMMUNITY,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, args) => x(args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/EthereumProvider/saga', () => ({
  isValid: jest.fn(),
  isAuthorized: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  uploadImg: jest.fn(),
}));

jest.mock('utils/communityManagement', () => ({
  createCommunity: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

describe('createCommunityWorker', () => {
  const props = { community: null, reset: jest.fn() };

  const account = 'user1';
  const ethereum = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  const generator = createCommunityWorker(props);

  it('step, ethereum', () => {
    select.mockImplementation(() => ethereum);
    const step = generator.next();
    expect(step.value).toEqual(ethereum);
  });

  it('getSelectedAccount', () => {
    const step = generator.next(ethereum);
    expect(step.value).toEqual(account);
  });

  it('step, checkReadinessWorker', () => {
    const step = generator.next(account);
    expect(typeof step.value._invoke).toBe('function');
  });

  it('createCommunity', () => {
    generator.next();
    expect(createCommunity).toHaveBeenCalledWith(
      ethereum,
      account,
      props.community,
    );
  });

  it('createCommunitySuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(CREATE_COMMUNITY_SUCCESS);
  });

  it('reset', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(props.reset);
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      routes.communitiesCreatedBanner(),
    );
  });

  it('error handling', () => {
    const err = 'some error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(CREATE_COMMUNITY_ERROR);
  });
});

describe('checkReadinessWorker', () => {
  const buttonId = 'buttonId';

  const generator = checkReadinessWorker({ buttonId });

  it('isAuthorized', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('isValid', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isValid, {
      buttonId,
      minRating: MIN_RATING_TO_CREATE_COMMUNITY,
      minEnergy: MIN_ENERGY_TO_CREATE_COMMUNITY,
    });
  });
});

describe('redirectToCreateCommunityWorker', () => {
  const buttonId = 'buttonId';

  const generator = redirectToCreateCommunityWorker({ buttonId });

  call.mockImplementationOnce((x, args) => x(args));

  it('step, checkReadinessWorker', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('redirect', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(
      createdHistory.push,
      routes.communitiesCreate(),
    );
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('CREATE_COMMUNITY', () => {
    const step = generator.next();
    expect(step.value).toBe(CREATE_COMMUNITY);
  });

  it('CREATE_COMMUNITY_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(CREATE_COMMUNITY_SUCCESS);
  });

  it('CREATE_COMMUNITY_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(CREATE_COMMUNITY_ERROR);
  });
});
