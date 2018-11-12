/**
 *
 * SignUp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';
import createdHistory from 'createdHistory';

import {
  makeSelectAccount,
  makeSelectUserIsInSystem,
} from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

import ModalDialog from 'containers/ModalDialog';
import ScatterInstaller from 'components/ScatterInstaller';
import SelectAccountComponent from 'components/SelectAccount';

import { loginSignup, reloadApp } from 'containers/AccountProvider/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as routes from 'routes-config';

import reducer from './reducer';
import saga from './saga';

import {
  fetchRegisterAcc,
  setReducerDefault,
  showSignUpModal,
  hideSignUpModal,
} from './actions';

import {
  DISPLAY_NAME,
  SHOW_DEFAULT_SIGNUP_MODAL,
  USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
  USER_IS_IN_SYSTEM_AND_SIGNUP,
  COMPLETE_SIGNUP,
  NO_SELECTED_SCATTER_ACCOUNTS,
  NO_SCATTER,
} from './constants';

import * as signUpSelectors from './selectors';

import SignUpForm from './SignUpForm';
import IdentityIsRegistred from './IdentityIsRegistred';
import SignUpOptions from './SignUpOptions';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentDidUpdate() {
    const { registered, account, userIsInSystem } = this.props;

    const reload = localStorage.getItem(COMPLETE_SIGNUP);
    const scrollTo = localStorage.getItem('scrollTo');

    if (reload && userIsInSystem !== null) {
      this.props.showSignUpModalDispatch();
      if (scrollTo) window.scrollTo(0, +scrollTo);
      localStorage.clear();
    }

    if (registered) {
      createdHistory.push(routes.profile_edit(account));
    }
  }

  componentWillUnmount() {
    this.props.setReducerDefaultDispatch();
  }

  registerUser = values => {
    this.props.registerUserDispatch({
      eosAccount: this.props.account,
      displayName: values.get(DISPLAY_NAME),
    });
  };

  continueSignUp = () => {
    this.props.loginSignupDispatch({ type: COMPLETE_SIGNUP });
  };

  backToOptions = () => {
    this.props.showSignUpModalDispatch(SHOW_DEFAULT_SIGNUP_MODAL);
  };

  openLoginWindow = () => {
    this.props.hideSignUpModalDispatch();
    this.props.showLoginModalDispatch();
  };

  render() {
    const {
      loading,
      error,
      account,
      locale,
      content,
      showModal,
      hideSignUpModalDispatch,
    } = this.props;

    return (
      <ModalDialog show={showModal} closeModal={hideSignUpModalDispatch}>
        <div>
          {content === SHOW_DEFAULT_SIGNUP_MODAL && (
            <SignUpOptions
              continueSignUp={this.continueSignUp}
              backToOptions={this.openLoginWindow}
            />
          )}

          {content === NO_SCATTER && (
            <ScatterInstaller
              reloadApp={this.props.reloadAppDispatch}
              backToOptions={this.backToOptions}
            />
          )}

          {content === NO_SELECTED_SCATTER_ACCOUNTS && (
            <SelectAccountComponent
              selectAccount={this.continueSignUp}
              backToOptions={this.backToOptions}
            />
          )}

          {content === USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP && (
            <SignUpForm
              registerUser={this.registerUser}
              loading={loading}
              errorMessage={error}
              account={account}
              translations={translationMessages[locale]}
            />
          )}

          {content === USER_IS_IN_SYSTEM_AND_SIGNUP && (
            <IdentityIsRegistred
              account={account}
              continueLogin={this.openLoginWindow}
              backToOptions={this.backToOptions}
            />
          )}
        </div>
      </ModalDialog>
    );
  }
}

SignUp.propTypes = {
  registerUserDispatch: PropTypes.func,
  setReducerDefaultDispatch: PropTypes.func,
  reloadAppDispatch: PropTypes.func,
  showSignUpModalDispatch: PropTypes.func,
  hideSignUpModalDispatch: PropTypes.func,
  loginSignupDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  account: PropTypes.string,
  error: PropTypes.object,
  userIsInSystem: PropTypes.bool,
  loading: PropTypes.bool,
  registered: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  showModal: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: signUpSelectors.makeSelectLoading(),
  error: signUpSelectors.makeSelectError(),
  registered: signUpSelectors.makeSelectRegistered(),
  content: signUpSelectors.makeSelectContent(),
  showModal: signUpSelectors.makeSelectShowModal(),
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
  userIsInSystem: makeSelectUserIsInSystem(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerUserDispatch: obj => dispatch(fetchRegisterAcc(obj)),
    setReducerDefaultDispatch: () => dispatch(setReducerDefault()),
    loginSignupDispatch: methods => dispatch(loginSignup(methods)),
    reloadAppDispatch: () => dispatch(reloadApp(COMPLETE_SIGNUP)),
    showSignUpModalDispatch: () => dispatch(showSignUpModal()),
    hideSignUpModalDispatch: () => dispatch(hideSignUpModal()),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUp);
