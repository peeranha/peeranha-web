/**
 *
 * TextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import EditorOptions from 'simplemde';
import 'easymde/dist/easymde.min.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import options from './options';
import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import { DEFAULT_LOCALE } from '../../i18n';

const TEXT_EDITOR_CLASSNAME = 'component-text-editor';

/* eslint no-return-assign: "error" */
class TextEditor extends React.PureComponent {
  onBlurHandler = () => {
    this.props.onBlur(this.props.value);
  };

  static getHtmlText = md => EditorOptions.prototype.markdown(md);

  render() {
    const { locale } = this.props;
    return (
      <SimpleMDE
        disabled={this.props.disabled}
        locale={this.props.locale}
        onChange={this.props.onChange}
        value={this.props.value}
        className={TEXT_EDITOR_CLASSNAME}
        onBlur={this.onBlurHandler}
        options={{ ...options, spellChecker: locale === DEFAULT_LOCALE }}
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
  locale: PropTypes.string,
};

export { TEXT_EDITOR_CLASSNAME };
export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
)(TextEditor);
