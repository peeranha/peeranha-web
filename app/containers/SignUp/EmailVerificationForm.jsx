import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import letterImg from 'images/letter-smile.svg?inline';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import SendAnotherCodeButton from 'components/Button/Contained/Transparent';
import SignUpOptions, { P } from 'components/SignUpWrapper/SignUpOptions';

import SignUp from './index';
import { VERIFICATION_FIELD } from './constants';
import messages from './messages';

import { Div } from './IHaveEOSAccountForm';

export const Form = Div.extend`
  position: relative;
`.withComponent('form');

const EmailVerificationForm = ({ handleSubmit }) => (
  <SignUp>
    {({
      verifyEmail,
      locale,
      emailVerificationProcessing,
      sendAnotherCode,
      showLoginModal,
      showScatterSignUpForm,
      showScatterSignUpProcessing,
    }) => (
      <SignUpOptions
        showLoginModal={showLoginModal}
        showScatterSignUpForm={showScatterSignUpForm}
        showScatterSignUpProcessing={showScatterSignUpProcessing}
      >
        <div className="text-center">
          <img src={letterImg} alt="check your email" />
          <P className="text-center py-2">
            <FormattedMessage {...messages.checkYourEmail} />
          </P>
        </div>

        <Form onSubmit={handleSubmit(verifyEmail)}>
          <Field
            name={VERIFICATION_FIELD}
            disabled={emailVerificationProcessing}
            label={translationMessages[locale][messages.verificationCode.id]}
            component={TextInputField}
            validate={[required]}
            warn={[required]}
          />

          <SendAnotherCodeButton
            onClick={sendAnotherCode}
            className="mb-3"
            type="button"
          >
            <FormattedMessage {...messages.sendAnotherCode} />
          </SendAnotherCodeButton>

          <SubmitButton
            disabled={emailVerificationProcessing}
            className="w-100"
          >
            <FormattedMessage {...messages.verify} />
          </SubmitButton>
        </Form>
      </SignUpOptions>
    )}
  </SignUp>
);

EmailVerificationForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'EmailVerificationForm',
})(EmailVerificationForm);
