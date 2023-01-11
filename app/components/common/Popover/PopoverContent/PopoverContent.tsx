import React, { useState, useEffect, useLayoutEffect } from 'react';
import cn from 'classnames';
import { css } from '@emotion/react';
import { createPopper } from '@popperjs/core';
import { PopoverContentProps } from '../types';
import { root } from '../Popover.styled';

const PopoverContent: React.FC<PopoverContentProps> = ({
  popoverRef,
  triggerRef,
  placement = 'bottom-start',
  offset,
  close,
  children,
  className,
  isEqualWidth,
  isTransition = true,
  cssProps,
}) => {
  const [popoverWidth, setPopoverWidth] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (isEqualWidth && triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [isEqualWidth, triggerRef]);

  useLayoutEffect(() => {
    let popper: any;

    if (triggerRef.current && popoverRef.current) {
      popper = createPopper(triggerRef.current, popoverRef.current, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [offset?.left || 0, offset?.top || 0],
            },
          },
          {
            name: 'arrow',
            options: {
              padding: 12,
            },
          },
        ],
      });
    }

    return (): void => {
      if (popper) {
        popper.destroy();
      }
    };
  }, [triggerRef, popoverRef, offset, placement]);

  return (
    <div
      className={cn('pa', className)}
      css={{ ...(isTransition && root), ...cssProps }}
      style={{
        width: popoverWidth,
      }}
      ref={popoverRef}
    >
      {children instanceof Function ? children({ close }) : children}
    </div>
  );
};

export default PopoverContent;
