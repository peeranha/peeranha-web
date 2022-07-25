import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';

import SearchFeedIcon from 'icons/SearchFeed';
import ChangeTypeIcon from 'icons/ChangeType';
import EyeOpenedIcon from 'icons/EyeOpened';
import EyeClosedIcon from 'icons/EyeClosed';

import InputStyled from './InputStyled';

const Handler = ({ isRefreshable, isSearchable, isPassword, onClick }) => {
  const icon = useMemo(
    () => {
      if (isSearchable) {
        return <SearchFeedIcon fill={TEXT_SECONDARY_LIGHT} />;
      } else if (isRefreshable) {
        return <ChangeTypeIcon stroke={TEXT_SECONDARY_LIGHT} size={[18, 18]} />;
      } else if (isPassword[0] && !isPassword[1]) {
        return <EyeClosedIcon fill={TEXT_SECONDARY_LIGHT} />;
      } else if (isPassword[0] && isPassword[1]) {
        return <EyeOpenedIcon fill={TEXT_SECONDARY_LIGHT} />;
      }
      return null;
    },
    [isSearchable, isRefreshable, isPassword],
  );

  return icon ? (
    <button onMouseDown={onClick || null} type="button" tabIndex="-1">
      {icon}
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
