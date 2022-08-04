import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import { validateEmail, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { EMAIL_FIELD } from './constants';

import Header from './Header';
import Footer from './Footer';

const EmailForm = ({
  handleSubmit,
  showEmailPasswordForm,
  loginWithEmailProcessing,
  loginWithWallet,
  loginWithWalletProcessing,
  metaMaskProviderDetected,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit(showEmailPasswordForm)}>
        <Field
          name={EMAIL_FIELD}
          label={t('signUp.email')}
          component={TextInputField}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
          disabled={loginWithEmailProcessing || loginWithWalletProcessing}
        />

        <Button
          className="w-100"
          disabled={loginWithEmailProcessing || loginWithWalletProcessing}
        >
          {t('signUp.continue')}
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
};

EmailForm.propTypes = {
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
