import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

export const selectProfileDomain = state => state.get('profile', initialState);

export const selectLoadingProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingProfile'),
  );

export const selectLoadingImage = () =>
  createSelector(selectProfileDomain, substate => substate.get('loadingImage'));

export const selectErrorLoadProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorLoadProfile'),
  );

export const selectErrorUploadImage = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorUploadImage'),
  );

export const selectUserKey = () =>
  createSelector(selectProfileDomain, substate => substate.get('userKey'));

export const selectProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get('profile'));

export const selectCashedProfileImg = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('cashedProfileImg'),
  );

export const selectEditingImgState = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('editingImgState'),
  );

export const selectBlob = () =>
  createSelector(selectProfileDomain, substate => substate.get('blob'));

export const selectErrorSaveProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorSaveProfile'),
  );

export const selectLoadingSaveProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingSaveProfile'),
  );

export const selectLoadingGetCitiesList = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingGetCitiesList'),
  );

export const selectErrorCitiesList = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorCitiesList'),
  );

export const selectCitiesList = () =>
  createSelector(selectProfileDomain, substate => substate.get('citiesList'));
