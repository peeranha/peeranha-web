import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function TextInputField({
  input,
  label,
  readOnly,
  disabled,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label}</h6>
      <input
        {...input}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={label || ''}
        type="text"
        className="form-control"
      />
      <h6 className="text-danger">
        {touched &&
          ((error && <FormattedMessage {...error} />) ||
            (warning && <FormattedMessage {...warning} />))}
      </h6>
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
