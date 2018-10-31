import React from 'react';
import PropTypes from 'prop-types';

export const WarningMessage = (touched, translations, error, warning) => {
  let value = null;

  if (touched) {
    if (error) {
      value = <span>{translations[error]}</span>;
    } else if (warning) {
      value = <span>{translations[warning]}</span>;
    }
  }

  return value;
};

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
        {WarningMessage(touched, sendProps.translations, error, warning)}
      </h6>
    </div>
  );
}

renderTextInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  sendProps: PropTypes.object,
};

export default renderTextInput;
