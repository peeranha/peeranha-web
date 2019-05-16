import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createTag state domain
 */

const selectCreateTagDomain = state => state.get('createTag', initialState);

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

export {
  selectCreateTagDomain,
  selectSuggestTagLoading,
  selectSuggestTagError,
};
