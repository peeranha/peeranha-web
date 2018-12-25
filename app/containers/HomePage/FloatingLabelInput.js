import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';

export const Wrapper = styled.div`
  * {
    font-family: OpenSans, sans-serif;
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
    height: ${props => (props.multiline ? 'auto' : '48px')};
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
      font-family: OpenSans, sans-serif;
      z-index: 10;
    }

    input {
      font-size: 16px;
      font-family: OpenSans, sans-serif;
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
  }
`;

export const FloatingLabelInput = /* istanbul ignore next */ ({
  input,
  label,
  disabled,
  multiline,
  meta: { touched, error, warning },
}) => (
  <Wrapper className="floating-label-input-wrapper" multiline={multiline}>
    <TextField
      {...input}
      multiline={multiline}
      rowsMax="10"
      className="floating-label-input"
      label={label}
      disabled={disabled}
      error={!!(touched && (warning || error))}
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
  multiline: PropTypes.bool,
  label: PropTypes.element,
};

export default FloatingLabelInput;
