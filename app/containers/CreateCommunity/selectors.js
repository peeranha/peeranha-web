import { createSelector } from 'reselect';

import { STATE_KEY } from './constants';

import { initialState } from './reducer';

const selectCreateCommunityDomain = state => state.get(STATE_KEY, initialState);

const selectCreateCommunityLoading = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('createCommunityLoading'),
  );

const selectCreateCommunityError = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('createCommunityError'),
  );

const selectIsFormLoading = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('isFormLoading'),
  );

const selectIsFormAvailable = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('isFormAvailable'),
  );

export {
  selectCreateCommunityDomain,
  selectCreateCommunityLoading,
  selectCreateCommunityError,
  selectIsFormLoading,
  selectIsFormAvailable,
};
