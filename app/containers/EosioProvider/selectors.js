import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eosioProvider state domain
 */

const selectEosioProviderDomain = state =>
  state.get('eosioProvider', initialState);

const makeSelectInitializing = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('initializing'),
  );

const makeSelectInitialized = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('initialized'),
  );

const makeSelectScatterInstalled = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('scatterInstalled'),
  );

const makeSelectScatterInstance = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('scatterInstance'),
  );

const makeSelectEosioInstance = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('eosioInstance'),
  );

const makeSelectError = () =>
  createSelector(selectEosioProviderDomain, substate => substate.get('error'));

export {
  selectEosioProviderDomain,
  makeSelectInitializing,
  makeSelectInitialized,
  makeSelectScatterInstalled,
  makeSelectScatterInstance,
  makeSelectEosioInstance,
  makeSelectError,
};
