/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import { AVATAR_FIELD } from 'containers/Profile/constants';
import { isValid } from 'containers/EthereumProvider/saga';

import defaultSaga, { saveProfileWorker } from '../saga';

import {
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_ERROR,
  SAVE_PROFILE,
  EDIT_PROFILE_BUTTON_ID,
  MIN_RATING_TO_EDIT_PROFILE,
  MIN_ENERGY_TO_EDIT_PROFILE,
} from '../constants';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

jest.mock('containers/EthereumProvider/saga', () => ({
  isValid: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  uploadImg: jest.fn(),
  saveProfile: jest.fn(),
}));

const ethereum = {
  scatterInstalled: true,
  initialized: true,
  getSelectedAccount: () => null,
};

describe('saveProfileWorker, AVATAR_FIELD is hash (< 1000 chars)', () => {
  const userKey = 'userKey';
  const profile = {
    [AVATAR_FIELD]: '',
  };

  const generator = saveProfileWorker({ profile, userKey });

  it('select @ethereumService', () => {
    select.mockImplementationOnce(() => ethereum);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(ethereum);
  });

  it('call isValid', () => {
    generator.next(ethereum);
    expect(call).toHaveBeenCalledWith(isValid, {
      buttonId: EDIT_PROFILE_BUTTON_ID,
      minRating: MIN_RATING_TO_EDIT_PROFILE,
      minEnergy: MIN_ENERGY_TO_EDIT_PROFILE,
    });
  });

  it('saveProfile', () => {
    generator.next();

    expect(saveProfile).toHaveBeenCalledWith(
      ethereum,
      userKey,
      profile[AVATAR_FIELD],
      profile,
    );
  });

  it('saveProfileSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(SAVE_PROFILE_SUCCESS);
  });

  it('redirect', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      routes.profileView(userKey),
    );
  });
});

describe('saveProfileWorker, AVATAR_FIELD is new Image (>> 1000 chars)', () => {
  const userKey = 'userKey';
  const imgHash = 'imgHash1010101001';
  const profile = {
    [AVATAR_FIELD]: 'nn'.repeat(1000),
  };

  const generator = saveProfileWorker({ profile, userKey });

  generator.next();
  generator.next(ethereum);

  it('uploadImg - new image', () => {
    uploadImg.mockImplementation(() => ({ imgHash }));

    generator.next();
    expect(uploadImg).toHaveBeenCalledWith(profile[AVATAR_FIELD]);
  });

  it('saveProfile', () => {
    generator.next({ imgHash });

    expect(saveProfile).toHaveBeenCalledWith(ethereum, userKey, imgHash, {
      ...profile,
      [AVATAR_FIELD]: imgHash,
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SAVE_PROFILE', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_PROFILE);
  });

  it('SAVE_PROFILE_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_PROFILE_SUCCESS);
  });

  it('SAVE_PROFILE_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_PROFILE_ERROR);
  });
});
