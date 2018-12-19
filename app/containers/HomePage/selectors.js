import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editQuestion state domain
 */

const selectHomepageDomain = state => state.get('homepage', initialState);

const selectSendEmailLoading = () =>
  createSelector(selectHomepageDomain, substate =>
    substate.get('sendEmailLoading'),
  );

const selectSendEmailError = () =>
  createSelector(selectHomepageDomain, substate =>
    substate.get('sendEmailError'),
  );

const selectSendMessageLoading = () =>
  createSelector(selectHomepageDomain, substate =>
    substate.get('sendMessageLoading'),
  );

const selectSendMessageError = () =>
  createSelector(selectHomepageDomain, substate =>
    substate.get('sendMessageError'),
  );

export {
  selectHomepageDomain,
  selectSendEmailLoading,
  selectSendEmailError,
  selectSendMessageLoading,
  selectSendMessageError,
};
