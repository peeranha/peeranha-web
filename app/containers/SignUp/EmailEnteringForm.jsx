import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
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
import messages from './messages';

import { Form } from './EmailVerificationForm';

const EmailEnteringForm = ({ handleSubmit }) => (
  <SignUp>
    {({
      checkEmail,
      locale,
      emailChecking,
      showLoginModal,
      showScatterSignUpForm,
      showScatterSignUpProcessing,
    }) => (
      <SignUpOptions
        showLoginModal={showLoginModal}
        showScatterSignUpForm={showScatterSignUpForm}
        showScatterSignUpProcessing={showScatterSignUpProcessing}
      >
        <Form onSubmit={handleSubmit(checkEmail)}>
          <Field
            name={EMAIL_FIELD}
            disabled={emailChecking}
            label={translationMessages[locale][messages.email.id]}
            component={TextInputField}
            validate={[validateEmail, required, strLength254Max]}
            warn={[validateEmail, required, strLength254Max]}
          />

          <Button disabled={emailChecking} className="w-100">
            <FormattedMessage {...messages.continue} />
          </Button>
        </Form>
      </SignUpOptions>
    )}
  </SignUp>
);

EmailEnteringForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'EmailEnteringForm',
})(EmailEnteringForm);
