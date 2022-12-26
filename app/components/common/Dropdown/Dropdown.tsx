import React, { useMemo, useState } from 'react';
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
import Input from 'components/Input';
import styled from 'styled-components';
import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';
import { Styles } from 'components/Input/InputStyled';

import {
  BG_LIGHT,
  BORDER_PRIMARY_RGB,
  BORDER_WARNING_LIGHT_RGB,
} from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

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
  /**
   * Is dropdown has search field
   */
  isSearchable?: boolean;
  /**
   * Class name for dropdown button
   */
  triggerClassName?: string;
  appendTo?: 'viewport' | 'parent';
  zIndex?: string;
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
};

const InputStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  transition: 0.5s;
  flex: 1;

  input {
    ${Styles};
  }
`;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder,
  isMultiple = false,
  isDisabled = false,
  isInvalid = false,
  isSearchable = false,
  className,
  triggerClassName,
  onSelect,
  trigger,
  isEqualWidth,
  appendTo = 'viewport',
  zIndex,
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

  const onOptionClick =
    ({ close }: OnOptionClickParams) =>
    (option: MutableOption) => {
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
  const [searchValue, setSearchValue] = useState();
  const filterOptions = (options) =>
    options.filter((option) =>
      searchValue && typeof option.label === 'string'
        ? option.label
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        : true,
    );

  return (
    <Popover
      isEqualWidth={typeof isEqualWidth !== undefined ? isEqualWidth : true}
      offset={{ top: 4 }}
      appendTo={appendTo}
      zIndex={zIndex}
    >
      <Popover.Trigger className={triggerClassName}>
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
            {isSearchable && (
              <div
                css={css`
                  padding: 5px;
                `}
              >
                <InputStyled>
                  <input
                    onChange={(event: {
                      target: { value: React.SetStateAction<undefined> };
                    }) => setSearchValue(event.target.value)}
                    placeholder={'search'}
                    type={'text'}
                  />
                </InputStyled>
              </div>
            )}

            {filterOptions(items).map((option: MutableOption) => (
              <DropdownOption
                key={option.value}
                option={option}
                isMultiple={isMultiple}
                onClick={onOptionClick({ close })}
              />
            ))}
          </ul>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default Dropdown;
