import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import commonMessages from 'common-messages';
import { scrollToErrorField } from 'utils/animation';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import H4 from 'components/H4';

import signupMessages from 'containers/SignUp/messages';
import loginMessages from 'containers/Login/messages';

import { VERIFICATION_CODE_FIELD } from './constants';

const VerificationCodeForm = /* istanbul ignore next */ ({
  handleSubmit,
  locale,
  verifyEmail,
  verifyEmailLoading,
  sendAnotherCode,
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

      <Button disabled={verifyEmailLoading} className="w-100" type="submit">
        <FormattedMessage {...signupMessages.continue} />
      </Button>

      <TransparentButton
        className="mt-3"
        onClick={sendAnotherCode}
        type="button"
      >
        <FormattedMessage {...commonMessages.sendAnotherCode} />
      </TransparentButton>
    </form>
  </div>
);

VerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  verifyEmail: PropTypes.func,
  locale: PropTypes.string,
  verifyEmailLoading: PropTypes.bool,
};

export default reduxForm({
  form: 'VerificationCodeForgotPasswordForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(VerificationCodeForm);
