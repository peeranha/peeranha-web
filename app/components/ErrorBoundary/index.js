/**
 *
 * ErrorBoundary
 *
 */

import ChunkLoadError from 'containers/ChunkLoadError';
import React from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import ErrorMessage from './ErrorMessage';
import i18next from 'app/i18n';

const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

/* eslint-disable react/prefer-stateless-function */
export class ErrorBoundary extends React.PureComponent {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production' && !process.env.IS_TEST_ENV) {
      createdHistory.push(baseUrl + routes.errorPage());
    } else {
      this.setState({
        error,
        errorInfo,
      });
    }
  }

  render() {
    const { error, errorInfo } = this.state;

    if (error) {
      return error.name === 'ChunkLoadError' ? (
        <ChunkLoadError />
      ) : (
        <ErrorMessage error={error} errorInfo={errorInfo} />
      );
    }
    return <div>{this.props.children}</div>;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};

export default ErrorBoundary;
