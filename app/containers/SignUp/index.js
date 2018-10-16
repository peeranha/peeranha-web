/**
 *
 * SignUp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';

import {
  makeSelectAccount,
  makeSelectEosInit,
} from 'containers/AccountInitializer/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import * as signUpSelectors from './selectors';
import {
  fetchRegisterAcc,
  setReducerDefault,
  isUserInSystem,
  selectPopupAccount,
} from './actions';
import { DISPLAY_NAME } from './constants';

import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentDidUpdate() {
    const { registered, history, account } = this.props;

    if (registered) {
      history.push(account);
    }

    this.componentDidMount();
  }

  componentDidMount = async () => {
    const { eosInit, isUserInSystemDispatch, userIsInSystem } = this.props;

    if (eosInit && !eosInit.initialized) return;

    if (!eosInit.scatterInstalled) {
      // show spec screen for scatter install
      console.log('scatterNotInstalled');
      return;
    }

    if (!eosInit.selectedScatterAccount) {
      // show spec. screen
      // case success: put someth. to redux and in compDidUpdate refresh it
      this.props.selectPopupAccountDispatch();
      return;
    }

    if (!eosInit.scatterInstance.identity) {
      // show spec. screen
      console.log('Sign in scatter');
      return;
    }

    if (eosInit.selectedScatterAccount && userIsInSystem === null) {
      isUserInSystemDispatch(eosInit.selectedScatterAccount);
      return;
    }

    if (!userIsInSystem) {
      // push to /signup
      console.log('Such user is absent in system');
    }
  };

  componentWillUnmount() {
    this.props.setReducerDefaultDispatch();
  }

  registerUser = values => {
    this.props.registerUserDispatch({
      eosAccount: this.props.account,
      displayName: values.get(DISPLAY_NAME),
    });
  };

  render() {
    const { loading, error, account, locale } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>{translationMessages[locale][messages.signUp.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.signUpDescription.id]}
          />
        </Helmet>
        <Wrapper>
          <SignUpForm
            registerUser={this.registerUser}
            loading={loading}
            errorMessage={error}
            account={account}
            translations={translationMessages[locale]}
          />
        </Wrapper>
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUserDispatch: PropTypes.func.isRequired,
  isUserInSystemDispatch: PropTypes.func.isRequired,
  selectPopupAccountDispatch: PropTypes.func.isRequired,
  setReducerDefaultDispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  eosInit: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  registered: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  eosInit: makeSelectEosInit(),
  loading: signUpSelectors.makeSelectLoading(),
  error: signUpSelectors.makeSelectError(),
  registered: signUpSelectors.makeSelectRegistered(),
  userIsInSystem: signUpSelectors.makeSelectUserIsInSystem(),
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerUserDispatch: obj => dispatch(fetchRegisterAcc(obj)),
    setReducerDefaultDispatch: () => dispatch(setReducerDefault()),
    isUserInSystemDispatch: user => dispatch(isUserInSystem(user)),
    selectPopupAccountDispatch: () => dispatch(selectPopupAccount()),
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
