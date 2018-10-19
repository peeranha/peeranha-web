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

import { makeSelectAccount } from 'containers/AccountInitializer/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import * as signUpSelectors from './selectors';
import { fetchRegisterAcc, setReducerDefault } from './actions';
import { DISPLAY_NAME } from './constants';

import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentDidUpdate() {
    const { registered, account } = this.props;

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

  render() {
    const { loading, error, account, locale } = this.props;

    return (
      <Wrapper>
        <SignUpForm
          registerUser={this.registerUser}
          loading={loading}
          errorMessage={error}
          account={account}
          translations={translationMessages[locale]}
        />
      </Wrapper>
    );
  }
}

SignUp.propTypes = {
  registerUserDispatch: PropTypes.func.isRequired,
  setReducerDefaultDispatch: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  registered: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: signUpSelectors.makeSelectLoading(),
  error: signUpSelectors.makeSelectError(),
  registered: signUpSelectors.makeSelectRegistered(),
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerUserDispatch: obj => dispatch(fetchRegisterAcc(obj)),
    setReducerDefaultDispatch: () => dispatch(setReducerDefault()),
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
