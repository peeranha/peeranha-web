import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_WARNING, LANDING_FONT } from 'style-constants';

import Input from 'components/Input/LandingInput';
import WarningMessage from 'components/FormFields/WarningMessage';

const Message = styled.div`
  * {
    color: ${TEXT_WARNING} !important;
    font-size: 12px !important;
    font-family: ${LANDING_FONT};
    font-style: normal !important;
    letter-spacing: 0.3px;
  }
`;

const DefaultInput = /* istanbul ignore next */ ({ input, disabled, meta }) => (
  <div className="d-flex flex-column">
    <Input
      {...input}
      type="text"
      placeholder="Email"
      disabled={disabled}
      error={meta.touched && meta.error}
      warning={meta.touched && meta.warning}
    />

    <Message className="my-1">
      <WarningMessage {...meta} />
    </Message>
  </div>
);

DefaultInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
};

export { Message };
export default DefaultInput;
