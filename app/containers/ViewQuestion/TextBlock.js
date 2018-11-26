import React from 'react';
import PropTypes from 'prop-types';

import TextEditor from 'components/TextEditor';

const TextBlock = props => (
  <div
    className="text-block"
    dangerouslySetInnerHTML={{ __html: TextEditor.getHtmlText(props.content) }}
  />
);

TextBlock.propTypes = {
  content: PropTypes.string,
};

export default TextBlock;
