import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import messages from './messages';

const Wrapper = styled.div`
  * {
    font-family: OpenSans;
    text-transform: none;
    letter-spacing: -0.9px;
  }

  h6 {
    margin: 9px 0;
    text-align: left !important;

    * {
      font-size: 14px !important;
      letter-spacing: -0.5px !important;
      color: #fc6655;
    }
  }

  .default-input {
    width: 100%;
    color: #000000;
    font-size: 18px;
    color: #282828;
    height: 48px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    padding: 0 24px;
    background: #fff;

    ::placeholder {
      color: #9b9b9b;
    }

    :focus {
      border-color: #5c78d7;
    }
  }

  .default-input.default-input-error {
    border-color: #fc6655 !important;
  }

  .floating-label-input {
    height: 48px;
    width: 100%;

    * ::after {
      border-bottom: 2px solid #fc6655;
    }

    * ::before {
      border-bottom: 2px solid #e6e6e6;
    }

    label {
      font-size: 14px;
      color: #9b9b9b;
      font-family: OpenSans;
      z-index: 10;
    }

    input {
      color: #000000;
      font-size: 16px;
      font-family: OpenSans;
      color: #282828;
      padding: 0;
      width: 100%;
      height: 48px;
      background: transparent;

      ::placeholder {
        color: #9b9b9b;
      }
    }

    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #fff inset;
    }

    + .menu-items {
      display: none;
      box-shadow: 0 0 10px #e6e6e6;
      margin-top: 10px;

      li {
        font-size: 14px;
        font-family: OpenSans;
        color: #282828;
        padding: 10px 21px;

        :hover {
          cursor: pointer;
          background: #e6e6e6;
        }
      }
    }
  }

  .floating-label-input.show-menu + ul {
    display: block;
  }

  .contained-button {
    width: 100%;
    height: 48px;
    font-family: OpenSans;
    font-size: 18px;
    background-color: #fc6655;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;

    :hover {
      background-color: #fc6655;
    }
  }
`;

export const ContainedButton = ({
  content,
  type = 'button',
  onClick,
  disabled,
}) => (
  <Wrapper className="contained-button-wrapper">
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      className="contained-button"
      disabled={disabled}
    >
      {content}
    </Button>
  </Wrapper>
);

ContainedButton.propTypes = {
  content: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export const DefaultInput = ({
  input,
  disabled,
  meta: { touched, error, warning },
}) => (
  <Wrapper>
    <input
      {...input}
      type="text"
      className={`default-input ${touched &&
        (warning || error) &&
        'default-input-error'}`}
      placeholder="Your email address"
      disabled={disabled}
    />
    <h6 className="text-danger">
      {touched &&
        ((error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />))}
    </h6>
  </Wrapper>
);

DefaultInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
};

export const FloatingLabelInput = ({
  input,
  label,
  disabled,
  meta: { touched, error, warning },
}) => (
  <Wrapper className="floating-label-input-wrapper">
    <TextField
      {...input}
      className="floating-label-input"
      label={label}
      disabled={disabled}
      error={touched && (warning || error)}
    />
    <h6 className="text-danger">
      {touched &&
        ((error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />))}
    </h6>
  </Wrapper>
);

FloatingLabelInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
export const SelectItem = ({
  input,
  change,
  items,
  label,
  disabled,
  meta: { touched, error, warning },
}) => (
  <Wrapper className="floating-label-input-wrapper select-item">
    <TextField
      {...input}
      id={`${input.name}_input`}
      className="floating-label-input"
      label={label}
      disabled={disabled}
      error={touched && (warning || error)}
      onChange={null}
      onFocus={() => window.$(`#${input.name}`).css({ display: 'block' })}
      onBlur={() =>
        setTimeout(
          () => window.$(`#${input.name}`).css({ display: 'none' }),
          250,
        )
      }
    />
    <ul className="menu-items" id={input.name}>
      <li onClick={() => change([input.name], '')}>
        <FormattedMessage {...messages.none} />
      </li>
      {items.map(x => <li onClick={() => change([input.name], x)}>{x}</li>)}
    </ul>
    <h6 className="text-danger">
      {touched &&
        ((error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />))}
    </h6>
  </Wrapper>
);

SelectItem.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  change: PropTypes.func,
  items: PropTypes.array,
};
