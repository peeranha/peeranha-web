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

function renderTextarea({
  input,
  label,
  disabled,
  sendProps,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label}</h6>
      <textarea
        {...input}
        disabled={disabled}
        placeholder={label}
        className="form-control"
      />
      <h6 className="text-danger">
        {WarningMessage(touched, sendProps.translations, error, warning)}
      </h6>
    </div>
  );
}

renderTextarea.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderTextarea;
