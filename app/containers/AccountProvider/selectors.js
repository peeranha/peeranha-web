import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAccountProviderDomain = state =>
  state.get('accountProvider', initialState);

const makeSelectLoading = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('loading'),
  );

const makeSelectError = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('error'),
  );

const makeSelectAccount = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('account'),
  );

const makeSelectProfileInfo = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('profileInfo'),
  );

const makeSelectFollowedCommunities = () =>
  createSelector(
    selectAccountProviderDomain,
    substate =>
      substate.get('profileInfo')
        ? substate.get('profileInfo').followed_communities
        : null,
  );

const selectLoginSignupError = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('loginSignupError'),
  );

const makeSelectForgetIdentityError = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('forgetIdentityError'),
  );

export {
  selectAccountProviderDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAccount,
  makeSelectProfileInfo,
  makeSelectFollowedCommunities,
  selectLoginSignupError,
  makeSelectForgetIdentityError,
};
