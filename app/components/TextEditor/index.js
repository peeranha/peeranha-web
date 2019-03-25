/**
 *
 * TextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import EditorOptions from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

import options from './options';

/* eslint no-return-assign: "error" */
class TextEditor extends React.Component {
  onBlurHandler = () => {
    this.props.onBlur(this.props.value);
  };

  static getHtmlText = md => EditorOptions.prototype.markdown(md);

  render() {
    return (
      <div>
        <SimpleMDE
          {...this.props}
          onBlur={this.onBlurHandler}
          options={options}
          extraKeys={{
            Tab: false,
          }}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  content: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
};

export default TextEditor;
