import React from 'react';
import PropTypes from 'prop-types';
import Button from 'containers/Button';

import Wrapper from './Wrapper';
import { COMPLETE_SIGNUP } from './constants';

const LoginPopup = props => (
  <Wrapper>
    <button
      className="btn btn-secondary w-100 py-3 mb-4"
      onClick={props.children}
    >
      Log in with Scatter
    </button>
    <p className="mx-2 mb-0 pt-2 border-top-2">
      <span>Do not have an account?</span>
      <Button
        complete={COMPLETE_SIGNUP}
        buttonClass="btn btn-link"
        buttonContent="Sign up"
      />
    </p>
  </Wrapper>
);

LoginPopup.propTypes = {
  children: PropTypes.func.isRequired,
};

export default LoginPopup;
