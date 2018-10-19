import React from 'react';
import PropTypes from 'prop-types';

function renderField({
  input,
  label,
  type,
  disabled,
  readOnly,
  translations,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label[0]}</h6>
      <input
        {...input}
        disabled={disabled}
        placeholder={label[0]}
        type={type}
        readOnly={readOnly}
        value={readOnly ? label[1] : undefined}
        className="form-control"
      />
      <h6 className="text-danger">
        {touched &&
          ((error && <span>{translations[error]}</span>) ||
            (warning && <span>{translations[warning]}</span>))}
      </h6>
    </div>
  );
}

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  translations: PropTypes.object,
};

export default renderField;
