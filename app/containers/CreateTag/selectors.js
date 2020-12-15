import { createSelector } from 'reselect';

import { STATE_KEY } from './constants';

import { initialState } from './reducer';

/**
 * Direct selector to the createTag state domain
 */

const selectCreateTagDomain = state => state.get(STATE_KEY, initialState);

const selectSuggestTagLoading = () =>
  createSelector(
    selectCreateTagDomain,
    substate => substate.toJS().suggestTagLoading,
  );

const selectSuggestTagError = () =>
  createSelector(
    selectCreateTagDomain,
    substate => substate.toJS().suggestTagError,
  );

const selectIsFormLoading = () =>
  createSelector(
    selectCreateTagDomain,
    substate => substate.toJS().isFormLoading,
  );

const selectIsFormAvailable = () =>
  createSelector(
    selectCreateTagDomain,
    substate => substate.toJS().isFormAvailable,
  );

export {
  selectCreateTagDomain,
  selectSuggestTagLoading,
  selectSuggestTagError,
  selectIsFormLoading,
  selectIsFormAvailable,
};
