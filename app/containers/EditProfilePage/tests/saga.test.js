/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import defaultSaga, {
  uploadImageFileWorker,
  saveProfileActionWorker,
} from '../saga';

import {
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  UPLOAD_IMAGE_FILE,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  SAVE_PROFILE_ACTION,
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

const saved = 'saved';
const uploaded = 'uploaded';

jest.mock('utils/profileManagement');
saveProfile.mockImplementation(() => saved);
uploadImg.mockImplementation(() => uploaded);

describe('saveProfileActionWorker, reader in null', () => {
  const sendProps = {
    obj: {
      profile: {
        ipfs: {},
      },
      userKey: 'user',
    },
  };
  const generator = saveProfileActionWorker(sendProps);

  generator.next();

  const nextStep = generator.next();
  expect(nextStep.value).toBe(undefined);
});

describe('saveProfileActionWorker', () => {
  const sendProps = {
    obj: {
      reader: {},
      profile: {
        ipfs: {},
      },
      userKey: 'user',
    },
  };
  const generator = saveProfileActionWorker(sendProps);

  it('step1, eosService selecting', () => {
    const eosService = {
      test: null,
    };
    select.mockImplementation(() => eosService);
    const step1 = generator.next();
    expect(step1.value).toEqual(eosService);
  });

  it('step2, reader true', () => {
    const step2 = generator.next();
    expect(step2.value).toBe(uploaded);
  });

  it('step3, writing', () => {
    const img = {
      imgHash: 'yyy',
    };
    const step3 = generator.next(img);
    expect(step3.value).toBe(img.imgHash);
  });

  it('step4, saveProfile', () => {
    const step4 = generator.next();
    expect(step4.value).toBe(saved);
  });

  it('step, type Success, putDescriptor', () => {
    const step = generator.next();
    expect(step.value.type).toBe(SAVE_PROFILE_ACTION_SUCCESS);
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      routes.profileView(sendProps.obj.userKey),
    );
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(SAVE_PROFILE_ACTION_ERROR);
  });
});

describe('uploadImageFileWorker', () => {
  const generator = uploadImageFileWorker({ file: {} });

  it('step1', () => {
    const step1 = generator.next();
    expect(step1.value).toBe(uploaded);
  });

  it('step2, action with Success Type', () => {
    const step2 = generator.next({ imageUrl: 'url' });
    expect(step2.value.type).toBe(UPLOAD_IMAGE_FILE_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(UPLOAD_IMAGE_FILE_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('UPLOAD_IMAGE_FILE', () => {
    const step = generator.next();
    expect(step.value).toBe(UPLOAD_IMAGE_FILE);
  });

  it('SAVE_PROFILE_ACTION', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_PROFILE_ACTION);
  });

  it('SAVE_PROFILE_ACTION_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_PROFILE_ACTION_SUCCESS);
  });

  it('SAVE_PROFILE_ACTION_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_PROFILE_ACTION_ERROR);
  });
});
