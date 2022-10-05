import React from 'react';
import cn from 'classnames';
import { css } from '@emotion/react';
import FaqIcon from 'icons/Faq';
import classes from '../Dropdown.styled';
import { MutableOption } from '../Dropdown';

type DropdownOptionProps = {
  option: MutableOption;
  isMultiple: boolean;
  onClick: () => void;
};

// TODO: Ripple effect on click

const DropdownOption: React.FC<DropdownOptionProps> = ({
  option,
  isMultiple,
  onClick,
}) => {
  const clickHandler = (): void => {
    if (!option.isDisabled) {
      onClick();
    }
  };
  return (
    <li
      className="df aic cup pt0 pr16 pb0 pl16"
      css={css({
        ...classes.option,
        ...(option.isActive && classes.active),
        ...(option.isDisabled && classes.disabled),
      })}
      onClick={clickHandler}
    >
      {(option.render instanceof Function
        ? option.render(option)
        : option.render) || (
        <>
          {option.icon && (
            <span className={cn('mr8 dropdown-icon')} css={classes.icon}>
              {option.icon}
            </span>
          )}
          <span>{option.label}</span>
        </>
      )}
      {isMultiple && (
        <span className="dropdown-multiple" css={classes.multiple}>
          <FaqIcon />
        </span>
      )}
    </li>
  );
};

export default DropdownOption;
