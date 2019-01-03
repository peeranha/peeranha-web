import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const WarningMessage = ({ touched, error, warning }) =>
  touched && (error || warning) ? (
    <h6 className="text-danger">
      {(error && <FormattedMessage {...error} />) ||
        (warning && <FormattedMessage {...warning} />)}
    </h6>
  ) : null;

WarningMessage.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.object,
  warning: PropTypes.object,
};

export default WarningMessage;
