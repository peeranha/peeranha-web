import React, { useMemo } from 'react';
import cn from 'classnames';
import { css } from '@emotion/react';
import ArrowDownIcon from 'icons/ArrowDown';
import classes from './Dropdown.styled';
import Popover from '../Popover';
import {
  PopoverTriggerChildrenParams,
  PopoverContentChildrenParams,
} from '../Popover/types';
import DropdownLabel from './DropdownLabel';
import DropdownOption from './DropdownOption';

export type OptionValue = string | number;

export type Option = {
  label: string;
  value: OptionValue;
  isDisabled?: boolean;
  icon?: JSX.Element;
  render?: React.ReactNode | React.FC<MutableOption>;
};

export type MutableOption = Option & {
  isActive: boolean;
};

type DropdownCommonProps = {
  /**
   * Array of object with label and value fields
   */
  options: Option[];
  /**
   * Default text, when nothing is selected
   */
  placeholder?: string;
  /**
   * Is dropdown disabled
   */
  isDisabled?: boolean;
  /**
   * Is dropdown invalid
   */
  isInvalid?: boolean;
  /**
   * Class name for dropdown list
   */
  className?: string;
  trigger?: JSX.Element;
  isEqualWidth?: boolean;
};

type DropdownSingleProps = DropdownCommonProps & {
  /**
   * Allow to select multiple options.
   */
  isMultiple?: false;
  /**
   * Preselected option value
   */
  value?: OptionValue;
  /**
   * Optional select handler.
   */
  onSelect?: (value: OptionValue) => void;
};

type DropdownMultipleProps = DropdownCommonProps & {
  /**
   * Allow to select multiple options.
   */
  isMultiple: true;
  /**
   * Preselected option value
   */
  value?: OptionValue[];
  /**
   * Optional select handler.
   */
  onSelect?: (value: OptionValue[]) => void;
};

export type DropdownProps = DropdownSingleProps | DropdownMultipleProps;

type OnOptionClickParams = {
  close: PopoverContentChildrenParams['close'];
  option: MutableOption;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder,
  isMultiple = false,
  isDisabled = false,
  isInvalid = false,
  className,
  onSelect,
  trigger,
  isEqualWidth,
}) => {
  const {
    items,
    activeItems,
  }: {
    items: MutableOption[];
    activeItems: MutableOption[];
  } = useMemo(() => {
    const items = options.map((option) =>
      Array.isArray(value)
        ? {
            ...option,
            isActive: value.some((valueItem) => valueItem === option.value),
          }
        : { ...option, isActive: option.value === value },
    );

    return { items, activeItems: items.filter((item) => item.isActive) };
  }, [value, options]);

  const onOptionClick = ({ close, option }: OnOptionClickParams): void => {
    if (isDisabled) {
      return;
    }
    const isOptionActive = activeItems.some(
      (activeOption) => activeOption.value === option.value,
    );
    if (!isMultiple) {
      close();
      if (onSelect) {
        onSelect(option.value as OptionValue & OptionValue[]);
      }
      return;
    }
    const options = isOptionActive
      ? activeItems.filter(
          (activeOption) => activeOption.value !== option.value,
        )
      : [...activeItems, option];
    if (onSelect) {
      onSelect(
        options.map((option) => option.value) as OptionValue & OptionValue[],
      );
    }
  };

  return (
    <Popover
      isEqualWidth={typeof isEqualWidth !== undefined ? isEqualWidth : true}
      offset={{ top: 4 }}
    >
      <Popover.Trigger>
        {({ isOpen }: PopoverTriggerChildrenParams): JSX.Element =>
          (trigger &&
            React.cloneElement(trigger, {
              isDisabled,
              className: 'df aic cup on',
            })) || (
            <button
              className={cn('df aic cup on br10')}
              css={{
                ...classes.root,
                ...(isInvalid && classes.invalid),
              }}
              disabled={isDisabled}
            >
              {activeItems.length ? (
                <DropdownLabel items={activeItems} isMultiple={isMultiple} />
              ) : (
                placeholder && (
                  <span
                    className={cn('line-clamp-1 dropdown-placeholder')}
                    css={classes.placeholder}
                  >
                    {placeholder}
                  </span>
                )
              )}

              <ArrowDownIcon
                className="dropdown-arrow"
                css={css({ ...classes.arrow, ...(isOpen && classes.open) })}
              />
            </button>
          )
        }
      </Popover.Trigger>
      <Popover.Content
        className={cn('p0 m0 ovh br10')}
        cssProps={classes.optionsWrap}
      >
        {({ close }: PopoverContentChildrenParams): JSX.Element => (
          <ul
            className={cn(className, 'scrollbar m0 lstn pt8 pr0 pb8 pl0')}
            css={classes.options}
          >
            {items.map((option) => (
              <DropdownOption
                key={option.value}
                option={option}
                isMultiple={isMultiple}
                onClick={(): void => onOptionClick({ close, option })}
              />
            ))}
          </ul>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default Dropdown;
