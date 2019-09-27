/**
 *
 * ErrorBoundary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import ErrorMessage from './ErrorMessage';

/* eslint-disable react/prefer-stateless-function */
export class ErrorBoundary extends React.PureComponent {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production' && !process.env.NODE_TEST_ENV) {
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
};

export default ErrorBoundary;
