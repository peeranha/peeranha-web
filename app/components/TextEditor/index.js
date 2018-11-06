/**
 *
 * TextEditor
 *
 */

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

import TextEditorConfig from './TextEditorConfig';

const TextEditor = props => (
  <div>
    <Editor
      {...props.input}
      content={props.input.value}
      apiKey={TextEditorConfig.apiKey}
      initialValue={props.content || ''}
      disabled={props.disabled}
      init={{
        height: props.height || 300,
        plugins: TextEditorConfig.plugins,
        toolbar: TextEditorConfig.toolbar,
        menubar: TextEditorConfig.menubar,
      }}
      onChange={props.handleEditorChange}
    />
  </div>
);

TextEditor.propTypes = {
  input: PropTypes.object,
  content: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  handleEditorChange: PropTypes.func,
};

export default TextEditor;
