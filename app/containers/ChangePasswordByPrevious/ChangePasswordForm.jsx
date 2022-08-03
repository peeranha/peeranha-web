import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { scrollToErrorField } from 'utils/animation';

import {
  required,
  strLength8x100,
  comparePasswords,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';

import {
  OLD_PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
  CONFIRM_PASSWORD_FIELD,
} from './constants';

const ChangePasswordForm = ({
  handleSubmit,
  changePassword,
  changePasswordProcessing,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">
        {t('common.change')} {t('sign-up.password')}
      </H4>

      <form onSubmit={handleSubmit(changePassword)}>
        <Field
          name={OLD_PASSWORD_FIELD}
          disabled={changePasswordProcessing}
          label={t('profile.oldPassword')}
          component={TextInputField}
          validate={required}
          warn={required}
          type="password"
        />

        <Field
          name={NEW_PASSWORD_FIELD}
          disabled={changePasswordProcessing}
          label={t('profile.newPassword')}
          component={TextInputField}
          type="password"
          validate={[required, strLength8x100, comparePasswords]}
          warn={[required, strLength8x100, comparePasswords]}
        />

        <Field
          name={CONFIRM_PASSWORD_FIELD}
          disabled={changePasswordProcessing}
          label={t('profile.confirmPassword')}
          component={TextInputField}
          type="password"
          validate={[required, strLength8x100, comparePasswords]}
          warn={[required, strLength8x100, comparePasswords]}
        />

        <Button disabled={changePasswordProcessing} className="w-100">
          {t('sign-up.continue')}
        </Button>
      </form>
    </div>
  );
};

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  changePassword: PropTypes.func,
  changePasswordProcessing: PropTypes.bool,
};

const formName = 'ChangePasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(ChangePasswordForm);

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    passwordList: form.values
      ? [form.values[CONFIRM_PASSWORD_FIELD], form.values[NEW_PASSWORD_FIELD]]
      : [],
  };
})(FormClone);

export default FormClone;
