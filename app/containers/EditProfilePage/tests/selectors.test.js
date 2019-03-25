import { fromJS } from 'immutable';
import {
  selectEditProfileDomain,
  selectIsImageLoading,
  selectErrorUploadImage,
  selectCachedProfileImg,
  selectEditingImgState,
  selectBlob,
  selectErrorSaveProfile,
  selectIsProfileSaving,
} from '../selectors';

describe('selectEditProfileDomain', () => {
  const isImageLoading = true;
  const errorUploadImage = 'error';
  const cachedProfileImg = 'cach';
  const editingImgState = false;
  const blob = 'blob';
  const errorSaveProfile = 'errorSave';
  const isProfileSaving = false;

  const globalState = fromJS({
    isImageLoading,
    errorUploadImage,
    cachedProfileImg,
    editingImgState,
    blob,
    errorSaveProfile,
    isProfileSaving,
  });

  const mockedState = fromJS({
    editProfileReducer: globalState,
  });

  it('should select the global state', () => {
    expect(selectEditProfileDomain(mockedState)).toEqual(globalState);
  });

  it('selectIsImageLoading', () => {
    const isImgLoading = selectIsImageLoading();
    expect(isImgLoading(mockedState)).toEqual(isImageLoading);
  });

  it('selectErrorUploadImage', () => {
    const errUpload = selectErrorUploadImage();
    expect(errUpload(mockedState)).toEqual(errorUploadImage);
  });

  it('selectCachedProfileImg', () => {
    const cach = selectCachedProfileImg();
    expect(cach(mockedState)).toEqual(cachedProfileImg);
  });

  it('selectEditingImgState', () => {
    const editImgState = selectEditingImgState();
    expect(editImgState(mockedState)).toEqual(editingImgState);
  });

  it('selectBlob', () => {
    const isBlob = selectBlob();
    expect(isBlob(mockedState)).toEqual(blob);
  });

  it('selectErrorSaveProfile', () => {
    const errSaveProfile = selectErrorSaveProfile();
    expect(errSaveProfile(mockedState)).toEqual(errorSaveProfile);
  });

  it('selectIsProfileSaving', () => {
    const profileSaving = selectIsProfileSaving();
    expect(profileSaving(mockedState)).toEqual(isProfileSaving);
  });
});
