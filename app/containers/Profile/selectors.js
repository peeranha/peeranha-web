import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectProfileDomain = state => state.get('profile', initialState);

const makeSelectLoadingProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingProfile'),
  );

const makeSelectLoadingImage = () =>
  createSelector(selectProfileDomain, substate => substate.get('loadingImage'));

const makeSelectErrorProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get('errorProfile'));

const makeSelectErrorUploadImage = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorUploadImage'),
  );

const makeSelectUserKey = () =>
  createSelector(selectProfileDomain, substate => substate.get('userKey'));

const makeSelectProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get('profile'));

const makeSelectCashedProfileImg = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('cashedProfileImg'),
  );

const makeSelectEditImageStatus = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('editImageStatus'),
  );

const makeSelectBlob = () =>
  createSelector(selectProfileDomain, substate => substate.get('blob'));

const makeSelectErrorSaveProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorSaveProfile'),
  );

const makeSelectLoadingSaveProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingSaveProfile'),
  );

const makeSelectLoadingGetLocationList = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingGetLocationList'),
  );

const makeSelectErrorLocationList = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorLocationList'),
  );

const makeSelectLocationList = () =>
  createSelector(selectProfileDomain, substate => substate.get('locationList'));

export {
  selectProfileDomain,
  makeSelectProfile,
  makeSelectLoadingProfile,
  makeSelectLoadingImage,
  makeSelectErrorProfile,
  makeSelectUserKey,
  makeSelectCashedProfileImg,
  makeSelectErrorUploadImage,
  makeSelectEditImageStatus,
  makeSelectBlob,
  makeSelectErrorSaveProfile,
  makeSelectLoadingSaveProfile,
  makeSelectLoadingGetLocationList,
  makeSelectErrorLocationList,
  makeSelectLocationList,
};
