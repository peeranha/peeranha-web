import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
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

import signupMessages from 'containers/SignUp/messages';
import loginMessages from 'containers/Login/messages';

import {
  PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
  VERIFICATION_CODE_FIELD,
} from './constants';
import commonMessages from '../../common-messages';
import TransparentButton from '../../components/Button/Contained/Transparent';

const NewPasswordForm = /* istanbul ignore next */ ({
  handleSubmit,
  locale,
  changePassword,
  sendAnotherCode,
  changePasswordLoading,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage id={loginMessages.iForgotPassword.id} />
    </H4>

    <form onSubmit={handleSubmit(changePassword)}>
      <Field
        name={VERIFICATION_CODE_FIELD}
        disabled={changePasswordLoading}
        label={translationMessages[locale][signupMessages.checkYourEmail.id]}
        component={TextInputField}
        validate={[required]}
        warn={[required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={changePasswordLoading}
        label={translationMessages[locale][signupMessages.password.id]}
        component={TextInputField}
        validate={[required, strLength8x100, comparePasswords]}
        warn={[required, strLength8x100, comparePasswords]}
        type="password"
      />

      <Field
        name={NEW_PASSWORD_FIELD}
        disabled={changePasswordLoading}
        label={translationMessages[locale][signupMessages.confirmPassword.id]}
        component={TextInputField}
        validate={[required, strLength8x100, comparePasswords]}
        warn={[required, strLength8x100, comparePasswords]}
        type="password"
      />

      <Button disabled={changePasswordLoading} className="w-100">
        <FormattedMessage id={signupMessages.continue.id} />
      </Button>

      <TransparentButton
        className="mt-3"
        onClick={sendAnotherCode}
        type="button"
      >
        <FormattedMessage id={commonMessages.sendAnotherCode.id} />
      </TransparentButton>
    </form>
  </div>
);

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  changePassword: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  locale: PropTypes.string,
  changePasswordLoading: PropTypes.bool,
};

const formName = 'NewPasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(NewPasswordForm);

FormClone = connect((state) => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    passwordList: form.values
      ? [form.values[PASSWORD_FIELD], form.values[NEW_PASSWORD_FIELD]]
      : [],
  };
})(FormClone);

export default FormClone;
