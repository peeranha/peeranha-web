import React from 'react';
import { useTheme } from '@emotion/react';
import cn from 'classnames';
import IconComponent from 'icons/IconComponent';
import { base, variants, iconLeft } from './Button.styled';

type ButtonProps = {
  children: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  /** Icon for the button */
  icon?: typeof IconComponent;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className,
  disabled = false,
  type = 'button',
  icon,
}): JSX.Element => {
  const theme = useTheme();

  return (
    <button
      type={type}
      className={cn('db fz16 cup bd0 on tc', className)}
      css={[
        base,
        {
          borderRadius: theme.buttonBorderRadius,
        },
        variants[variant],
        icon && iconLeft,
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {icon}
        <span>{children}</span>
      </>
    </button>
  );
};

export default Button;
