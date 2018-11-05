import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const ErrorBoundryMessage = props => (
  <div className="alert alert-danger" role="alert">
    <h3 className="alert alert-danger" role="alert">
      <FormattedMessage {...messages.problemWithWebpage} />
    </h3>
    <details>
      {props.error.toString()}
      <br />
      {props.errorInfo.componentStack}
    </details>
    <button className="btn btn-link" onClick={props.reloadApp}>
      <FormattedMessage {...messages.reloadPage} />
    </button>
  </div>
);

ErrorBoundryMessage.propTypes = {
  error: PropTypes.object,
  errorInfo: PropTypes.object,
  reloadApp: PropTypes.func,
};

export default ErrorBoundryMessage;
