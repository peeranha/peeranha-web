import React from 'react';
import { Placement } from '@popperjs/core';

export type PopoverChildrenProps = {
  /**
   * Function to close popover
   */
  close: () => void;
};

export type PopoverProps = {
  /**
   * Event name to handle on trigger.
   * Optionaly can contain namespace for grouping multiple popovers.
   * Example: click.myNamespace
   */
  event?: 'click' | 'hover' | 'focus';
  /**
   * Popover placement
   */
  placement?: Placement;
  /**
   * Popover offset from trigger
   */
  offset?: {
    top?: number;
    left?: number;
  };
  /**
   * If true - popover width always will be the same as trigger`s
   */
  isEqualWidth?: boolean;
  /**
   * If parent - popover will render after trigger, otherwise in body`s end
   */
  appendTo?: 'viewport' | 'parent';
  /**
   * Optional close handler
   */
  onClose?: () => void;
  isOpenPopover?: boolean;
};

export type PopoverEventerChildrenProps = {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLDivElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  close: () => void;
};

export type PopoverEventerProps = {
  event: 'click' | 'hover' | 'focus';
  onClose?: PopoverProps['onClose'];
  children: React.FC<PopoverEventerChildrenProps>;
  isOpenPopover: boolean;
};

export type PopoverTriggerChildrenParams = {
  isOpen: PopoverTriggerProps['isOpen'];
};

export type PopoverTriggerProps = {
  className?: string;
  isOpen: boolean;
  triggerRef: React.RefObject<Element>;
  tagName?: keyof JSX.IntrinsicElements;
  children: React.ReactNode | React.FC<PopoverTriggerChildrenParams>;
};

export type PopoverContentChildrenParams = {
  close: PopoverContentProps['close'];
};

export type PopoverContentProps = {
  popoverRef: PopoverEventerChildrenProps['popoverRef'];
  triggerRef: PopoverEventerChildrenProps['triggerRef'];
  placement: Placement;
  offset: PopoverProps['offset'];
  isEqualWidth: PopoverProps['isEqualWidth'];
  className?: string;
  close: () => void;
  children: React.ReactNode | React.FC<PopoverContentChildrenParams>;
  isTransition?: boolean;
  appendTo: 'viewport' | 'parent';
};

export type PopoverContentRef = PopoverEventerChildrenProps['popoverRef'];
