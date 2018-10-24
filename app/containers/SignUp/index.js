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
      createdHistory.push(`/users/edit/${account}`);
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
  registerUserDispatch: PropTypes.func.isRequired,
  setReducerDefaultDispatch: PropTypes.func.isRequired,
  reloadAppDispatch: PropTypes.func.isRequired,
  showSignUpModalDispatch: PropTypes.func.isRequired,
  hideSignUpModalDispatch: PropTypes.func.isRequired,
  loginSignupDispatch: PropTypes.func.isRequired,
  showLoginModalDispatch: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  userIsInSystem: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  registered: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  showModal: PropTypes.string,
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

function mapDispatchToProps(dispatch) {
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
