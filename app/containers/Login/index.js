/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ModalDialog from 'components/ModalDialog';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showForgotPasswordModal } from 'containers/ForgotPassword/actions';

import * as selectors from './selectors';

import {
  hideLoginModal,
  showEmailPasswordForm,
  loginWithEmail,
  loginWithScatter,
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

  render() {
    const {
      content,
      showModal,
      hideLoginModalDispatch,
      locale,
      email,
      loginProcessing,
      finishRegistrationProcessing,
      loginWithScatterDispatch,
      showEmailPasswordFormDispatch,
      loginWithEmailDispatch,
      finishRegistrationDispatch,
    } = this.props;

    return (
      <ModalDialog show={showModal} closeModal={hideLoginModalDispatch}>
        {content === EMAIL_FORM && (
          <EmailForm
            locale={locale}
            loginWithScatter={loginWithScatterDispatch}
            showEmailPasswordForm={showEmailPasswordFormDispatch}
          />
        )}

        {content === EMAIL_PASSWORD_FORM && (
          <EmailPasswordForm
            locale={locale}
            login={loginWithEmailDispatch}
            loginProcessing={loginProcessing}
            loginWithScatter={loginWithScatterDispatch}
            showIForgotPasswordModal={this.showIForgotPasswordModal}
            email={email}
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
  loginProcessing: PropTypes.bool,
  finishRegistrationProcessing: PropTypes.bool,
  loginWithScatterDispatch: PropTypes.func,
  showEmailPasswordFormDispatch: PropTypes.func,
  loginWithEmailDispatch: PropTypes.func,
  finishRegistrationDispatch: PropTypes.func,
  showForgotPasswordModalDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.makeSelectContent(),
  showModal: selectors.makeSelectShowModal(),
  email: selectors.makeSelectEmail(),
  loginProcessing: selectors.makeSelectLoginProcessing(),
  finishRegistrationProcessing: selectors.selectFinishRegistrationProcessing(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    hideLoginModalDispatch: () => dispatch(hideLoginModal()),
    showEmailPasswordFormDispatch: email =>
      dispatch(showEmailPasswordForm(email)),
    loginWithEmailDispatch: val => dispatch(loginWithEmail(val)),
    loginWithScatterDispatch: () => dispatch(loginWithScatter()),
    showForgotPasswordModalDispatch: () => dispatch(showForgotPasswordModal()),
    finishRegistrationDispatch: val =>
      dispatch(finishRegistrationWithDisplayName(val)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
