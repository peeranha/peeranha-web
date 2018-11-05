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
      apiKey={TextEditorConfig.apiKey}
      initialValue={props.content || ''}
      init={{
        height: props.height || 300,
        plugins: TextEditorConfig.plugins,
        toolbar: TextEditorConfig.toolbar,
      }}
      onChange={props.handleEditorChange}
    />
  </div>
);

TextEditor.propTypes = {
  content: PropTypes.string,
  height: PropTypes.number,
  handleEditorChange: PropTypes.func.isRequired,
};

export default TextEditor;
