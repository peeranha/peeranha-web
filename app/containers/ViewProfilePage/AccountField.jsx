import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/Input';

const Div = styled.div`
  display: flex;
  justify-items: center;
  width: 100%;
  max-width: 355px;
  margin-right: 0 !important;

  input {
    padding-right: 14px;
  }
`;

const AccountField = ({ input, meta, disabled }) => (
  <Div>
    <Input
      input={input}
      disabled={disabled}
      error={meta.touched && (meta.error || meta.warning)}
    />
  </Div>
);

AccountField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  disabled: PropTypes.bool,
};

export default AccountField;
