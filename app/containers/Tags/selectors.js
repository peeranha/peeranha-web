import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectTagsDomain = state => state.get('tags', initialState).toJS();

const selectSorting = () =>
  createSelector(selectTagsDomain, substate => substate.sorting);

const selectLimit = () =>
  createSelector(selectTagsDomain, substate => substate.limit);

const selectExistingTags = () =>
  createSelector(selectTagsDomain, substate => substate.existingTags);

const selectExistingTagsLoading = () =>
  createSelector(selectTagsDomain, substate => substate.existingTagsLoading);

const selectExistingTagsError = () =>
  createSelector(selectTagsDomain, substate => substate.getExistingTagsError);

const selectText = () =>
  createSelector(selectTagsDomain, substate => substate.text);

const selectIsLastFetchForExistingTags = () =>
  createSelector(
    selectTagsDomain,
    substate => substate.isLastFetchForExistingTags,
  );

export {
  selectTagsDomain,
  selectSorting,
  selectLimit,
  selectExistingTags,
  selectExistingTagsLoading,
  selectExistingTagsError,
  selectIsLastFetchForExistingTags,
  selectText,
};
