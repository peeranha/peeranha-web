import React from 'react';
import PropTypes from 'prop-types';

function renderTextInput({
  input,
  label,
  disabled,
  sendProps,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label}</h6>
      <input
        {...input}
        disabled={disabled}
        placeholder={label}
        type="text"
        className="form-control"
      />
      <h6 className="text-danger">
        {touched &&
          ((error && <span>{sendProps.translations[error]}</span>) ||
            (warning && <span>{sendProps.translations[warning]}</span>))}
      </h6>
    </div>
  );
}

renderTextInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderTextInput;
