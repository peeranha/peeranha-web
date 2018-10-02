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
import { FormattedMessage } from 'react-intl';

import makeSelectAccountInitializer from 'containers/AccountInitializer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectRegistered,
} from './selectors';

import { fetchRegisterAcc, setReducerDefault } from './actions';

import { EOS_ACC, DISPLAY_NAME } from './constants';

import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentWillMount() {
    SignUp.registerUser = SignUp.registerUser.bind(this);
  }

  componentDidUpdate() {
    if (this.props.registered) {
      this.props.history.push('./profile');
    }
  }

  componentWillUnmount() {
    this.props.setReducerDefaultDispatch();
  }

  static registerUser(values) {
    const eosAccount = values.get(EOS_ACC);
    const displayName = values.get(DISPLAY_NAME);

    this.props.registerUserDispatch({
      eosAccount,
      displayName,
    });

    return { [EOS_ACC]: eosAccount, [DISPLAY_NAME]: displayName };
  }

  render() {
    const signUpDescription = (
      <FormattedMessage {...messages.signUpDescription} />
    );
    const signUp = <FormattedMessage {...messages.signUp} />;
    const { loading, error, account } = this.props;
    return (
      <div className="container">
        <Helmet>
          <title>{signUp.props.defaultMessage}</title>
          <meta
            name="description"
            content={signUpDescription.props.defaultMessage}
          />
        </Helmet>
        <Wrapper>
          <SignUpForm
            registerUser={SignUp.registerUser}
            loading={loading}
            errorMessage={error}
            account={account}
          />
        </Wrapper>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerUserDispatch: PropTypes.func.isRequired,
  setReducerDefaultDispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  registered: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  registered: makeSelectRegistered(),
  account: makeSelectAccountInitializer(),
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
