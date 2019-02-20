import React from 'react';
import PropTypes from 'prop-types';

import ButtonStyled from './ButtonStyled';
import PrimaryButtonStyled from './PrimaryButtonStyled';
import OutlinedButtonStyled from './OutlinedButtonStyled';

const options = {
  outlined: OutlinedButtonStyled,
  red: ButtonStyled,
  default: PrimaryButtonStyled,
};

const Button = ({
  children,
  onClick,
  disabled,
  type,
  isLink,
  typeAttr,
  isRounded,
  className,
  bg,
  dataset = {},
}) => {
  const B = options[type || 'default'];

  return (
    <B
      {...dataset}
      className={className}
      onClick={onClick}
      disabled={disabled}
      isLink={isLink}
      isRounded={isRounded}
      bg={bg}
      type={typeAttr || 'button'}
    >
      {React.Children.toArray(children)}
    </B>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  bg: PropTypes.string,
  typeAttr: PropTypes.string,
  className: PropTypes.string,
  isLink: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isRounded: PropTypes.bool,
  dataset: PropTypes.object,
};

export default React.memo(Button);
