/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import ModalDialog from 'components/ModalDialog';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showForgotPasswordModal } from 'containers/ForgotPassword/actions';

import notificationsReducer from 'components/Notifications/reducer';

import * as selectors from './selectors';

import {
  hideLoginModal,
  showEmailPasswordForm,
  loginWithEmail,
  loginWithWallet,
  finishRegistrationWithDisplayName,
} from './actions';

import {
  EMAIL_FORM,
  EMAIL_PASSWORD_FORM,
  WE_ARE_HAPPY_FORM,
} from './constants';

import reducer from './reducer';
import saga from './saga';

import EmailForm from './EmailForm';
import EmailPasswordForm from './EmailPasswordForm';
import WeAreHappyYouAreHereForm from './WeAreHappyYouAreHereForm';
import { selectEthereum } from '../EthereumProvider/selectors';

/* eslint-disable react/prefer-stateless-function */
export const Login = ({
  content,
  showModal,
  hideLoginModalDispatch,
  locale,
  email,
  facebookUserData,
  loginWithEmailProcessing,
  finishRegistrationProcessing,
  showEmailPasswordFormDispatch,
  loginWithEmailDispatch,
  loginWithWalletProcessing,
  loginWithWalletDispatch,
  finishRegistrationDispatch,
  showForgotPasswordModalDispatch,
  ethereumService,
}) => {
  const showIForgotPasswordModal = () => {
    hideLoginModalDispatch();
    showForgotPasswordModalDispatch();
  };

  return (
    <ModalDialog show={showModal} closeModal={hideLoginModalDispatch}>
      {content === EMAIL_FORM && (
        <EmailForm
          locale={locale}
          showEmailPasswordForm={showEmailPasswordFormDispatch}
          loginWithEmailProcessing={loginWithEmailProcessing}
          loginWithWallet={loginWithWalletDispatch}
          loginWithWalletProcessing={loginWithWalletProcessing}
          metaMaskProviderDetected={ethereumService.metaMaskProviderDetected}
        />
      )}

      {content === EMAIL_PASSWORD_FORM && (
        <EmailPasswordForm
          locale={locale}
          login={loginWithEmailDispatch}
          loginWithEmailProcessing={loginWithEmailProcessing}
          showIForgotPasswordModal={showIForgotPasswordModal}
          email={email}
          loginWithWallet={loginWithWalletDispatch}
          loginWithWalletProcessing={loginWithWalletProcessing}
        />
      )}

      {content === WE_ARE_HAPPY_FORM && (
        <WeAreHappyYouAreHereForm
          locale={locale}
          facebookUserName={facebookUserData?.name || ''}
          finishRegistration={finishRegistrationDispatch}
          finishRegistrationProcessing={finishRegistrationProcessing}
        />
      )}
    </ModalDialog>
  );
};

Login.propTypes = {
  content: PropTypes.string,
  showModal: PropTypes.bool,
  hideLoginModalDispatch: PropTypes.func,
  locale: PropTypes.string,
  email: PropTypes.string,
  loginWithEmailProcessing: PropTypes.bool,
  finishRegistrationProcessing: PropTypes.bool,
  loginWithWalletProcessing: PropTypes.bool,
  facebookUserData: PropTypes.object,
  showEmailPasswordFormDispatch: PropTypes.func,
  loginWithEmailDispatch: PropTypes.func,
  loginWithWalletDispatch: PropTypes.func,
  finishRegistrationDispatch: PropTypes.func,
  showForgotPasswordModalDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    content: selectors.makeSelectContent(),
    showModal: selectors.makeSelectShowModal(),
    email: selectors.makeSelectEmail(),
    loginWithEmailProcessing: selectors.selectLoginWithEmailProcessing(),
    finishRegistrationProcessing: selectors.selectFinishRegistrationProcessing(),
    loginWithWalletProcessing: selectors.selectLoginWithWalletProcessing(),
    facebookUserData: selectors.selectFacebookUserData(),
    ethereumService: selectEthereum,
  }),
  dispatch => ({
    hideLoginModalDispatch: bindActionCreators(hideLoginModal, dispatch),
    showEmailPasswordFormDispatch: bindActionCreators(
      showEmailPasswordForm,
      dispatch,
    ),
    loginWithEmailDispatch: bindActionCreators(loginWithEmail, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    showForgotPasswordModalDispatch: bindActionCreators(
      showForgotPasswordModal,
      dispatch,
    ),
    finishRegistrationDispatch: bindActionCreators(
      finishRegistrationWithDisplayName,
      dispatch,
    ),
  }),
);

export default compose(
  injectReducer({ key: 'login', reducer: notificationsReducer }),
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'login', saga, mode: DAEMON }),
  withConnect,
)(Login);
