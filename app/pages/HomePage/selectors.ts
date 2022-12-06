import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectHomepageDomain = (state: {
  get: (arg0: string, arg1: any) => any;
}) => state.get('homepage', initialState);

export const selectSendMessageLoading = () =>
  createSelector(selectHomepageDomain, (substate) =>
    substate.get('sendMessageLoading'),
  );

export const selectSendMessageError = () =>
  createSelector(selectHomepageDomain, (substate) =>
    substate.get('sendMessageError'),
  );
