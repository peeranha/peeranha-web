import React from 'react';
import PropTypes from 'prop-types';
import Button from 'containers/Button';

import Wrapper from './Wrapper';
import { COMPLETE_LOGIN } from './constants';

const SignUpPopup = props => (
  <Wrapper>
    <button
      className="btn btn-secondary w-100 py-3 mb-4"
      onClick={props.children}
    >
      Sign up with Scatter
    </button>
    <p className="mx-2 mb-0 pt-2 border-top-2">
      <span>Already have Peerania account?</span>
      <Button
        complete={COMPLETE_LOGIN}
        buttonClass="btn btn-link"
        buttonContent="Log in"
      />
    </p>
  </Wrapper>
);

SignUpPopup.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SignUpPopup;
