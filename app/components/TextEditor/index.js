/**
 *
 * TextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

import options from './options';

const TextEditor = props => {
  const handleEditorChange = txt => {
    props.onChange(txt);
  };

  return (
    <div>
      <SimpleMDE
        {...props}
        onBlur={null}
        disabled={props.disabled}
        onChange={handleEditorChange}
        options={options}
      />
    </div>
  );
};

TextEditor.propTypes = {
  content: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  onChange: PropTypes.func,
};

export default TextEditor;
