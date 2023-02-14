import React, { HTMLInputTypeAttribute } from 'react';
import { styles } from './ToggleSwitchField.styled';

type ToggleSwitchProps = {
  input: HTMLInputTypeAttribute;
};

const ToggleSwitchField: React.FC<ToggleSwitchProps> = ({
  input,
}): JSX.Element => (
  <label css={styles.toggleSwitch}>
    <input type="checkbox" {...input} />
    <span css={styles.switch} />
  </label>
);
export default ToggleSwitchField;
