import {
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoError,
  uploadImageFileAction,
  uploadImageFileSuccess,
  uploadImageFileError,
  editImage,
  clearImageChanges,
  saveImageChanges,
  saveProfileAction,
  saveProfileActionSuccess,
  saveProfileActionError,
  getCitiesList,
  getCitiesListSuccess,
  getCitiesListError,
  chooseLocation,
} from '../actions';

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  EDIT_IMAGE_STATUS,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  SAVE_PROFILE_ACTION,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  CHOICE_CITY_ACTION,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
} from '../constants';

const str = 'string';

describe('getProfileInformation actions', () => {
  describe('getProfileInfo Action', () => {
    it('has a type of GET_PROFILE_INFORMATION', () => {
      const expected = {
        type: GET_PROFILE_INFORMATION,
        userKey: str,
      };
      expect(getProfileInfo(str)).toEqual(expected);
    });
  });

  describe('getProfileInfoSuccess Action', () => {
    it('has a type of GET_PROFILE_INFORMATION_SUCCESS', () => {
      const expected = {
        type: GET_PROFILE_INFORMATION_SUCCESS,
        profile: str,
      };
      expect(getProfileInfoSuccess(str)).toEqual(expected);
    });
  });

  describe('getProfileInfoError Action', () => {
    it('has a type of GET_PROFILE_INFORMATION_ERROR', () => {
      const expected = {
        type: GET_PROFILE_INFORMATION_ERROR,
        errorLoadProfile: str,
      };
      expect(getProfileInfoError(str)).toEqual(expected);
    });
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
        cashedProfileImg: str,
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
        cashedProfileImg: str,
        blob: str,
      };
      expect(
        saveImageChanges({
          cashedProfileImg: str,
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

describe('get citiesList actions', () => {
  describe('getCitiesList Action', () => {
    it('has a type of GET_LOCATION_LIST', () => {
      const expected = {
        type: GET_LOCATION_LIST,
        locationSearch: str,
      };
      expect(getCitiesList(str)).toEqual(expected);
    });
  });

  describe('getCitiesListSuccess Action', () => {
    it('has a type of GET_LOCATION_LIST_SUCCESS', () => {
      const expected = {
        type: GET_LOCATION_LIST_SUCCESS,
        citiesList: str,
      };
      expect(getCitiesListSuccess(str)).toEqual(expected);
    });
  });

  describe('getCitiesListError Action', () => {
    it('has a type of GET_LOCATION_LIST_ERROR', () => {
      const expected = {
        type: GET_LOCATION_LIST_ERROR,
        errorCitiesList: str,
      };
      expect(getCitiesListError(str)).toEqual(expected);
    });
  });

  describe('chooseLocation Action', () => {
    it('has a type of CHOICE_CITY_ACTION', () => {
      const expected = {
        type: CHOICE_CITY_ACTION,
        cityId: str,
        city: str,
      };
      expect(chooseLocation(str, str)).toEqual(expected);
    });
  });
});
