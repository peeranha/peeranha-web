import React, { useState } from 'react';
import { css } from '@emotion/react';
import cn from 'classnames';
import Tick from 'icons/Tick';
import { styles } from './Checkbox.styled';

type CheckboxProps = {
  children?: string;
  onChange?: () => void;
  isChecked?: boolean;
  className?: string;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  onChange,
  isChecked = false,
  className,
  disabled = false,
}): JSX.Element => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    if (onChange) {
      onChange();
    }
    setChecked(!checked);
  };

  return (
    <label
      className={cn('aic pr cup dif', className)}
      css={css(disabled && styles.disabled)}
    >
      <div className={cn('p8 full-br')}>
        <input
          type="checkbox"
          className={cn('dn')}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span
          className={cn('border-box df aic jcc')}
          css={css(styles.checkbox, checked && styles.checked)}
        >
          {checked && <Tick fill="white" />}
        </span>
      </div>
      <div>{children}</div>
    </label>
  );
};

export default Checkbox;
