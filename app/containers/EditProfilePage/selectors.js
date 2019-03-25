import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

export const selectEditProfileDomain = state =>
  state.get('editProfileReducer', initialState);

export const selectIsImageLoading = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('isImageLoading'),
  );

export const selectErrorUploadImage = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('errorUploadImage'),
  );

export const selectCachedProfileImg = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('cachedProfileImg'),
  );

export const selectEditingImgState = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('editingImgState'),
  );

export const selectBlob = () =>
  createSelector(selectEditProfileDomain, substate => substate.get('blob'));

export const selectErrorSaveProfile = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('errorSaveProfile'),
  );

export const selectIsProfileSaving = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('isProfileSaving'),
  );
