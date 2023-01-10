import React from 'react';
import { css } from '@emotion/react';
import { styled } from './ToogleSwitch.styled';

type ToggleSwitchProps = {
  isToggled: Boolean;
  setIsToggled: (isToggled: Boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isToggled,
  setIsToggled,
}): JSX.Element => {
  const onToggle = () => setIsToggled(!isToggled);
  return (
    <label css={styled.toggleSwitch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span css={styled.switch} />
    </label>
  );
};
export default ToggleSwitch;
