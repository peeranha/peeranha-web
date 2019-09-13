import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';
import WarningMessage from './WarningMessage';

export const Wrapper = /* istanbul ignore next */ ({
  children,
  tip,
  label,
  meta,
  splitInHalf,
}) => {
  let valueWidth = 12;
  let tipWidth = 12;

  // ratio 2 : 1 if there is tip in row
  if (tip) {
    valueWidth = 8;
    tipWidth = 4;
  }

  // to split form in half
  if (splitInHalf) {
    valueWidth = 6;
    tipWidth = 6;
  }

  return (
    <div className="mb-2">
      <Label>{label}</Label>
      <div className="row align-items-center mb-2">
        <div className={`col-12 col-md-${valueWidth} mb-1`}>{children}</div>
        {meta && (
          <WarningMessage
            {...meta}
            tip={tip}
            className={`col-12 col-md-${tipWidth}`}
          />
        )}
      </div>
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.any,
  tip: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object,
  splitInHalf: PropTypes.bool,
};

export default React.memo(Wrapper);
