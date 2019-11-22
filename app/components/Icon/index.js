import React from 'react';
import PropTypes from 'prop-types';
import IconStyled from './IconStyled';

const Icon = ({ icon, width, className, color, rotate, onClick }) => (
  <IconStyled
    className={className}
    width={width}
    color={color}
    dangerouslySetInnerHTML={{ __html: icon }}
    rotate={rotate}
    onClick={onClick}
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Icon);
