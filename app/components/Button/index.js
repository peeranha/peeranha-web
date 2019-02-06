import React from 'react';
import PropTypes from 'prop-types';

import ButtonStyled from './ButtonStyled';
import BlueButtonStyled from './BlueButtonStyled';

const options = {
  red: ButtonStyled,
  default: BlueButtonStyled,
};

const Button = ({
  children,
  onClick,
  disabled,
  type,
  isLink,
  typeAttr,
  className,
}) => {
  const B = options[type || 'default'];

  return (
    <B
      className={className}
      onClick={onClick}
      disabled={disabled}
      isLink={isLink}
      type={typeAttr || 'button'}
    >
      {React.Children.toArray(children)}
    </B>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  typeAttr: PropTypes.string,
  className: PropTypes.string,
  isLink: PropTypes.bool,
  children: PropTypes.element,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default React.memo(Button);
