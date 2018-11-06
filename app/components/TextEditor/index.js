/**
 *
 * TextEditor
 *
 */

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

import TextEditorConfig from './TextEditorConfig';

export const getTextEditorValue = () =>
  window.tinyMCE.activeEditor.getContent();

const TextEditor = props => (
  <div>
    <Editor
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
  content: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  handleEditorChange: PropTypes.func,
};

export default TextEditor;
