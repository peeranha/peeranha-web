import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';

import seacrhIcon from 'images/search.svg?external';
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
  let src = null;

  if (isSearchable) {
    src = value ? closeIcon : seacrhIcon;
  } else if (isRefreshable) {
    src = refreshIcon;
  } else if (isPassword[0] && !isPassword[1]) {
    src = eyeClosedIcon;
  } else if (isPassword[0] && isPassword[1]) {
    src = eyeOpenedIcon;
  } else {
    return null;
  }

  return (
    <button onClick={onClick || null} type="button" tabIndex="-1">
      <IconMd icon={src} color={TEXT_SECONDARY_LIGHT} />
    </button>
  );
};

class Input extends React.PureComponent {
  state = {
    isText: false,
  };

  changeType = () => {
    this.setState({ isText: !this.state.isText });
  };

  render() {
    const {
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
    } = this.props;

    return (
      <InputStyled
        error={error}
        isText={this.state.isText}
        className={className}
      >
        <input
          {...input}
          readOnly={readOnly}
          type={this.state.isText ? 'text' : type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
        />

        <Handler
          value={input.value}
          isSearchable={isSearchable}
          isRefreshable={isRefreshable}
          isPassword={[type === 'password', this.state.isText]}
          onClick={type === 'password' ? this.changeType : onClick}
        />
      </InputStyled>
    );
  }
}

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
