import React from 'react';
import PropTypes from 'prop-types';

import TextEditor from 'components/TextEditor';
import WarningMessage from './WarningMessage';

function TextEditorField({ input, label, disabled, meta }) {
  return (
    <div>
      <h6>{label}</h6>
      <TextEditor {...input} disabled={disabled} />
      <WarningMessage {...meta} />
    </div>
  );
}

TextEditorField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
};

export default TextEditorField;
