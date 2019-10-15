/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import { AVATAR_FIELD } from 'containers/Profile/constants';

import defaultSaga, { saveProfileWorker } from '../saga';

import {
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_ERROR,
  SAVE_PROFILE,
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

jest.mock('utils/profileManagement', () => ({
  uploadImg: jest.fn(),
  saveProfile: jest.fn(),
}));

const eos = {
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

  it('select @eosService', () => {
    select.mockImplementationOnce(() => eos);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(eos);
  });

  it('saveProfile', () => {
    generator.next(eos);

    expect(saveProfile).toHaveBeenCalledWith(
      eos,
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

  it('uploadImg - new image', () => {
    uploadImg.mockImplementation(() => ({ imgHash }));

    generator.next(eos);
    expect(uploadImg).toHaveBeenCalledWith(profile[AVATAR_FIELD]);
  });

  it('saveProfile', () => {
    generator.next({ imgHash });

    expect(saveProfile).toHaveBeenCalledWith(eos, userKey, imgHash, {
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
