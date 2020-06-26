import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';

import searchIcon from 'images/search.svg?external';
import closeIcon from 'images/close.svg?external';
import refreshIcon from 'images/reload.svg?external';
import eyeOpenedIcon from 'images/eyeOpened.svg?external';
import eyeClosedIcon from 'images/eyeСlosed.svg?external';

import { IconMd } from 'components/Icon/IconWithSizes';
import InputStyled from './InputStyled';

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Handler = ({
  isRefreshable,
  isSearchable,
  isPassword,
  onClick,
  value,
}) => {
  const src = useMemo(
    () => {
      if (isSearchable) {
        return value ? closeIcon : searchIcon;
      } else if (isRefreshable) {
        return refreshIcon;
      } else if (isPassword[0] && !isPassword[1]) {
        return eyeClosedIcon;
      } else if (isPassword[0] && isPassword[1]) {
        return eyeOpenedIcon;
      }
      return null;
    },
    [isSearchable, isRefreshable, isPassword],
  );

  return src ? (
    <button onClick={onClick || null} type="button" tabIndex="-1">
      <IconMd icon={src} color={TEXT_SECONDARY_LIGHT} />
    </button>
  ) : null;
};

const Input = ({
  input = {},
  type,
  placeholder,
  isSearchable,
  isRefreshable,
  disabled,
  className,
  error,
  readOnly,
  onClick,
  autoComplete,
}) => {
  const [isText, setIsText] = useState(false);

  const changeType = useCallback(
    () => {
      setIsText(!isText);
    },
    [isText, setIsText],
  );

  return (
    <InputStyled error={error} isText={isText} className={className}>
      <input
        {...input}
        readOnly={readOnly}
        type={isText ? 'text' : type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
      />

      <Handler
        value={input.value}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        isPassword={[type === 'password', isText]}
        onClick={type === 'password' ? changeType : onClick}
      />
    </InputStyled>
  );
};

Input.propTypes = {
  input: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  isSearchable: PropTypes.bool,
  isRefreshable: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
};

Handler.propTypes = {
  isRefreshable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isPassword: PropTypes.array,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
