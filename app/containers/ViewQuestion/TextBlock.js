import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = props => (
  <div
    className="text-block"
    dangerouslySetInnerHTML={{ __html: props.text }}
  />
);

TextBlock.propTypes = {
  text: PropTypes.string,
};

export default TextBlock;
