import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function TextareaField({
  input,
  label,
  disabled,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label}</h6>
      <textarea
        {...input}
        disabled={disabled}
        placeholder={label}
        className="textarea form-control"
      />
      <h6 className="text-danger">
        {touched &&
          ((error && <FormattedMessage {...error} />) ||
            (warning && <FormattedMessage {...warning} />))}
      </h6>
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
