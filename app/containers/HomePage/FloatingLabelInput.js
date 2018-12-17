import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';

export const Wrapper = styled.div`
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
`;

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

export default FloatingLabelInput;
