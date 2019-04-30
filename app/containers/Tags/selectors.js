import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectTagsDomain = state => state.get('tags', initialState).toJS();

const selectSuggestedTags = () =>
  createSelector(selectTagsDomain, substate => substate.suggestedTags);

const selectSuggestedTagsLoading = () =>
  createSelector(selectTagsDomain, substate => substate.suggestedTagsLoading);

const selectSuggestedTagsError = () =>
  createSelector(selectTagsDomain, substate => substate.getSuggestedTagsError);

const selectSorting = () =>
  createSelector(selectTagsDomain, substate => substate.sorting);

const selectIsLastFetchForSuggestedTags = () =>
  createSelector(
    selectTagsDomain,
    substate => substate.isLastFetchForSuggestedTags,
  );

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
  selectSuggestedTags,
  selectSuggestedTagsLoading,
  selectSuggestedTagsError,
  selectSorting,
  selectIsLastFetchForSuggestedTags,
  selectLimit,
  selectExistingTags,
  selectExistingTagsLoading,
  selectExistingTagsError,
  selectIsLastFetchForExistingTags,
  selectText,
};
