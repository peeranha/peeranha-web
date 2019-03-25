import {
  uploadImageFileAction,
  uploadImageFileSuccess,
  uploadImageFileError,
  clearImageChanges,
  saveImageChanges,
  createCommunity,
  createCommunitySuccess,
  createCommunityErr,
  setDefaultStore,
} from '../actions';

import {
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  SET_DEFAULT_STORE,
} from '../constants';

describe('createCommunity actions', () => {
  it('SET_DEFAULT_STORE', () => {
    const expected = {
      type: SET_DEFAULT_STORE,
    };

    expect(setDefaultStore()).toEqual(expected);
  });

  it('CREATE_COMMUNITY', () => {
    const community = 'community';
    const reset = 'reset';

    const expected = {
      type: CREATE_COMMUNITY,
      community,
      reset,
    };

    expect(createCommunity(community, reset)).toEqual(expected);
  });

  it('CREATE_COMMUNITY_SUCCESS', () => {
    const expected = {
      type: CREATE_COMMUNITY_SUCCESS,
    };

    expect(createCommunitySuccess()).toEqual(expected);
  });

  it('CREATE_COMMUNITY_ERROR', () => {
    const createCommunityError = 'createCommunityError';

    const expected = {
      type: CREATE_COMMUNITY_ERROR,
      createCommunityError,
    };

    expect(createCommunityErr(createCommunityError)).toEqual(expected);
  });

  it('SAVE_IMAGE_CHANGES', () => {
    const cachedProfileImg = 'cachedProfileImg';
    const blob = 'blob';

    const expected = {
      type: SAVE_IMAGE_CHANGES,
      cachedProfileImg,
      blob,
    };

    expect(saveImageChanges({ cachedProfileImg, blob })).toEqual(expected);
  });

  it('CANCEL_IMAGE_CHANGES', () => {
    const expected = {
      type: CANCEL_IMAGE_CHANGES,
    };

    expect(clearImageChanges()).toEqual(expected);
  });

  it('UPLOAD_IMAGE_FILE', () => {
    const file = 'file';

    const expected = {
      type: UPLOAD_IMAGE_FILE,
      file,
    };

    expect(uploadImageFileAction(file)).toEqual(expected);
  });

  it('UPLOAD_IMAGE_FILE_SUCCESS', () => {
    const cachedProfileImg = 'cachedProfileImg';
    const cachedImgHash = 'cachedImgHash';

    const expected = {
      type: UPLOAD_IMAGE_FILE_SUCCESS,
      cachedProfileImg,
      cachedImgHash,
    };

    expect(uploadImageFileSuccess(cachedProfileImg, cachedImgHash)).toEqual(
      expected,
    );
  });

  it('UPLOAD_IMAGE_FILE_ERROR', () => {
    const errorUploadImage = 'errorUploadImage';

    const expected = {
      type: UPLOAD_IMAGE_FILE_ERROR,
      errorUploadImage,
    };

    expect(uploadImageFileError(errorUploadImage)).toEqual(expected);
  });
});
