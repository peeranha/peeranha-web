/**
 *
 * TextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import { css } from '@emotion/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { marked } from 'marked';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import { PreviewWrapper } from '../AnswerForm';
import Wrapper from 'components/FormFields/Wrapper';
import Span from 'components/Span';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import messages from './messages';
import { TEXT_SECONDARY, TEXT_DARK } from 'style-constants';

/* eslint no-return-assign: "error" */
class TextEditor extends React.PureComponent {
  onBlurHandler = () => {
    this.props.onBlur(this.props.value);
  };

  static getHtmlText = (md) => marked.parse(md);

  render() {
    const { locale } = this.props;
    return (
      <>
        <MDEditor
          css={css`
            margin-bottom: 20px;
            border-bottom: 2px solid ${TEXT_DARK};
            textarea {
              -webkit-text-fill-color: ${TEXT_DARK};
            }
          `}
          disabled={this.props.disabled}
          height={400}
          locale={this.props.locale}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.onBlurHandler}
          textareaProps={{
            placeholder: translationMessages[locale][messages.enterText.id],
          }}
          preview={'edit'}
        />
        <Wrapper
          label={'Preview'}
          className="pl-2 pt-2"
          css={css`
            h6 {
              padding-bottom: 20px;
            }
          `}
        >
          <PreviewWrapper>
            {this.props.value ? (
              <MarkdownPreview
                source={this.props.value}
                warpperElement={{ 'data-color-mode': 'light' }}
                css={css`
                  ol li {
                    list-style-type: decimal;
                  }
                  ul li {
                    list-style-type: disc;
                  }
                `}
                rehypeRewrite={(node) => {
                  if (node.tagName === 'input') {
                    node.properties.disabled = false;
                  }
                }}
              />
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
