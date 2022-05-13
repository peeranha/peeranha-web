import React from 'react';

type ButtonProps = {
  children: string;
};

const Button: React.FC<ButtonProps> = ({ children }): JSX.Element => (
  <button type="button">{children}</button>
);

export default Button;
