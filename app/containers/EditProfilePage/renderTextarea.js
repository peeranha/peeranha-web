import React from 'react';
import PropTypes from 'prop-types';

function renderTextarea({
  input,
  label,
  sendProps,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label}</h6>
      <textarea {...input} placeholder={label} className="form-control" />
      <h6 className="text-danger">
        {touched &&
          ((error && <span>{sendProps.translations[error]}</span>) ||
            (warning && <span>{sendProps.translations[warning]}</span>))}
      </h6>
    </div>
  );
}

renderTextarea.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderTextarea;
