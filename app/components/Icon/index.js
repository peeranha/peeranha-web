import React from 'react';
import PropTypes from 'prop-types';
import IconStyled from './IconStyled';

const Icon = /* istanbul ignore next */ ({
  icon,
  noMargin,
  className,
  onClick,
  rotate,
  hover,
  width,
}) => (
  <IconStyled
    className={className}
    onClick={onClick}
    noMargin={noMargin}
    rotate={rotate}
    hover={hover}
    width={width}
    dangerouslySetInnerHTML={{ __html: icon }}
    data-icon="icon"
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  hover: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Icon);
