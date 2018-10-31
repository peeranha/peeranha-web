import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAccountProviderDomain = state =>
  state.get('accountProvider', initialState);

const makeSelectAccount = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('account'),
  );

const makeSelectLoading = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('loading'),
  );

const makeSelectError = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('error'),
  );

const makeSelectUserIsInSystem = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('userIsInSystem'),
  );

const makeSelectAccountError = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('selectAccountError'),
  );

const makeSelectForgetIdentityError = () =>
  createSelector(selectAccountProviderDomain, substate =>
    substate.get('forgetIdentityError'),
  );

export {
  selectAccountProviderDomain,
  makeSelectAccount,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserIsInSystem,
  makeSelectAccountError,
  makeSelectForgetIdentityError,
};
