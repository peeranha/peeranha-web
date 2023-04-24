import React, { useCallback } from 'react';
import { reduxForm, reset } from 'redux-form/immutable';
import { styled } from './ToogleSwitch.styled';
import { EMAIL_FORM } from 'containers/EmailNotifications/constants';

type ToggleSwitchProps = {
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
  unsubscribeEmail: (subscribe: boolean) => void;
  dispatch: () => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isToggled,
  setIsToggled,
  unsubscribeEmail,
  dispatch,
}): JSX.Element => {
  const onToggle = useCallback(() => {
    setIsToggled(!isToggled);
    isToggled ? unsubscribeEmail(false) : unsubscribeEmail(true);
    dispatch(reset(EMAIL_FORM));
  }, [isToggled]);

  return (
    <label css={styled.toggleSwitch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span css={styled.switch} />
    </label>
  );
};

export default reduxForm({
  form: EMAIL_FORM,
})(ToggleSwitch);
