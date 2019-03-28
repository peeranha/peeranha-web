import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import validationArrowIcon from 'svg/validationArrow';

import Span from 'components/Span';
import Icon from 'components/Icon';

const WarningMessage = ({ error, warning, touched, className, isArrowed }) =>
  touched && (error || warning) ? (
    <div className={`d-flex align-items-center ${className}`}>
      {isArrowed && (
        <Icon className="d-none d-xl-inline" icon={validationArrowIcon} />
      )}

      <Span color="gray" fontSize="14" isItalic>
        {(error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />)}
      </Span>
    </div>
  ) : null;

WarningMessage.propTypes = {
  error: PropTypes.object,
  warning: PropTypes.object,
  className: PropTypes.string,
  isArrowed: PropTypes.bool,
  touched: PropTypes.bool,
};

export default React.memo(WarningMessage);
