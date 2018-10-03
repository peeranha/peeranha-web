import React from 'react';
import PropTypes from 'prop-types';

function renderTextInput({ input, label, meta: { touched, error, warning } }) {
  return (
    <div>
      <h6>{label}</h6>
      <input
        {...input}
        placeholder={label}
        type="text"
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

renderTextInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default renderTextInput;
