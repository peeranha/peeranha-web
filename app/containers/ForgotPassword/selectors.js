import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectForgotPasswordDomain = (state) =>
  state.get('forgotPassword', initialState).toJS();

const selectContent = () =>
  createSelector(selectForgotPasswordDomain, (substate) => substate.content);

const selectShowModal = () =>
  createSelector(selectForgotPasswordDomain, (substate) => substate.showModal);

const selectVerificationCodeLoading = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.getVerificationCodeLoading,
  );

const selectVerificationCodeError = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.getVerificationCodeError,
  );

const selectVerifyEmailLoading = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.verifyEmailLoading,
  );

const selectVerifyEmailError = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.verifyEmailError,
  );

const selectChangePasswordLoading = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.changePasswordLoading,
  );

const selectChangePasswordError = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.changePasswordError,
  );

const selectEmail = () =>
  createSelector(selectForgotPasswordDomain, (substate) => substate.email);

const selectVerificationCode = () =>
  createSelector(
    selectForgotPasswordDomain,
    (substate) => substate.verificationCode,
  );

export {
  selectForgotPasswordDomain,
  selectContent,
  selectShowModal,
  selectVerificationCodeLoading,
  selectVerificationCodeError,
  selectVerifyEmailLoading,
  selectVerifyEmailError,
  selectChangePasswordLoading,
  selectChangePasswordError,
  selectEmail,
  selectVerificationCode,
};
