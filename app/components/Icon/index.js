import React from 'react';
import PropTypes from 'prop-types';
import IconStyled from './IconStyled';

const Icon = ({ icon, noMargin }) => (
  <IconStyled
    noMargin={noMargin}
    dangerouslySetInnerHTML={{ __html: icon }}
    data-icon="icon"
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
};

export default Icon;
