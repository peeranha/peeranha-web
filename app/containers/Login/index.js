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

import notificationsReducer from 'components/Notifications/reducer';

import * as selectors from './selectors';

import { hideLoginModal, loginWithEmail, loginWithWallet } from './actions';

import { EMAIL_FORM } from './constants';

import reducer from './reducer';
import saga from './saga';

import EmailForm from './EmailForm';
import { selectEthereum } from '../EthereumProvider/selectors';

/* eslint-disable react/prefer-stateless-function */
export const Login = ({
  content,
  showModal,
  hideLoginModalDispatch,
  locale,
  loginWithEmailProcessing,
  loginWithWalletProcessing,
  loginWithWalletDispatch,
  ethereumService,
}) => (
  <ModalDialog show={showModal} closeModal={hideLoginModalDispatch}>
    {content === EMAIL_FORM && (
      <EmailForm
        locale={locale}
        loginWithEmailProcessing={loginWithEmailProcessing}
        loginWithWallet={loginWithWalletDispatch}
        loginWithWalletProcessing={loginWithWalletProcessing}
        metaMaskProviderDetected={ethereumService.metaMaskProviderDetected}
      />
    )}
  </ModalDialog>
);

Login.propTypes = {
  content: PropTypes.string,
  showModal: PropTypes.bool,
  hideLoginModalDispatch: PropTypes.func,
  locale: PropTypes.string,
  email: PropTypes.string,
  loginWithEmailProcessing: PropTypes.bool,
  loginWithWalletProcessing: PropTypes.bool,
  loginWithEmailDispatch: PropTypes.func,
  loginWithWalletDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    content: selectors.makeSelectContent(),
    showModal: selectors.makeSelectShowModal(),
    email: selectors.makeSelectEmail(),
    loginWithEmailProcessing: selectors.selectLoginWithEmailProcessing(),
    loginWithWalletProcessing: selectors.selectLoginWithWalletProcessing(),
    ethereumService: selectEthereum,
  }),
  dispatch => ({
    hideLoginModalDispatch: bindActionCreators(hideLoginModal, dispatch),
    loginWithEmailDispatch: bindActionCreators(loginWithEmail, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
  }),
);

export default compose(
  injectReducer({ key: 'login', reducer: notificationsReducer }),
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'login', saga, mode: DAEMON }),
  withConnect,
)(Login);
