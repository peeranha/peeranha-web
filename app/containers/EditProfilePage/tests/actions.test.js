import {
  uploadImageFileAction,
  uploadImageFileSuccess,
  uploadImageFileError,
  editImage,
  clearImageChanges,
  saveImageChanges,
  saveProfileAction,
  saveProfileActionSuccess,
  saveProfileActionError,
  setDefaultReducer,
} from '../actions';

import {
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  EDIT_IMAGE_STATUS,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  SAVE_PROFILE_ACTION,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  SET_DEFAULT_REDUCER,
} from '../constants';

const str = 'string';

describe('setDefaultReducer', () => {
  it('type SET_DEFAULT_REDUCER', () => {
    const expected = {
      type: SET_DEFAULT_REDUCER,
    };
    expect(setDefaultReducer()).toEqual(expected);
  });
});

describe('uploadImageFile actions', () => {
  describe('uploadImageFileAction Action', () => {
    it('has a type of GET_PROFILE_INFORMATION', () => {
      const expected = {
        type: UPLOAD_IMAGE_FILE,
        file: str,
      };
      expect(uploadImageFileAction(str)).toEqual(expected);
    });
  });

  describe('uploadImageFileSuccess Action', () => {
    it('has a type of GET_PROFILE_INFORMATION_SUCCESS', () => {
      const expected = {
        type: UPLOAD_IMAGE_FILE_SUCCESS,
        cachedProfileImg: str,
      };
      expect(uploadImageFileSuccess(str)).toEqual(expected);
    });
  });

  describe('uploadImageFileError Action', () => {
    it('has a type of GET_PROFILE_INFORMATION_ERROR', () => {
      const expected = {
        type: UPLOAD_IMAGE_FILE_ERROR,
        errorUploadImage: str,
      };
      expect(uploadImageFileError(str)).toEqual(expected);
    });
  });
});

describe('editing actions', () => {
  describe('editImage Action', () => {
    it('has a type of EDIT_IMAGE_STATUS', () => {
      const expected = {
        type: EDIT_IMAGE_STATUS,
      };
      expect(editImage()).toEqual(expected);
    });
  });

  describe('clearImageChanges Action', () => {
    it('has a type of CANCEL_IMAGE_CHANGES', () => {
      const expected = {
        type: CANCEL_IMAGE_CHANGES,
      };
      expect(clearImageChanges()).toEqual(expected);
    });
  });

  describe('saveImageChanges Action', () => {
    it('has a type of SAVE_IMAGE_CHANGES', () => {
      const expected = {
        type: SAVE_IMAGE_CHANGES,
        cachedProfileImg: str,
        blob: str,
      };
      expect(
        saveImageChanges({
          cachedProfileImg: str,
          blob: str,
        }),
      ).toEqual(expected);
    });
  });
});

describe('saveProfile actions', () => {
  describe('saveProfileAction Action', () => {
    it('has a type of SAVE_PROFILE_ACTION', () => {
      const expected = {
        type: SAVE_PROFILE_ACTION,
        obj: str,
      };
      expect(saveProfileAction(str)).toEqual(expected);
    });
  });

  describe('saveProfileActionSuccess Action', () => {
    it('has a type of SAVE_PROFILE_ACTION_SUCCESS', () => {
      const expected = {
        type: SAVE_PROFILE_ACTION_SUCCESS,
      };
      expect(saveProfileActionSuccess()).toEqual(expected);
    });
  });

  describe('saveProfileActionError Action', () => {
    it('has a type of SAVE_PROFILE_ACTION_ERROR', () => {
      const expected = {
        type: SAVE_PROFILE_ACTION_ERROR,
        errorSaveProfile: str,
      };
      expect(saveProfileActionError(str)).toEqual(expected);
    });
  });
});
