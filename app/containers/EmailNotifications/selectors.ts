import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { ReducerType } from './types';

const selectEmailNotificationsDomain = (state: {
  emailNotifications: ReducerType;
}) => state.get('emailNotifications', initialState).toJS();

const selectShowModal = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.showModal,
  );

const selectContent = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.content,
  );

const selectSendEmailProcessing = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.sendEmailProcessing,
  );

const selectConfirmEmailProcessing = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.confirmEmailProcessing,
  );

const selectVerificationCode = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.verificationCode,
  );

const selectVerificationCodeError = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.verificationCodeError,
  );

const selectEmail = () =>
  createSelector(selectEmailNotificationsDomain, (substate) => substate.email);

const selectIsSubscribed = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.isSubscribed,
  );

const selectCurrentEmail = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.currentEmail,
  );

const selectVerificationCodeRequest = () =>
  createSelector(
    selectEmailNotificationsDomain,
    (substate) => substate.verificationCodeRequest,
  );

export {
  selectShowModal,
  selectContent,
  selectSendEmailProcessing,
  selectConfirmEmailProcessing,
  selectVerificationCodeError,
  selectEmail,
  selectVerificationCode,
  selectIsSubscribed,
  selectCurrentEmail,
  selectVerificationCodeRequest,
};
