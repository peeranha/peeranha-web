import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';

import { scrollToErrorField } from 'utils/animation';

import Header from './Header';
import Footer from './Footer';

const EmailForm = ({
  loginWithEmailProcessing,
  loginWithWallet,
  loginWithWalletProcessing,
  metaMaskProviderDetected,
}) => (
  <div>
    <Header />

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
  loginWithWalletProcessing: PropTypes.bool,
  loginWithWallet: PropTypes.func,
  loginWithEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'EmailForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);
