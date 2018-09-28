import React from 'react';
import PropTypes from 'prop-types';

function renderField({
  input,
  label,
  type,
  readOnly,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{label[0]}</h6>
      <input
        {...input}
        placeholder={label[0]}
        type={type}
        readOnly={readOnly}
        value={readOnly ? label[1] : null}
        className="form-control"
      />
      <h6 className="text-danger">
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </h6>
    </div>
  );
}

renderField.propTypes = {
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
};

export default renderField;
