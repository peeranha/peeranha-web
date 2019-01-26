import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

const Button = ({ children, onClick, disabled }) => (
  <ButtonStyled onClick={onClick} disabled={disabled}>
    {React.Children.toArray(children)}
  </ButtonStyled>
);

Button.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
