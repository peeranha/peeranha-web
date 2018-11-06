import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from 'components/TextEditor';

function renderTextEditor({ label, disabled }) {
  return (
    <div>
      <h6>{label}</h6>
      <TextEditor disabled={disabled} />
    </div>
  );
}

renderTextEditor.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

export default renderTextEditor;
