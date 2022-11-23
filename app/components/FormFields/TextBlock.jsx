import React from 'react';
import PropTypes from 'prop-types';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';

export const TextBlock = ({ content }) => <MarkdownPreview source={content} />;

TextBlock.propTypes = {
  content: PropTypes.string,
};

export default React.memo(TextBlock);
