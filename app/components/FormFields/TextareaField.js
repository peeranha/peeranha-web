import React from 'react';
import PropTypes from 'prop-types';

import WarningMessage from './WarningMessage';

function TextareaField({ input, label, disabled, meta }) {
  return (
    <div>
      <h6>{label}</h6>
      <textarea
        {...input}
        disabled={disabled}
        placeholder={label}
        className="textarea form-control"
      />
      <WarningMessage {...meta} />
    </div>
  );
}

TextareaField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
};

export default TextareaField;
