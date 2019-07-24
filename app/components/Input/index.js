import React from 'react';
import PropTypes from 'prop-types';

import seacrhIcon from 'images/search.svg?inline';
import refreshIcon from 'images/reload.svg?inline';
import eyeOpenedIcon from 'images/eyeOpened.svg?inline';
import eyeClosedIcon from 'images/eyeСlosed.svg?inline';

import InputStyled from './InputStyled';

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Handler = /* istanbul ignore next */ ({
  isRefreshable,
  isSearchable,
  isPassword,
  onClick,
}) => {
  let src = null;

  if (isSearchable) {
    src = seacrhIcon;
  } else if (isRefreshable) {
    src = refreshIcon;
  } else if (isPassword[0] && !isPassword[1]) {
    src = eyeClosedIcon;
  } else if (isPassword[0] && isPassword[1]) {
    src = eyeOpenedIcon;
  } else {
    return null;
  }

  return <img onClick={onClick || null} src={src} alt="icon" />;
};

class Input extends React.PureComponent {
  state = {
    isText: false,
  };

  changeType = /* istanbul ignore next */ () => {
    this.setState({ isText: !this.state.isText });
  };

  render() /* istanbul ignore next */ {
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
        />

        <Handler
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
  isSearchable: PropTypes.bool,
  isRefreshable: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
};

Handler.propTypes = {
  isRefreshable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isPassword: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Input;
