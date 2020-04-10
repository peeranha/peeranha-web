import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/Input';
import WarningMessage from '../../components/FormFields/WarningMessage';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  max-width: 355px;
  margin-right: 0 !important;

  input {
    padding-right: 14px;
  }

  > div:nth-child(2) {
    margin-top: 10px;
  }
`;

const AccountField = ({ input, meta, disabled }) => {
  if (meta.error && meta.error.size) {
    // eslint-disable-next-line no-param-reassign
    meta.error = {
      id: meta.error.get('id'),
    };
  }

  return (
    <Div>
      <Input
        input={input}
        disabled={disabled}
        error={meta.touched && (meta.error || meta.warning)}
      />
      {meta && <WarningMessage {...meta} />}
    </Div>
  );
};

AccountField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  disabled: PropTypes.bool,
};

export default AccountField;
