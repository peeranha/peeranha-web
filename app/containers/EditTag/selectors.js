/*
 *
 * Edit tag selectors
 *
 */

import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectEditTagDomain = (state) =>
  state.get('editTag', initialState).toJS();

export const selectEditTagFormLoading = () =>
  createSelector(
    selectEditTagDomain,
    (substate) => substate.editTagFormLoading,
  );

export const selectEditTagProcessing = () =>
  createSelector(selectEditTagDomain, (substate) => substate.editTagProcessing);
