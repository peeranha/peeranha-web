import React from 'react';
import PropTypes from 'prop-types';

import { BG_PRIMARY_SPECIAL_2, BORDER_PRIMARY } from 'style-constants';

import IconStyled from './IconStyled';

const Icon = ({
  icon,
  width,
  className,
  fill,
  color,
  rotate,
  onClick,
  isTransition,
  isColorImportant,
}) => (
  <IconStyled
    className={className}
    width={width}
    color={color || BORDER_PRIMARY}
    fill={fill || BG_PRIMARY_SPECIAL_2}
    dangerouslySetInnerHTML={{ __html: icon }}
    rotate={rotate || null}
    onClick={onClick}
    isTransition={isTransition}
    isColorImportant={isColorImportant}
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  isTransition: PropTypes.bool,
  isColorImportant: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Icon);
