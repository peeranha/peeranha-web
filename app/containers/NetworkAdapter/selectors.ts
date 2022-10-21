import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNetworkAdapterProviderDomain = state =>
  state.get('networkAdapter', initialState);

const selectNetworkAdapter = state =>
  selectNetworkAdapterProviderDomain(state).get('networkAdapter');

const makeSelectInitializing = () =>
  createSelector(selectNetworkAdapterProviderDomain, substate =>
    substate.get('initializing'),
  );

const makeSelectNetworkAdapter = () =>
  createSelector(selectNetworkAdapterProviderDomain, substate =>
    substate.get('networkAdapter'),
  );

const makeSelectError = () =>
  createSelector(selectNetworkAdapterProviderDomain, substate =>
    substate.get('error'),
  );

const selectTransactionInPending = () =>
  createSelector(selectNetworkAdapterProviderDomain, substate =>
    substate.get('inPending'),
  );

const selectTransactionHash = () =>
  createSelector(selectNetworkAdapterProviderDomain, substate =>
    substate.get('transactionHash'),
  );

const selectTransactionInitialised = () =>
  createSelector(selectNetworkAdapterProviderDomain, substate =>
    substate.get('transactionInitialised'),
  );

export {
  selectNetworkAdapterProviderDomain,
  selectNetworkAdapter,
  makeSelectInitializing,
  makeSelectNetworkAdapter,
  makeSelectError,
  selectTransactionInPending,
  selectTransactionHash,
  selectTransactionInitialised,
};
