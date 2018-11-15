import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = props => (
  <div
    className="text-block"
    dangerouslySetInnerHTML={{ __html: props.content }}
  />
);

TextBlock.propTypes = {
  content: PropTypes.string,
};

export default TextBlock;
