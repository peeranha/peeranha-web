import React from 'react';
import PropTypes from 'prop-types';

import seacrhIcon from 'images/search.svg?inline';

import InputStyled from './InputStyled';

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

class Input extends React.PureComponent {
  state = {
    isText: false,
  };

  changeType = /* istanbul ignore next */ () => {
    this.setState({ isText: !this.state.isText });
  };

  /* istanbul ignore next */
  render() {
    const {
      input = {},
      type,
      placeholder,
      isSearchable,
      disabled,
      className,
      error,
      readOnly,
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

        {isSearchable && <img src={seacrhIcon} alt="icon" />}

        {type === 'password' && (
          <img onClick={this.changeType} src={seacrhIcon} alt="icon" />
        )}
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
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default Input;
