import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import { scrollToErrorField } from 'utils/animation';

import { validateEmail, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';

import signupMessages from 'containers/SignUp/messages';
import loginMessages from 'containers/Login/messages';

import { EMAIL_FIELD } from './constants';

const EmailForgotPasswordForm = /* istanbul ignore next */ ({
  handleSubmit,
  locale,
  getVerificationCode,
  verificationCodeLoading,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...loginMessages.iForgotPassword} />
    </H4>

    <form onSubmit={handleSubmit(getVerificationCode)}>
      <Field
        name={EMAIL_FIELD}
        disabled={verificationCodeLoading}
        label={translationMessages[locale][signupMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
      />

      <Button disabled={verificationCodeLoading} className="w-100">
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>
  </div>
);

EmailForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  getVerificationCode: PropTypes.func,
  locale: PropTypes.string,
  verificationCodeLoading: PropTypes.bool,
};

export default reduxForm({
  form: 'EmailForgotPasswordForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForgotPasswordForm);
