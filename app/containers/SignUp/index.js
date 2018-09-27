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

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import messages from './messages';
import reducer from './reducer';
import makeSelectSign from './selectors';
import saga from './saga';

import { fetchRegistrAcc, setReducerDefault } from './actions';

import { EOS_ACC, DISPLAY_NAME } from './constants';

import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentWillMount() {
    this.registrUser = this.registrUser.bind(this);
  }

  componentDidUpdate() {
    if (this.props.signup.registred) {
      this.props.history.push('./profile');
    }
  }

  componentWillUnmount() {
    this.props.setReducerDefaultDispatch();
  }

  registrUser(values) {
    const eosAccount = values.get(EOS_ACC);
    const displayName = values.get(DISPLAY_NAME);

    this.props.registrUserDispatch({
      eosAccount,
      displayName,
    });

    return { eosAccount, displayName };
  }

  render() {
    const signUpDescription = (
      <FormattedMessage {...messages.signUpDescription} />
    );
    const signUp = <FormattedMessage {...messages.signUp} />;
    const { signup } = this.props;

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
          <SignUpForm registrUser={this.registrUser} signup={signup} />
        </Wrapper>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registrUserDispatch: PropTypes.func.isRequired,
  setReducerDefaultDispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  signup: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSign(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registrUserDispatch: obj => dispatch(fetchRegistrAcc(obj)),
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
