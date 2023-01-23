import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { scrollToErrorField } from 'utils/animation';

import {
  strLength8x100,
  required,
  comparePasswords,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';

import {
  PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
  VERIFICATION_CODE_FIELD,
} from './constants';
import TransparentButton from '../../components/Button/Contained/Transparent';

const NewPasswordForm = ({
  handleSubmit,
  changePassword,
  sendAnotherCode,
  changePasswordLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">{t('login.iForgotPassword')}</H4>

      <form onSubmit={handleSubmit(changePassword)}>
        <Field
          name={VERIFICATION_CODE_FIELD}
          disabled={changePasswordLoading}
          label={t('signUp.checkYourEmail')}
          component={TextInputField}
          validate={[required]}
          warn={[required]}
        />

        <Field
          name={PASSWORD_FIELD}
          disabled={changePasswordLoading}
          label={t('signUp.password')}
          component={TextInputField}
          validate={[required, strLength8x100, comparePasswords]}
          warn={[required, strLength8x100, comparePasswords]}
          type="password"
        />

        <Field
          name={NEW_PASSWORD_FIELD}
          disabled={changePasswordLoading}
          label={t('signUp.confirmPassword')}
          component={TextInputField}
          validate={[required, strLength8x100, comparePasswords]}
          warn={[required, strLength8x100, comparePasswords]}
          type="password"
        />

        <Button disabled={changePasswordLoading} className="w-100">
          {t('signUp.continue')}
        </Button>

        <TransparentButton
          className="mt-3"
          onClick={sendAnotherCode}
          type="button"
        >
          {t('common.sendAnotherCode')}
        </TransparentButton>
      </form>
    </div>
  );
};

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  changePassword: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  changePasswordLoading: PropTypes.bool,
};

const formName = 'NewPasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(NewPasswordForm);

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    passwordList: form.values
      ? [form.values[PASSWORD_FIELD], form.values[NEW_PASSWORD_FIELD]]
      : [],
  };
})(FormClone);

export default FormClone;
