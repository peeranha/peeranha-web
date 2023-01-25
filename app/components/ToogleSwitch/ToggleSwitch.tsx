import React from 'react';
import { styled } from './ToogleSwitch.styled';

type ToggleSwitchProps = {
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
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
