import React from 'react';
import PropTypes from 'prop-types';

import Button from './index';
import Wrapper from './Wrapper';

const SelectAccount = props => (
  <Wrapper>
    <p>Scatter account was not selected.</p>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.children.selectAccount}
    >
      Select identity
    </button>
    <Button
      complete={props.children.type}
      buttonClass="btn btn-link w-100 d-block mt-4 mx-auto pt-3 border-top-2"
      buttonContent="< Back to options"
    />
  </Wrapper>
);

SelectAccount.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SelectAccount;
