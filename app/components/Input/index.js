import React from 'react';
import PropTypes from 'prop-types';

import seacrhIcon from 'svg/search';
import Icon from 'components/Icon';

import InputStyled from './InputStyled';

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

        {isSearchable && <Icon icon={seacrhIcon} noMargin />}

        {type === 'password' && (
          <Icon onClick={this.changeType} icon={seacrhIcon} noMargin />
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
