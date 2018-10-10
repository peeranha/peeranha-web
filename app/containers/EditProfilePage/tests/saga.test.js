/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { uploadImageFileWorker, saveProfileActionWorker } from '../saga';

import {
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
} from '../constants';

describe('uploadImageFileWorker Saga', () => {
  const generator = uploadImageFileWorker({ file: {} });

  it('Checking, image is action with UPLOAD_IMAGE_FILE_SUCCESS type', () => {
    generator.next();
    generator.next();
    const image = generator.next();
    expect(image.value.PUT.action.type).toBe(UPLOAD_IMAGE_FILE_SUCCESS);
  });

  it('Error: Completing action with UPLOAD_IMAGE_FILE_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(UPLOAD_IMAGE_FILE_ERROR);
  });
});

describe('saveProfileActionWorker Saga', () => {
  describe('type - case @!!reader === false', () => {
    const obj = {
      userKey: {},
      profile: {},
    };

    const generator = saveProfileActionWorker({ obj });

    it('action with SAVE_PROFILE_ACTION_SUCCESS', () => {
      generator.next();
      generator.next();
      const profile = generator.next();

      expect(profile.value.PUT.action.type).toBe(SAVE_PROFILE_ACTION_SUCCESS);
    });
  });

  describe('type - case @!!reader === true', () => {
    const obj = {
      userKey: {},
      profile: {},
      reader: {},
    };

    const generator = saveProfileActionWorker({ obj });

    it('action with SAVE_PROFILE_ACTION_SUCCESS', () => {
      generator.next();
      generator.next();
      generator.next();
      const profile = generator.next();

      expect(profile.value.PUT.action.type).toBe(SAVE_PROFILE_ACTION_SUCCESS);
    });

    it('Error: Completing action with SAVE_PROFILE_ACTION_ERROR type', () => {
      const response = new Error('Some error');
      const putDescriptor = generator.throw(response).value;
      expect(putDescriptor.PUT.action.type).toEqual(SAVE_PROFILE_ACTION_ERROR);
    });
  });
});
