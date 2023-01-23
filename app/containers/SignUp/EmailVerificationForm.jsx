import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import letterImg from 'images/letter-smile.svg?inline';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import SendAnotherCodeButton from 'components/Button/Contained/Transparent';
import SignUpOptions, { P } from 'components/SignUpWrapper/SignUpOptions';

import SignUp from './index';
import { VERIFICATION_FIELD } from './constants';

import { Div } from './EthereumWalletGenerationForm';

export const Form = Div.extend`
  position: relative;
`.withComponent('form');

const EmailVerificationForm = ({ handleSubmit }) => {
  const { t } = useTranslation();

  return (
    <SignUp>
      {({
        verifyEmail,
        emailVerificationProcessing,
        sendAnotherCode,
        showLoginModal,
        showWalletSignUpForm,
        showWalletSignUpProcessing,
        logo,
      }) => (
        <SignUpOptions
          showLoginModal={showLoginModal}
          showWalletSignUpForm={showWalletSignUpForm}
          showWalletSignUpProcessing={showWalletSignUpProcessing}
          emailVerificationProcessing={emailVerificationProcessing}
          logo={logo}
        >
          <div className="text-center">
            <img src={letterImg} alt="check your email" />
            <P className="text-center py-2">{t('signUp.checkYourEmail')}</P>
          </div>

          <Form onSubmit={handleSubmit(verifyEmail)}>
            <Field
              name={VERIFICATION_FIELD}
              disabled={
                emailVerificationProcessing || showWalletSignUpProcessing
              }
              label={t('signUp.verificationCode')}
              component={TextInputField}
              validate={[required]}
              warn={[required]}
            />

            <SendAnotherCodeButton
              onClick={sendAnotherCode}
              className="mb-3"
              type="button"
              disabled={
                emailVerificationProcessing || showWalletSignUpProcessing
              }
            >
              {t('signUp.sendAnotherCode')}
            </SendAnotherCodeButton>

            <SubmitButton
              disabled={
                emailVerificationProcessing || showWalletSignUpProcessing
              }
              className="w-100"
            >
              {t('signUp.verify')}
            </SubmitButton>
          </Form>
        </SignUpOptions>
      )}
    </SignUp>
  );
};

EmailVerificationForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'EmailVerificationForm',
})(EmailVerificationForm);
