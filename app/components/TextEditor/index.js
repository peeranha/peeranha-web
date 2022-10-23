/**
 *
 * TextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import SimpleMDE from 'react-simplemde-editor';
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { marked } from 'marked';
import 'easymde/dist/easymde.min.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import options from './options';
import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import { DEFAULT_LOCALE } from '../../i18n';
import { PreviewWrapper } from '../AnswerForm';
import Wrapper from 'components/FormFields/Wrapper';
import Span from 'components/Span';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { TEXT_SECONDARY } from 'style-constants';

/* eslint no-return-assign: "error" */
class TextEditor extends React.PureComponent {
  onBlurHandler = () => {
    this.props.onBlur(this.props.value);
  };

  static getHtmlText = md => marked.parse(md);

  render() {
    const { locale } = this.props;
    return (
      <>
        <MDEditor
          disabled={this.props.disabled}
          height={400}
          locale={this.props.locale}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.onBlurHandler}
          textareaProps={{
            placeholder: 'Please enter Markdown text',
          }}
          preview={'edit'}
        />
        <Wrapper label={'Preview'}>
          <PreviewWrapper>
            {this.props.value ? (
              <MarkdownPreview source={this.props.value} />
            ) : (
              <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
                <FormattedMessage id={commonMessages.nothingToSeeYet.id} />
              </Span>
            )}
          </PreviewWrapper>
        </Wrapper>
      </>
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

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
)(TextEditor);
