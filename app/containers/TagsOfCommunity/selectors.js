/* 
  *
  * TagsOfCommunity selectors
  * 
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCommunityTagsDomain = state =>
  state.get('tagsOfCommunity', initialState)?.toJS() || {};

export const selectEditTagData = () =>
  createSelector(
    selectCommunityTagsDomain,
    substate => substate.editTagData || {},
  );
