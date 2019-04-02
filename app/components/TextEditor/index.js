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

const TEXT_EDITOR_CLASSNAME = 'component-text-editor';

/* eslint no-return-assign: "error" */
class TextEditor extends React.PureComponent {
  onBlurHandler = () => {
    this.props.onBlur(this.props.value);
  };

  static getHtmlText = md => EditorOptions.prototype.markdown(md);

  render() {
    return (
      <SimpleMDE
        {...this.props}
        className={TEXT_EDITOR_CLASSNAME}
        onBlur={this.onBlurHandler}
        options={options}
        extraKeys={{
          Tab: false,
        }}
      />
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

export { TEXT_EDITOR_CLASSNAME };
export default TextEditor;
