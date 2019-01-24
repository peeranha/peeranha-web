import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

const Button = ({ children, onClick }) => (
  <ButtonStyled onClick={onClick}>{React.Children.only(children)}</ButtonStyled>
);

Button.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
};

export default Button;
