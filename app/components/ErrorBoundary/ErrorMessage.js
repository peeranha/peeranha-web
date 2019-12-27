import React from 'react';
import PropTypes from 'prop-types';

export const ErrorBoundaryMessage = ({ error, errorInfo }) => (
  <div className="alert alert-danger" role="alert">
    <h3 className="alert alert-danger" role="alert">
      Problem occured...
    </h3>
    <details>
      {error.toString()}
      <br />
      {errorInfo.componentStack}
    </details>
    <button
      className="btn btn-link"
      onClick={() => {
        document.location.href = '/';
      }}
    >
      Reload page
    </button>
  </div>
);

ErrorBoundaryMessage.propTypes = {
  error: PropTypes.object,
  errorInfo: PropTypes.object,
};

export default React.memo(ErrorBoundaryMessage);
