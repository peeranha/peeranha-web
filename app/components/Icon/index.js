import React from 'react';
import PropTypes from 'prop-types';
import IconStyled from './IconStyled';

const Icon = ({ icon, noMargin, className, onClick }) => (
  <IconStyled
    className={className}
    onClick={onClick}
    noMargin={noMargin}
    dangerouslySetInnerHTML={{ __html: icon }}
    data-icon="icon"
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Icon);
