import React from 'react';
import PropTypes from 'prop-types';

import WarningMessage from './WarningMessage';

function TextInputField({ input, label, readOnly, disabled, meta }) {
  return (
    <div>
      <h6>{label}</h6>
      <input
        {...input}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={label}
        type="text"
        className="form-control"
      />
      <WarningMessage {...meta} />
    </div>
  );
}

TextInputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
};

export default TextInputField;
