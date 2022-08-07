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

import { hideLoginModal, loginWithWallet } from './actions';

import reducer from './reducer';
import saga from './saga';

import { selectEthereum } from '../EthereumProvider/selectors';

/* eslint-disable react/prefer-stateless-function */
export const Login = ({ showModal, hideLoginModalDispatch }) => (
  <ModalDialog show={showModal} closeModal={hideLoginModalDispatch} />
);

Login.propTypes = {
  content: PropTypes.string,
  showModal: PropTypes.bool,
  hideLoginModalDispatch: PropTypes.func,
  locale: PropTypes.string,
  loginWithWalletProcessing: PropTypes.bool,
  loginWithWalletDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    content: selectors.makeSelectContent(),
    showModal: selectors.makeSelectShowModal(),
    loginWithWalletProcessing: selectors.selectLoginWithWalletProcessing(),
    ethereumService: selectEthereum,
  }),
  dispatch => ({
    hideLoginModalDispatch: bindActionCreators(hideLoginModal, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
  }),
);

export default compose(
  injectReducer({ key: 'login', reducer: notificationsReducer }),
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'login', saga, mode: DAEMON }),
  withConnect,
)(Login);
