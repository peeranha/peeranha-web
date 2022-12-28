import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';

export const TextBlock = ({ content }) => (
  <MarkdownPreview
    source={content}
    css={css`
      font-family: 'Source Sans Pro', sans-serif;
      ol li {
        list-style-type: decimal;
      }
      ul li {
        list-style-type: disc;
      }
      iframe {
        max-width: 100%;
      }
      min-width: 0;
    `}
    warpperElement={{ 'data-color-mode': 'light' }}
    rehypeRewrite={(node, index, parent) => {
      if (node.tagName === 'input') {
        node.properties.disabled = false;
      }
      if (
        parent?.tagName === 'a' &&
        parent?.properties.href.slice(0, 24) == 'https://www.youtube.com/'
      ) {
        const youtubeLink = `https://www.youtube.com/embed/${node.value.slice(
          32,
        )}`;
        node.value = (
          <iframe
            width="560"
            height="315"
            src={youtubeLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen="true"
          ></iframe>
        );
      }
    }}
  />
);

TextBlock.propTypes = {
  content: PropTypes.string,
};

export default React.memo(TextBlock);
