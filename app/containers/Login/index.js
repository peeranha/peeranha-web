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

import injectReducer from 'utils/injectReducer';

import SelectAccountComponent from 'components/SelectAccount';
import ScatterInstaller from 'components/ScatterInstaller';
import ModalDialog from 'containers/ModalDialog';

import {
  NO_SCATTER,
  NO_SELECTED_SCATTER_ACCOUNTS,
  USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
} from 'containers/SignUp/constants';

import {
  reloadApp,
  loginSignup,
  forgetIdentity,
} from 'containers/AccountProvider/actions';

import { showSignUpModal } from 'containers/SignUp/actions';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { SHOW_DEFAULT_LOGIN_MODAL, COMPLETE_LOGIN } from './constants';
import { showLoginModal, hideLoginModal } from './actions';
import { makeSelectContent, makeSelectShowModal } from './selectors';
import reducer from './reducer';

import LoginOptions from './LoginOptions';
import UserIsAbsentInSystem from './UserIsAbsentInSystem';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  componentDidUpdate() {
    const { profileInfo, showLoginModalDispatch } = this.props;
    const reload = localStorage.getItem(COMPLETE_LOGIN);
    const scrollTo = localStorage.getItem('scrollTo');

    if (reload && profileInfo !== null) {
      showLoginModalDispatch();
      if (scrollTo) window.scrollTo(0, +scrollTo);
      localStorage.clear();
    }
  }

  continueLogin = () => {
    this.props.loginSignupDispatch({ type: COMPLETE_LOGIN });
  };

  backToOptions = () => {
    this.props.showLoginModalDispatch(SHOW_DEFAULT_LOGIN_MODAL);
  };

  openSignUpWindow = () => {
    this.props.hideLoginModalDispatch();
    this.props.showSignUpModalDispatch();
  };

  render() {
    const {
      content,
      forgetIdentityDispatch,
      reloadAppDispatch,
      showModal,
      hideLoginModalDispatch,
    } = this.props;

    return (
      <ModalDialog show={showModal} closeModal={hideLoginModalDispatch}>
        <div>
          {content === SHOW_DEFAULT_LOGIN_MODAL && (
            <LoginOptions
              continueLogin={this.continueLogin}
              backToOptions={this.openSignUpWindow}
            />
          )}

          {content === NO_SCATTER && (
            <ScatterInstaller
              reloadApp={reloadAppDispatch}
              backToOptions={this.backToOptions}
            />
          )}

          {content === NO_SELECTED_SCATTER_ACCOUNTS && (
            <SelectAccountComponent
              selectAccount={this.continueLogin}
              backToOptions={this.backToOptions}
            />
          )}

          {content === USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN && (
            <UserIsAbsentInSystem
              selectAnotherIdentity={forgetIdentityDispatch}
              backToOptions={this.openSignUpWindow}
            />
          )}
        </div>
      </ModalDialog>
    );
  }
}

Login.propTypes = {
  profileInfo: PropTypes.bool,
  content: PropTypes.string,
  showModal: PropTypes.bool,
  reloadAppDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  showSignUpModalDispatch: PropTypes.func,
  hideLoginModalDispatch: PropTypes.func,
  forgetIdentityDispatch: PropTypes.func,
  loginSignupDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  showModal: makeSelectShowModal(),
  profileInfo: makeSelectProfileInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    reloadAppDispatch: () => dispatch(reloadApp(COMPLETE_LOGIN)),
    loginSignupDispatch: methods => dispatch(loginSignup(methods)),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
    showSignUpModalDispatch: () => dispatch(showSignUpModal()),
    hideLoginModalDispatch: () => dispatch(hideLoginModal()),
    forgetIdentityDispatch: () => dispatch(forgetIdentity()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect,
)(Login);
