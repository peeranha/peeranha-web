import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/Input';

const Div = styled.div`
  width: 355px;
  margin-right: 0 !important;

  input {
    padding-right: 14px;
  }

  @media only screen and (max-width: 660px) {
    width: 100%;
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
