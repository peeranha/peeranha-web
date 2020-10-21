import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the editCommunity state domain
 */

const selectEditCommunityDomain = state =>
  state.get('editcommunity', initialState);

/**
 * Other specific selectors
 */

export const selectCommunity = () =>
  createSelector(selectEditCommunityDomain, substate =>
    substate.get('community'),
  );

export const selectEditCommunityError = () =>
  createSelector(selectEditCommunityDomain, substate =>
    substate.get('editCommunityError'),
  );

export const selectEditCommunityLoading = () =>
  createSelector(selectEditCommunityDomain, substate =>
    substate.get('editCommunityLoading'),
  );

export const selectGetCommunityError = () =>
  createSelector(selectEditCommunityDomain, substate =>
    substate.get('getCommunityError'),
  );

export const selectGetCommunityLoading = () =>
  createSelector(selectEditCommunityDomain, substate =>
    substate.get('getCommunityLoading'),
  );
