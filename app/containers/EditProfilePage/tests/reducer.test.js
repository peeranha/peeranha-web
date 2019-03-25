import { fromJS } from 'immutable';

import editProfileReducer from '../reducer';

import {
  uploadImageFileAction,
  uploadImageFileSuccess,
  uploadImageFileError,
  clearImageChanges,
  saveImageChanges,
  saveProfileAction,
  saveProfileActionSuccess,
  saveProfileActionError,
} from '../actions';

describe('editProfileReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(editProfileReducer(state, {})).toEqual(state);
  });

  it('uploadImageFileAction: returns file', () => {
    const obj = state.set('isImageLoading', true);
    expect(editProfileReducer(state, uploadImageFileAction())).toEqual(obj);
  });

  it('uploadImageFileSuccess: returns cachedProfileImg', () => {
    const obj = state
      .set('cachedProfileImg', 'test1')
      .set('isImageLoading', false)
      .set('editingImgState', false);
    expect(editProfileReducer(state, uploadImageFileSuccess('test1'))).toEqual(
      obj,
    );
  });

  it('uploadImageFileError: returns error message', () => {
    const obj = state
      .set('isImageLoading', false)
      .set('errorUploadImage', 'error');
    expect(editProfileReducer(state, uploadImageFileError('error'))).toEqual(
      obj,
    );
  });

  it('clearImageChanges: returns obj', () => {
    const obj = state.set('editingImgState', true).set('cachedProfileImg', '');
    expect(editProfileReducer(state, clearImageChanges())).toEqual(obj);
  });

  it('saveImageChanges: returns cachedProfileImg and blob', () => {
    const cachedProfileImg = 'test1';
    const blob = 'test2';
    const obj = state
      .set('cachedProfileImg', cachedProfileImg)
      .set('blob', blob)
      .set('editingImgState', true);
    expect(
      editProfileReducer(state, saveImageChanges({ cachedProfileImg, blob })),
    ).toEqual(obj);
  });

  it('saveProfileAction: returns @loading true', () => {
    const obj = state.set('isProfileSaving', true);
    expect(editProfileReducer(state, saveProfileAction())).toEqual(obj);
  });

  it('saveProfileActionSuccess: returns @loading false', () => {
    const obj = state.set('isProfileSaving', false);
    expect(editProfileReducer(state, saveProfileActionSuccess())).toEqual(obj);
  });

  it('saveProfileActionError: returns errorSaveProfile', () => {
    const errorSaveProfile = 'error';
    const obj = state
      .set('isProfileSaving', false)
      .set('errorSaveProfile', errorSaveProfile);
    expect(
      editProfileReducer(state, saveProfileActionError(errorSaveProfile)),
    ).toEqual(obj);
  });
});
