import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectCreateCommunityDomain = state =>
  state.get('createCommunity', initialState);

export const selectIsImageLoading = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('isImageLoading'),
  );

export const selectErrorUploadImage = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('errorUploadImage'),
  );

export const selectCachedProfileImg = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('cachedProfileImg'),
  );

export const selectEditingImgState = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('editingImgState'),
  );

export const selectCreateCommunityLoading = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('createCommunityLoading'),
  );

export const selectCreateCommunityError = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('createCommunityError'),
  );

export const selectCachedImgHash = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('cachedImgHash'),
  );

export const selectBlob = () =>
  createSelector(selectCreateCommunityDomain, substate => substate.get('blob'));
