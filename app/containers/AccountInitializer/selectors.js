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

const makeSelectEosInit = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('eosInit'),
  );

const makeSelectInitScatter = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('initScatter'),
  );

const makeSelectScatterInstalled = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('scatterInstalled'),
  );

const makeSelectErrorScatterInit = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('errorScatterInit'),
  );

const makeSelectUAccountSelectError = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('selectAccountError'),
  );

const makeSelectUserIsInSystem = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('userIsInSystem'),
  );

export {
  selectAccountInitializerDomain,
  makeSelectAccount,
  makeSelectLoading,
  makeSelectError,
  makeSelectEosInit,
  makeSelectInitScatter,
  makeSelectScatterInstalled,
  makeSelectErrorScatterInit,
  makeSelectUAccountSelectError,
  makeSelectUserIsInSystem,
};
