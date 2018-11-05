import React from 'react';
import PropTypes from 'prop-types';

import messages from './messages';

function renderTextInput({
  input,
  translations,
  disabled,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <h6>{translations[messages.titleLabel.id]}</h6>
      <input
        {...input}
        disabled={disabled}
        placeholder={translations[messages.titleLabel.id]}
        type="text"
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

renderTextInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  translations: PropTypes.object,
};

export default renderTextInput;
