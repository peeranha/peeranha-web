import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { TEXT_SECONDARY } from 'style-constants';

import validationArrowIcon from 'svg/validationArrow';

import Span from 'components/Span';
import Icon from 'components/Icon';

export const WarningMessage = /* istanbul ignore next */ ({
  error,
  warning,
  touched,
  className,
  tip,
  intl,
}) =>
  touched && (error || warning || tip) ? (
    <div className={`d-flex align-items-center ${className}`}>
      {tip && (
        <Icon className="d-none d-xl-inline" icon={validationArrowIcon} />
      )}

      <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
        {(error && intl.formatMessage({ id: error.id })) ||
          (warning && intl.formatMessage({ id: warning.id })) ||
          tip}
      </Span>
    </div>
  ) : null;

WarningMessage.propTypes = {
  error: PropTypes.object,
  warning: PropTypes.object,
  className: PropTypes.string,
  tip: PropTypes.string,
  touched: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default React.memo(injectIntl(WarningMessage));
