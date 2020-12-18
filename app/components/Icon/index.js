import React from 'react';
import PropTypes from 'prop-types';

import { BG_PRIMARY_SPECIAL_2, BORDER_PRIMARY } from 'style-constants';

import IconStyled from './IconStyled';

const Icon = ({
  icon,
  width,
  height,
  className,
  fill,
  color,
  rotate,
  onClick,
  isTransition,
  isColorImportant,
  specialStyles,
}) => (
  <IconStyled
    className={className}
    width={width}
    height={height}
    color={color || BORDER_PRIMARY}
    fill={fill || BG_PRIMARY_SPECIAL_2}
    dangerouslySetInnerHTML={{ __html: icon }}
    shouldBeRotated={rotate || null}
    onClick={onClick}
    isTransition={isTransition}
    isColorImportant={isColorImportant}
    specialStyles={specialStyles}
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  isTransition: PropTypes.bool,
  isColorImportant: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
  onClick: PropTypes.func,
  // specialStyles should be defined with css function
  specialStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default React.memo(Icon);
