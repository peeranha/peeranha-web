import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectFaqDomain = state => state.get('faqReducer', initialState);

export const selectFaqLoading = () =>
  createSelector(selectFaqDomain, substate => substate.get('faqLoading'));

export const selectFaqList = () =>
  createSelector(selectFaqDomain, substate => substate.get('faqList'));

export const selectFaqError = () =>
  createSelector(selectFaqDomain, substate => substate.get('faqError'));
