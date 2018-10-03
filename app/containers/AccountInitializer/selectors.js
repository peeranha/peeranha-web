import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAccountInitializerDomain = state =>
  state.get('accountInitializer', initialState);

const makeSelectAccount = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('account'),
  );

const makeSelectLoading = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('loading'),
  );

const makeSelectError = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('error'),
  );

export {
  selectAccountInitializerDomain,
  makeSelectAccount,
  makeSelectLoading,
  makeSelectError,
};
