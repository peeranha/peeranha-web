/**
 *
 * Sign
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
import FormSign from './FormSign';

/* eslint-disable react/prefer-stateless-function */
export class Sign extends React.Component {
  componentWillMount() {
    this.registrUser = this.registrUser.bind(this);
  }

  async registrUser(values) {
    const EOS_ACCOUNT = values.get(EOS_ACC);
    const DISPL_NAME = values.get(DISPLAY_NAME);
    const REGISTR_STATUS = await registerAccount(EOS_ACCOUNT, DISPL_NAME, {});
    const SERVER_MESSAGE = <FormattedMessage {...messages.serverMessage} />;

    if (REGISTR_STATUS) {
      this.props.history.push('/profile');
    } else {
      throw new SubmissionError({
        eosAccount: SERVER_MESSAGE.props.defaultMessage,
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
          <FormSign registrUser={this.registrUser} />
        </Wrapper>
      </div>
    );
  }
}

Sign.propTypes = {
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

const withReducer = injectReducer({ key: 'sign', reducer });
const withSaga = injectSaga({ key: 'sign', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Sign);
