import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';
import { validatePassword } from 'containers/SignUp/IHaveEOSAccountForm';

import {
  strLength3x20,
  required,
  validateEmail,
} from 'components/FormFields/validate';

import {
  NEW_EMAIL_FIELD,
  CONFIRM_EMAIL_FIELD,
  PASSWORD_FIELD,
  CHANGE_EMAIL_FORM,
} from './constants';

import changeEmailMessages from './messages';

const ChangeEmailForm = ({
  handleSubmit,
  locale,
  changeEmail,
  changeEmailProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.change} />{' '}
      <FormattedMessage {...signUpMessages.email} />
    </H4>

    <form onSubmit={handleSubmit(changeEmail)}>
      <Field
        name={NEW_EMAIL_FIELD}
        disabled={changeEmailProcessing}
        label={translationMessages[locale][changeEmailMessages.newEmail.id]}
        component={TextInputField}
        validate={[validateEmail, strLength3x20, required]}
        warn={[validateEmail, strLength3x20, required]}
      />

      <Field
        name={CONFIRM_EMAIL_FIELD}
        disabled={changeEmailProcessing}
        label={
          translationMessages[locale][changeEmailMessages.confirmNewEmail.id]
        }
        component={TextInputField}
        validate={[validateEmail, strLength3x20, required]}
        warn={[validateEmail, strLength3x20, required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={changeEmailProcessing}
        label={translationMessages[locale][signUpMessages.password.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        type="password"
      />

      <Button disabled={changeEmailProcessing} className="w-100 mb-3">
        <FormattedMessage {...commonMessages.submit} />
      </Button>
    </form>
  </div>
);

ChangeEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  changeEmail: PropTypes.func,
  locale: PropTypes.string,
  changeEmailProcessing: PropTypes.bool,
};

const formName = CHANGE_EMAIL_FORM;

export const validateEmails = /* istanbul ignore next */ (state, fields) => {
  const emailField = fields[0];
  const confirmEmailField = fields[1];

  const email = state.toJS()[emailField];
  const emailConf = state.toJS()[confirmEmailField];

  const errors = {};

  const emailError = required(email) || strLength3x20(email);

  const emailConfirmError = required(emailConf) || validateEmail(emailConf);

  if (emailError) {
    errors[emailField] = emailError;
  }

  if (emailConfirmError) {
    errors[confirmEmailField] = emailConfirmError;
  }

  if (email && emailConf && email !== emailConf) {
    errors[emailField] = { id: changeEmailMessages.emailsDoNotMatch.id };
    errors[confirmEmailField] = { id: changeEmailMessages.emailsDoNotMatch.id };
  }

  return errors;
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
})(ChangeEmailForm);

FormClone = connect(
  /* istanbul ignore next */ () => ({
    validate: state =>
      validateEmails(state, [NEW_EMAIL_FIELD, CONFIRM_EMAIL_FIELD]),
    warn: state =>
      validateEmails(state, [NEW_EMAIL_FIELD, CONFIRM_EMAIL_FIELD]),
  }),
)(FormClone);

export default FormClone;
