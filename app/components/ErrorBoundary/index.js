/**
 *
 * ErrorBoundary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logError } from 'utils/web_integration/src/logger/index';
import ErrorMessage from './ErrorMessage';

/* eslint-disable react/prefer-stateless-function */
export class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production' && !process.env.IS_TEST_ENV) {
      const { user } = this.props;
      logError({ user, error: JSON.stringify({ stack: error.stack }) });
      createdHistory.push(routes.errorPage());
    } else {
      this.setState({
        error,
        errorInfo,
      });
    }
  }

  render() {
    const { error, errorInfo } = this.state;

    return error || errorInfo ? (
      <ErrorMessage error={error} errorInfo={errorInfo} />
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  user: PropTypes.string,
};

export default compose(
  connect(state => ({
    user: makeSelectAccount()(state),
  })),
)(ErrorBoundary);
