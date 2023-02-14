import React from 'react';
import { css } from '@emotion/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';

type MarkdownPreviewProps = {
  content: string;
};

const MarkdownPreviewBlock: React.FC<MarkdownPreviewProps> = ({
  content,
}): JSX.Element => {
  return (
    <MarkdownPreview
      source={content}
      warpperElement={{ 'data-color-mode': 'light' }}
      css={css`
        ol li {
          list-style-type: decimal;
        }
        ul li {
          list-style-type: disc;
        }
        iframe {
          max-width: 100%;
        }
      `}
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
};

export default MarkdownPreviewBlock;
