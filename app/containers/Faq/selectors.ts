import { createSelector } from 'reselect';
import { initialState } from 'containers/Faq/reducer';

export const selectFaqDomain = (state: {
  get: (arg0: string, arg1: any) => any;
}) => state.get('faqReducer', initialState);

export const selectFaqLoading = () =>
  createSelector(selectFaqDomain, substate => substate.get('faqLoading'));

export const selectFaqList = () =>
  createSelector(selectFaqDomain, substate => substate.get('faqList'));

export const selectFaqError = () =>
  createSelector(selectFaqDomain, substate => substate.get('faqError'));
