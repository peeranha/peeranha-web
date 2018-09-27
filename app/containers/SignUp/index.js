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
import { SubmissionError } from 'redux-form/immutable';

import { registerAccount } from 'utils/accountManagement';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { EOS_ACC, DISPLAY_NAME } from './constants';
import messages from './messages';
import reducer from './reducer';
import makeSelectSign from './selectors';
import saga from './saga';

import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentWillMount() {
    this.registrUser = this.registrUser.bind(this);
  }

  async registrUser(values) {
    const eosAccount = values.get(EOS_ACC);
    const displayName = values.get(DISPLAY_NAME);
    const registrationStatus = await registerAccount(
      eosAccount,
      displayName,
      {},
    );
    const serverMessage = <FormattedMessage {...messages.serverMessage} />;

    if (registrationStatus) {
      this.props.history.push('/profile');
    } else {
      throw new SubmissionError({
        eosAccount: serverMessage.props.defaultMessage,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Sign Up</title>
          <meta name="description" content="Description of Sign Up" />
        </Helmet>
        <Wrapper>
          <SignUpForm registrUser={this.registrUser} />
        </Wrapper>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sign: makeSelectSign(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
