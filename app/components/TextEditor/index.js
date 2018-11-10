/**
 *
 * TextEditor
 *
 */

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

import TextEditorConfig from './TextEditorConfig';

const TextEditor = props => {
  const handleEditorChange = e => {
    console.log(`Value changed - ${e.level.content}`);
    let newContent = e.level.content;
    // TimyMCE keeps <p><br></p> elements when empty
    newContent = newContent
      .replace('<p><br></p>', '')
      .replace('<p><br data-mce-bogus="1"></p>', '');
    props.onChange(newContent);
  };

  return (
    <div>
      <Editor
        {...props}
        apiKey={TextEditorConfig.apiKey}
        initialValue={props.content || ''}
        disabled={props.disabled}
        init={{
          height: props.height || 300,
          plugins: TextEditorConfig.plugins,
          toolbar: TextEditorConfig.toolbar,
          menubar: TextEditorConfig.menubar,
        }}
        onChange={handleEditorChange}
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
