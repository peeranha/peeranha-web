import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { scrollToErrorField } from 'utils/animation';

import { validateEmail, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';

import { EMAIL_FIELD } from './constants';

const EmailForgotPasswordForm = ({
  handleSubmit,
  getVerificationCode,
  verificationCodeLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">{t('login.iForgotPassword')}</H4>

      <form onSubmit={handleSubmit(getVerificationCode)}>
        <Field
          name={EMAIL_FIELD}
          disabled={verificationCodeLoading}
          label={t('signUp.email')}
          component={TextInputField}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
        />

        <Button disabled={verificationCodeLoading} className="w-100">
          {t('signUp.continue')}
        </Button>
      </form>
    </div>
  );
};

EmailForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  getVerificationCode: PropTypes.func,
  verificationCodeLoading: PropTypes.bool,
};

export default reduxForm({
  form: 'EmailForgotPasswordForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForgotPasswordForm);
