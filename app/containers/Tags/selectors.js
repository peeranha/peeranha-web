import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectTagsDomain = state => state.get('tags', initialState);

const selectTags = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().tags);

const selectTagsLoading = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().tagsLoading);

const selectTagsError = () =>
  createSelector(
    selectTagsDomain,
    substate => substate.toJS().getSuggestedTagsError,
  );

export { selectTagsDomain, selectTags, selectTagsLoading, selectTagsError };
