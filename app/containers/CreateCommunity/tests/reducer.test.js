import { fromJS } from 'immutable';
import createCommunityReducer, { initialState } from '../reducer';

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

describe('createCommunityReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(createCommunityReducer(state, {})).toEqual(state);
  });

  it('setDefaultStore', () => {
    const obj = initialState;

    expect(createCommunityReducer(state, setDefaultStore())).toEqual(obj);
  });

  it('createCommunity', () => {
    const obj = state.set('createCommunityLoading', true);

    expect(createCommunityReducer(state, createCommunity())).toEqual(obj);
  });

  it('createCommunitySuccess', () => {
    const obj = state.set('createCommunityLoading', false);

    expect(createCommunityReducer(state, createCommunitySuccess())).toEqual(
      obj,
    );
  });

  it('createCommunityErr', () => {
    const createCommunityError = 'createCommunityError';
    const obj = state
      .set('createCommunityLoading', false)
      .set('createCommunityError', createCommunityError);

    expect(
      createCommunityReducer(state, createCommunityErr(createCommunityError)),
    ).toEqual(obj);
  });

  it('saveImageChanges', () => {
    const cachedProfileImg = 'cachedProfileImg';
    const blob = 'blob';
    const obj = state
      .set('editingImgState', true)
      .set('cachedProfileImg', cachedProfileImg)
      .set('blob', blob);

    expect(
      createCommunityReducer(
        state,
        saveImageChanges({ cachedProfileImg, blob }),
      ),
    ).toEqual(obj);
  });

  it('clearImageChanges', () => {
    const obj = state.set('editingImgState', true).set('cachedProfileImg', '');

    expect(createCommunityReducer(state, clearImageChanges())).toEqual(obj);
  });

  it('uploadImageFileAction', () => {
    const obj = state.set('isImageLoading', true);

    expect(createCommunityReducer(state, uploadImageFileAction())).toEqual(obj);
  });

  it('uploadImageFileSuccess', () => {
    const cachedProfileImg = 'cachedProfileImg';
    const cachedImgHash = 'cachedImgHash';

    const obj = state
      .set('isImageLoading', false)
      .set('editingImgState', false)
      .set('cachedProfileImg', cachedProfileImg)
      .set('cachedImgHash', cachedImgHash);

    expect(
      createCommunityReducer(
        state,
        uploadImageFileSuccess(cachedProfileImg, cachedImgHash),
      ),
    ).toEqual(obj);
  });

  it('uploadImageFileError', () => {
    const errorUploadImage = 'errorUploadImage';
    const obj = state
      .set('isImageLoading', false)
      .set('errorUploadImage', errorUploadImage);

    expect(
      createCommunityReducer(state, uploadImageFileError(errorUploadImage)),
    ).toEqual(obj);
  });
});
