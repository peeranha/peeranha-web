import React from 'react';
import Portal from '../Portal';
import { PopoverProps } from './types';
import PopoverEventer from './PopoverEventer/PopoverEventer';
import PopoverContent from './PopoverContent/PopoverContent';
import PopoverTrigger from './PopoverTrigger/PopoverTrigger';

const Popover: React.FC<PopoverProps> & {
  Trigger: React.FC<
    Pick<React.ComponentProps<typeof PopoverTrigger>, 'className' | 'tagName'>
  >;
  Content: React.FC<
    Pick<React.ComponentProps<typeof PopoverContent>, 'className'>
  >;
} = ({
  children,
  event = 'click',
  placement,
  offset,
  isEqualWidth = false,
  appendTo = 'viewport',
  onClose,
  isOpenPopover = false,
}) => {
  let TriggerComponent;
  let ContentComponent;

  React.Children.toArray(children).forEach((child: React.ReactElement) => {
    if (child.type === PopoverTrigger) {
      TriggerComponent = child;
    }

    if (child.type === PopoverContent) {
      ContentComponent = child;
    }
  });

  if (!TriggerComponent || !ContentComponent) {
    throw new Error(
      'Children Popover.Trigger or Popover.Content don`t present',
    );
  }

  return (
    <PopoverEventer
      event={event}
      onClose={onClose}
      isOpenPopover={isOpenPopover}
    >
      {({ isOpen, close, triggerRef, popoverRef }): React.ReactElement => (
        <>
          {React.cloneElement(TriggerComponent, {
            isOpen,
            triggerRef,
          })}
          {isOpen && (
            <Portal
              isFixedBody={false}
              appendTo={
                appendTo === 'parent' && triggerRef.current
                  ? triggerRef.current
                  : undefined
              }
            >
              {React.cloneElement(ContentComponent, {
                triggerRef,
                popoverRef,
                placement,
                offset,
                isEqualWidth,
                close,
                appendTo,
              })}
            </Portal>
          )}
        </>
      )}
    </PopoverEventer>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
