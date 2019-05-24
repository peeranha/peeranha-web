import React from 'react';
import PropTypes from 'prop-types';
import IconStyled from './IconStyled';

const Icon = /* istanbul ignore next */ ({
  icon,
  noMargin,
  className,
  onClick,
  rotate,
}) => (
  <IconStyled
    className={className}
    onClick={onClick}
    noMargin={noMargin}
    rotate={rotate}
    dangerouslySetInnerHTML={{ __html: icon }}
    data-icon="icon"
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Icon);
