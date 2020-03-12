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

const AccountField = ({ input, meta }) => (
  <Div>
    <Input input={input} error={meta.touched && (meta.error || meta.warning)} />
  </Div>
);

AccountField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default AccountField;
