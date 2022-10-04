import React from 'react';
import cn from 'classnames';
import Check from 'citrus-ui/core/icons/Check';
import useStyles from '../Dropdown.styled';
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
  const classes = useStyles();
  const clickHandler = (): void => {
    if (!option.isDisabled) {
      onClick();
    }
  };
  return (
    <li
      className={cn('df aic cup pt0 pr16 pb0 pl16', classes.option, {
        [classes.active]: option.isActive,
        [classes.disabled]: option.isDisabled,
      })}
      onClick={clickHandler}
    >
      {(option.render instanceof Function
        ? option.render(option)
        : option.render) || (
        <>
          {option.icon && (
            <span className={cn('mr8', classes.icon)}>{option.icon}</span>
          )}
          <span>{option.label}</span>
        </>
      )}
      {isMultiple && (
        <span className={classes.multiple}>
          <Check />
        </span>
      )}
    </li>
  );
};

export default DropdownOption;
