import { initialState } from 'containers/AISearch/reducer';
import { createSelector } from 'reselect';

export const aiSearchDomain = (state) => state.get('aiSearchReducer', initialState);
export const selectSearchResult = () =>
  createSelector(aiSearchDomain, (substate) => substate.get('searchResult'));

export const selectSearchResultLoading = () =>
  createSelector(aiSearchDomain, (substate) => substate.get('searchResultLoading'));
