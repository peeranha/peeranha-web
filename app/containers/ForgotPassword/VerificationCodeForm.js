import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';

import signupMessages from 'containers/SignUp/messages';
import loginMessages from 'containers/Login/messages';

import { VERIFICATION_CODE_FIELD } from './constants';

const VerificationCodeForm = /* istanbul ignore next */ ({
  handleSubmit,
  locale,
  verifyEmail,
  verifyEmailLoading,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...loginMessages.iForgotPassword} />
    </H4>

    <form onSubmit={handleSubmit(verifyEmail)}>
      <Field
        name={VERIFICATION_CODE_FIELD}
        disabled={verifyEmailLoading}
        label={translationMessages[locale][signupMessages.checkYourEmail.id]}
        component={TextInputField}
        validate={[required]}
        warn={[required]}
      />

      <Button disabled={verifyEmailLoading} className="w-100">
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>
  </div>
);

VerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  verifyEmail: PropTypes.func,
  locale: PropTypes.string,
  verifyEmailLoading: PropTypes.bool,
};

export default reduxForm({
  form: 'VerificationCodeForgotPasswordForm',
})(VerificationCodeForm);
