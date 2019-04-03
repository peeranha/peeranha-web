import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';
import WarningMessage from './WarningMessage';

export const Wrapper = /* istanbul ignore next */ ({
  children,
  tip,
  label,
  meta,
}) => (
  <div className="mb-2">
    <Label>{label}</Label>
    <div className="row align-items-center mb-2">
      <div className={`col-xl-${tip ? 7 : 12} mb-1`}>{children}</div>
      <WarningMessage
        {...meta}
        tip={tip}
        className={`col-xl-${tip ? 5 : 12}`}
      />
    </div>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.any,
  tip: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export default React.memo(Wrapper);
