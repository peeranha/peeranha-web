/**
 *
 * ErrorBoundary
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  callService,
  LOGGER_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ErrorMessage from './ErrorMessage';

/* eslint-disable react/prefer-stateless-function */
export class ErrorBoundary extends React.PureComponent {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production' && !process.env.IS_TEST_ENV) {
      const { account } = this.props;
      const requestBody = {
        user: account,
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      };
      callService(LOGGER_SERVICE, requestBody);
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
  account: PropTypes.string,
};

export default memo(
  compose(
    connect(state => ({
      account: makeSelectAccount()(state),
    })),
  )(ErrorBoundary),
);
