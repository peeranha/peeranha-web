import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import { scrollToErrorField } from 'utils/animation';

import { validateEmail, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import signupMessages from 'containers/SignUp/messages';

import { EMAIL_FIELD } from './constants';

import Header from './Header';
import Footer from './Footer';

const EmailForm = ({
  locale,
  handleSubmit,
  showEmailPasswordForm,
  loginWithEmailProcessing,
  loginWithWallet,
  loginWithWalletProcessing,
  metaMaskProviderDetected,
}) => (
  <div>
    <Header />

    <form onSubmit={handleSubmit(showEmailPasswordForm)}>
      <Field
        name={EMAIL_FIELD}
        label={translationMessages[locale][signupMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
        disabled={loginWithEmailProcessing || loginWithWalletProcessing}
      />

      <Button
        className="w-100"
        disabled={loginWithEmailProcessing || loginWithWalletProcessing}
      >
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>

    <Footer
      walletAction={loginWithWallet}
      loginWithWalletProcessing={loginWithWalletProcessing}
      loginWithEmailProcessing={loginWithEmailProcessing}
      metaMaskProviderDetected={metaMaskProviderDetected}
    />
  </div>
);

EmailForm.propTypes = {
  locale: PropTypes.string,
  handleSubmit: PropTypes.func,
  showEmailPasswordForm: PropTypes.func,
  loginWithWalletProcessing: PropTypes.bool,
  loginWithWallet: PropTypes.func,
  loginWithEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'EmailForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);
