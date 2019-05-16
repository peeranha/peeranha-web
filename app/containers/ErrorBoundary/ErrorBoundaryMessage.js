import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export const ErrorBoundaryMessage = ({ error, errorInfo, reloadApp }) => (
  <div className="alert alert-danger" role="alert">
    <h3 className="alert alert-danger" role="alert">
      <FormattedMessage {...messages.problemWithWebpage} />
    </h3>
    <details>
      {error.toString()}
      <br />
      {errorInfo.componentStack}
    </details>
    <button className="btn btn-link" onClick={reloadApp}>
      <FormattedMessage {...messages.reloadPage} />
    </button>
  </div>
);

ErrorBoundaryMessage.propTypes = {
  error: PropTypes.object,
  errorInfo: PropTypes.object,
  reloadApp: PropTypes.func,
};

export default React.memo(ErrorBoundaryMessage);
