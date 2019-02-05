import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputStyled from './InputStyled';

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

        {isSearchable && (
          <FontAwesomeIcon className="chevron search" icon="search" />
        )}

        {type === 'password' && (
          <FontAwesomeIcon
            onClick={this.changeType}
            className="chevron eye"
            icon="eye"
          />
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
