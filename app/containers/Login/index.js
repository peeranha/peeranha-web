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

import ModalWrapper from 'components/ModalWrapper';
import UserIsAbsentInSystem from 'components/UserIsAbsentInSystem';
import SelectAccountComponent from 'components/SelectAccount';
import ScatterInstaller from 'components/ScatterInstaller';
import ModalComponent from 'containers/ModalComponent';

import {
  NO_SCATTER,
  NO_SELECTED_SCATTER_ACCOUNTS,
  USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
} from 'containers/SignUp/constants';

import {
  reloadApp,
  selectAccount,
  forgetIdentity,
} from 'containers/AccountInitializer/actions';

import { showSignUpModal } from 'containers/SignUp/actions';
import { makeSelectEosInit } from 'containers/AccountInitializer/selectors';

import LoginPopup from './LoginPopup';

import {
  LOGIN_MODAL_ID,
  SHOW_DEFAULT_LOGIN_MODAL,
  COMPLETE_LOGIN,
} from './constants';

import { showLoginModal, hideLoginModal } from './actions';
import { makeSelectContent } from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  componentDidUpdate() {
    const { eosInit, showLoginModalDispatch } = this.props;
    const reload = localStorage.getItem(COMPLETE_LOGIN);
    const scrollTo = localStorage.getItem('scrollTo');

    if (reload && eosInit) {
      showLoginModalDispatch();
      if (scrollTo) window.scrollTo(0, +scrollTo);
      localStorage.clear();
    }
  }

  continueLogin = () => {
    this.props.selectAccountDispatch({
      reloadApp: this.props.reloadAppDispatch,
      selectAccount: this.continueLogin,
      type: COMPLETE_LOGIN,
    });
  };

  backToOptions = () => {
    this.props.hideLoginModalDispatch();
    this.props.showSignUpModalDispatch();
  };

  render() {
    const { content, forgetIdentityDispatch, reloadAppDispatch } = this.props;

    return (
      <ModalComponent modalId={LOGIN_MODAL_ID}>
        <ModalWrapper>
          {content === SHOW_DEFAULT_LOGIN_MODAL && (
            <LoginPopup
              continueLogin={this.continueLogin}
              backToOptions={this.backToOptions}
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
              backToOptions={this.backToOptions}
            />
          )}
        </ModalWrapper>
      </ModalComponent>
    );
  }
}

Login.propTypes = {
  eosInit: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  reloadAppDispatch: PropTypes.func.isRequired,
  selectAccountDispatch: PropTypes.func.isRequired,
  showLoginModalDispatch: PropTypes.func.isRequired,
  showSignUpModalDispatch: PropTypes.func.isRequired,
  hideLoginModalDispatch: PropTypes.func.isRequired,
  forgetIdentityDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  eosInit: makeSelectEosInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    reloadAppDispatch: () => dispatch(reloadApp(COMPLETE_LOGIN)),
    selectAccountDispatch: methods => dispatch(selectAccount(methods)),
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
