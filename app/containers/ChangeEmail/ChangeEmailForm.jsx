import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import {
  required,
  validateEmail,
  strLength254Max,
} from 'components/FormFields/validate';

import {
  NEW_EMAIL_FIELD,
  CONFIRM_EMAIL_FIELD,
  PASSWORD_FIELD,
  CHANGE_EMAIL_FORM,
} from './constants';

const ChangeEmailForm = ({
  handleSubmit,
  changeEmail,
  changeEmailProcessing,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">
        {t('common.change')} {t('sign-up.email')}
      </H4>

      <form onSubmit={handleSubmit(changeEmail)}>
        <Field
          name={NEW_EMAIL_FIELD}
          disabled={changeEmailProcessing}
          label={t('common.newEmail')}
          component={TextInputField}
        />

        <Field
          name={CONFIRM_EMAIL_FIELD}
          disabled={changeEmailProcessing}
          label={t('common.confirmNewEmail')}
          component={TextInputField}
        />

        <Field
          name={PASSWORD_FIELD}
          disabled={changeEmailProcessing}
          label={t('sign-up.password')}
          component={TextInputField}
          validate={required}
          warn={required}
          type="password"
        />

        <Button disabled={changeEmailProcessing} className="w-100 mb-3">
          {t('common.submit')}
        </Button>
      </form>
    </div>
  );
};

ChangeEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  changeEmail: PropTypes.func,
  changeEmailProcessing: PropTypes.bool,
};

const formName = CHANGE_EMAIL_FORM;

export const validateEmails = (state, fields) => {
  const emailField = fields[0];
  const confirmEmailField = fields[1];

  const email = state.toJS()[emailField];
  const emailConf = state.toJS()[confirmEmailField];

  const errors = {};

  const emailError =
    required(email) || validateEmail(email) || strLength254Max(email);

  const emailConfirmError =
    required(emailConf) ||
    validateEmail(emailConf) ||
    strLength254Max(emailConf);

  if (emailError) {
    errors[emailField] = emailError;
  }

  if (emailConfirmError) {
    errors[confirmEmailField] = emailConfirmError;
  }

  if (email && emailConf && email !== emailConf) {
    errors[emailField] = { id: 'common.emailsDoNotMatch' };
    errors[confirmEmailField] = { id: 'common.emailsDoNotMatch' };
  }

  return errors;
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(ChangeEmailForm);

FormClone = connect(() => ({
  validate: state =>
    validateEmails(state, [NEW_EMAIL_FIELD, CONFIRM_EMAIL_FIELD]),
  warn: state => validateEmails(state, [NEW_EMAIL_FIELD, CONFIRM_EMAIL_FIELD]),
}))(FormClone);

export default FormClone;
