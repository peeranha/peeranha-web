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

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  showIForgotPasswordModal = () => {
    this.props.hideLoginModalDispatch();
    this.props.showForgotPasswordModalDispatch();
  };

  render() /* istanbul ignore next */ {
    const {
      content,
      showModal,
      hideLoginModalDispatch,
      locale,
      email,
      loginWithEmailProcessing,
      finishRegistrationProcessing,
      showEmailPasswordFormDispatch,
      loginWithEmailDispatch,
      loginWithWalletProcessing,
      loginWithWalletDispatch,
      finishRegistrationDispatch,
    } = this.props;

    return (
      <ModalDialog show={showModal} closeModal={hideLoginModalDispatch}>
        {content === EMAIL_FORM && (
          <EmailForm
            locale={locale}
            showEmailPasswordForm={showEmailPasswordFormDispatch}
            loginWithEmailProcessing={loginWithEmailProcessing}
            loginWithWallet={loginWithWalletDispatch}
            loginWithWalletProcessing={loginWithWalletProcessing}
          />
        )}

        {content === EMAIL_PASSWORD_FORM && (
          <EmailPasswordForm
            locale={locale}
            login={loginWithEmailDispatch}
            loginWithEmailProcessing={loginWithEmailProcessing}
            showIForgotPasswordModal={this.showIForgotPasswordModal}
            email={email}
            loginWithWallet={loginWithWalletDispatch}
            loginWithWalletProcessing={loginWithWalletProcessing}
          />
        )}

        {content === WE_ARE_HAPPY_FORM && (
          <WeAreHappyYouAreHereForm
            locale={locale}
            finishRegistration={finishRegistrationDispatch}
            finishRegistrationProcessing={finishRegistrationProcessing}
          />
        )}
      </ModalDialog>
    );
  }
}

Login.propTypes = {
  content: PropTypes.string,
  showModal: PropTypes.bool,
  hideLoginModalDispatch: PropTypes.func,
  locale: PropTypes.string,
  email: PropTypes.string,
  loginWithEmailProcessing: PropTypes.bool,
  finishRegistrationProcessing: PropTypes.bool,
  loginWithWalletProcessing: PropTypes.bool,
  showEmailPasswordFormDispatch: PropTypes.func,
  loginWithEmailDispatch: PropTypes.func,
  loginWithWalletDispatch: PropTypes.func,
  finishRegistrationDispatch: PropTypes.func,
  showForgotPasswordModalDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.makeSelectContent(),
  showModal: selectors.makeSelectShowModal(),
  email: selectors.makeSelectEmail(),
  loginWithEmailProcessing: selectors.selectLoginWithEmailProcessing(),
  finishRegistrationProcessing: selectors.selectFinishRegistrationProcessing(),
  loginWithWalletProcessing: selectors.selectLoginWithWalletProcessing(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga, mode: DAEMON });

export default compose(
  injectReducer({ key: 'login', reducer: notificationsReducer }),
  withReducer,
  withSaga,
  withConnect,
)(Login);
