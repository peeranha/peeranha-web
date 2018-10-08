/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import {
  getProfileInfoWorker,
  uploadImageFileWorker,
  saveProfileActionWorker,
  getCitiesListWorker,
} from '../saga';

import {
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
} from '../constants';

describe('getProfileInfoWorker Saga', () => {
  const generator = getProfileInfoWorker({ userKey: 'acc' });

  it('Checking, profile is action with GET_PROFILE_INFORMATION_SUCCESS type', () => {
    generator.next();
    const profile = generator.next();
    expect(profile.value.PUT.action.type).toBe(GET_PROFILE_INFORMATION_SUCCESS);
  });

  it('Error: Completing action with GET_PROFILE_INFORMATION_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(
      GET_PROFILE_INFORMATION_ERROR,
    );
  });
});

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

describe('getCitiesListWorker Saga', () => {
  const generator = getCitiesListWorker({ locationSearch: 'minsk' });

  it('Checking, resp is action with GET_LOCATION_LIST_SUCCESS type', () => {
    generator.next();
    const resp = generator.next();
    expect(resp.value.PUT.action.type).toBe(GET_LOCATION_LIST_SUCCESS);
  });

  it('Error: Completing action with GET_LOCATION_LIST_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(GET_LOCATION_LIST_ERROR);
  });
});
