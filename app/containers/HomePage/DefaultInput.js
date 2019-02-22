import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { LANDING_FONT } from 'style-constants';

const Wrapper = styled.div`
  * {
    font-family: ${LANDING_FONT};
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
`;

const DefaultInput = /* istanbul ignore next */ ({
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

export default DefaultInput;
