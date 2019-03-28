import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';
import WarningMessage from './WarningMessage';

const Wrapper = ({ children, fieldWithTips, label, meta }) => (
  <div className="mb-2">
    <Label>{label}</Label>
    <div className="row align-items-start mb-2">
      <div className={`col-xl-${fieldWithTips ? 6 : 12} mb-1`}>{children}</div>
      <WarningMessage
        {...meta}
        isArrowed={fieldWithTips}
        className={`col-xl-${fieldWithTips ? 6 : 12}`}
      />
    </div>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.any,
  fieldWithTips: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export default React.memo(Wrapper);
