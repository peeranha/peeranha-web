import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';

export const TextBlock = ({ content }) => (
  <MarkdownPreview
    css={css`
      ol li {
        list-style-type: decimal;
      }
      ul li {
        list-style-type: disc;
      }
    `}
    source={content}
    rehypeRewrite={(node) => {
      if (node.tagName === 'input') {
        node.properties.disabled = false;
      }
    }}
  />
);

TextBlock.propTypes = {
  content: PropTypes.string,
};

export default React.memo(TextBlock);
