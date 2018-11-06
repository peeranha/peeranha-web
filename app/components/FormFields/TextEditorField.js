import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextEditor from 'components/TextEditor';

function TextEditorField({
  input,
  handleEditorChange,
  label,
  disabled,
  meta: { touched, warning, error },
}) {
  return (
    <div>
      <h6>{label}</h6>
      <TextEditor
        input={input}
        handleEditorChange={handleEditorChange}
        disabled={disabled}
      />
      <h6 className="text-danger">
        {touched &&
          ((error && <FormattedMessage {...error} />) ||
            (warning && <FormattedMessage {...warning} />))}
      </h6>
    </div>
  );
}

TextEditorField.propTypes = {
  handleEditorChange: PropTypes.func,
  disabled: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
};

export default TextEditorField;
