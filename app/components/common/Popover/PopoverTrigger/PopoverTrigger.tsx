import React from 'react';
import cn from 'classnames';
import { PopoverTriggerProps } from '../types';

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  className,
  isOpen,
  triggerRef,
  tagName = 'div',
}) =>
  React.createElement(
    tagName,
    {
      className: cn('dib', className),
      ref: triggerRef,
    },
    children instanceof Function ? children({ isOpen }) : children,
  );

export default PopoverTrigger;
