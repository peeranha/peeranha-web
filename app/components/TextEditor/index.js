import React from 'react';
import PropTypes from 'prop-types';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { css } from '@emotion/react';
import '@uiw/react-md-editor/markdown-editor.css';
import { marked } from 'marked';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Translation } from 'react-i18next';
import { t } from 'i18next';

import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import { selectIsEditDocumentation } from 'pages/Documentation/selectors';

import { PreviewWrapper } from '../AnswerForm';
import MarkdownPreviewBlock from './MarkdownPreview';
import Wrapper from 'components/FormFields/Wrapper';
import Span from 'components/Span';
import { TEXT_SECONDARY, TEXT_DARK } from 'style-constants';
import {
  singleCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';

const colors = singleCommunityColors();

/* eslint no-return-assign: "error" */
class TextEditor extends React.PureComponent {
  onBlurHandler = () => {
    this.props.onBlur(this.props.value);
  };

  static getHtmlText = (md) => marked.parse(md);

  render() {
    const { locale, isEditDocumentation } = this.props;
    const { projectBorderRadius } = singleCommunityStyles();
    return (
      <>
        <MDEditor
          css={css`
            margin-bottom: 20px;
            border-bottom: 2px solid ${TEXT_DARK};
            background: ${colors.backgroundSpecial || ''};
            ol li {
              list-style-type: decimal;
            }
            ul li {
              list-style-type: disc;
            }
            textarea {
              -webkit-text-fill-color: ${TEXT_DARK};
            }
            .w-md-editor-toolbar {
              border-radius: ${projectBorderRadius} ${projectBorderRadius} 0 0;
              background: ${colors.backgroundSpecial || ''};
            }
          `}
          disabled={this.props.disabled}
          height={400}
          locale={this.props.locale}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.onBlurHandler}
          textareaProps={{
            placeholder: t('common.enterText'),
          }}
          preview={'edit'}
          data-color-mode={'light'}
          previewOptions={{
            rehypeRewrite: (node) => {
              if (node.tagName === 'input') {
                node.properties.disabled = false;
              }
            },
          }}
          extraCommands={[
            commands.codeEdit,
            commands.codeLive,
            commands.codePreview,
            !isEditDocumentation && commands.fullscreen,
          ]}
        />
        <Wrapper
          label={t('common.preview')}
          className="pl-2 pt-2"
          css={css`
            h6 {
              padding-bottom: 20px;
            }
          `}
        >
          <PreviewWrapper>
            {this.props.value ? (
              <MarkdownPreviewBlock content={this.props.value} />
            ) : (
              <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
                <Translation>
                  {(translate) => <>{translate('common.nothingToSeeYet')}</>}
                </Translation>
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
  isEditDocumentation: PropTypes.bool,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    isEditDocumentation: selectIsEditDocumentation(),
  }),
)(TextEditor);
