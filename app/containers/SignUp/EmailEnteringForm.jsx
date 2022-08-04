import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import {
  validateEmail,
  required,
  strLength254Max,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import SignUpOptions from 'components/SignUpWrapper/SignUpOptions';

import SignUp from './index';
import { EMAIL_FIELD } from './constants';

import { Form } from './EmailVerificationForm';

const EmailEnteringForm = ({ handleSubmit }) => {
  const { t } = useTranslation();

  return (
    <SignUp>
      {({
        checkEmail,
        emailChecking,
        showLoginModal,
        showWalletSignUpForm,
        showWalletSignUpProcessing,
        logo,
        metaMaskProviderDetected,
      }) => (
        <SignUpOptions
          showLoginModal={showLoginModal}
          showWalletSignUpForm={showWalletSignUpForm}
          showWalletSignUpProcessing={showWalletSignUpProcessing}
          emailChecking={emailChecking}
          logo={logo}
          metaMaskProviderDetected={metaMaskProviderDetected}
        >
          <Form onSubmit={handleSubmit(checkEmail)}>
            <Field
              name={EMAIL_FIELD}
              disabled={emailChecking || showWalletSignUpProcessing}
              label={t('signUp.email')}
              component={TextInputField}
              validate={[validateEmail, required, strLength254Max]}
              warn={[validateEmail, required, strLength254Max]}
            />

            <Button
              disabled={emailChecking || showWalletSignUpProcessing}
              className="w-100"
            >
              {t('signUp.continue')}
            </Button>
          </Form>
        </SignUpOptions>
      )}
    </SignUp>
  );
};

EmailEnteringForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'EmailEnteringForm',
})(EmailEnteringForm);
