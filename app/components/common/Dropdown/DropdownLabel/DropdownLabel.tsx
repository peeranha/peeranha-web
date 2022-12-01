import React from 'react';
import cn from 'classnames';
import classes from '../Dropdown.styled';
import { MutableOption } from '../Dropdown';

type DropdownLabelProps = {
  isMultiple: boolean;
  items: MutableOption[];
};

const getOptionsLabel = (items: MutableOption[]): string =>
  items.map((option) => option.label).join(', ');

const DropdownLabel: React.FC<DropdownLabelProps> = ({
  isMultiple,
  items,
  children,
}) => (
  <>
    {children || (
      <div
        className={cn('df full-width aic dropdown-label')}
        css={classes.label}
      >
        {!isMultiple && items[0]?.icon && (
          <span
            className={cn('mr8 df jcc aic dropdown-icon')}
            css={classes.icon}
          >
            {items[0].icon}
          </span>
        )}
        <span className="line-clamp-1">{getOptionsLabel(items)}</span>
      </div>
    )}
  </>
);

export default DropdownLabel;
