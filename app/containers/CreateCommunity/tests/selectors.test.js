import { fromJS } from 'immutable';
import {
  selectCreateCommunityDomain,
  selectIsImageLoading,
  selectErrorUploadImage,
  selectCachedProfileImg,
  selectEditingImgState,
  selectCreateCommunityLoading,
  selectCreateCommunityError,
  selectCachedImgHash,
  selectBlob,
} from '../selectors';

describe('selectCreateCommunityDomain', () => {
  const isImageLoading = false;
  const errorUploadImage = null;
  const cachedProfileImg = '';
  const editingImgState = '';
  const createCommunityLoading = false;
  const createCommunityError = null;
  const cachedImgHash = '';
  const blob = '';

  const globalState = fromJS({
    isImageLoading,
    errorUploadImage,
    cachedProfileImg,
    editingImgState,
    createCommunityLoading,
    createCommunityError,
    cachedImgHash,
    blob,
  });

  const mockedState = fromJS({
    createCommunity: globalState,
  });

  it('should select the global state', () => {
    expect(selectCreateCommunityDomain(mockedState)).toEqual(globalState);
  });

  it('selectIsImageLoading', () => {
    const isSelectIsImageLoading = selectIsImageLoading();
    expect(isSelectIsImageLoading(mockedState)).toEqual(isImageLoading);
  });

  it('selectErrorUploadImage', () => {
    const isSelectErrorUploadImage = selectErrorUploadImage();
    expect(isSelectErrorUploadImage(mockedState)).toEqual(errorUploadImage);
  });

  it('selectCachedProfileImg', () => {
    const isSelectCachedProfileImg = selectCachedProfileImg();
    expect(isSelectCachedProfileImg(mockedState)).toEqual(cachedProfileImg);
  });

  it('selectEditingImgState', () => {
    const isSelectEditingImgState = selectEditingImgState();
    expect(isSelectEditingImgState(mockedState)).toEqual(editingImgState);
  });

  it('selectCreateCommunityLoading', () => {
    const isSelectCreateCommunityLoading = selectCreateCommunityLoading();
    expect(isSelectCreateCommunityLoading(mockedState)).toEqual(
      createCommunityLoading,
    );
  });

  it('selectCreateCommunityError', () => {
    const isSelectCreateCommunityError = selectCreateCommunityError();
    expect(isSelectCreateCommunityError(mockedState)).toEqual(
      createCommunityError,
    );
  });

  it('selectCachedImgHash', () => {
    const isSelectCachedImgHash = selectCachedImgHash();
    expect(isSelectCachedImgHash(mockedState)).toEqual(cachedImgHash);
  });

  it('selectCachedImgHash', () => {
    const isSelectBlob = selectBlob();
    expect(isSelectBlob(mockedState)).toEqual(blob);
  });
});
