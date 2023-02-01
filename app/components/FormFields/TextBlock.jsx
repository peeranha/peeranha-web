import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const TextBlock = ({ content }) => (
  <MarkdownPreview
    source={content}
    css={css`
      background: ${colors.blue2 || ''};
      color: ${colors.black || ''};
      font-family: 'Source Sans Pro', sans-serif;
      ol li {
        list-style-type: decimal;
      }
      ul li {
        list-style-type: disc;
      }
      table {
        word-break: normal;
      }
      min-width: 0;
    `}
    warpperElement={{ 'data-color-mode': 'light' }}
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
