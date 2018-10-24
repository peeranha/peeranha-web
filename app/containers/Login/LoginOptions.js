import React from 'react';
import PropTypes from 'prop-types';

const LoginOptions = props => (
  <div>
    <button
      className="btn btn-secondary w-100 py-3 mb-4"
      onClick={props.continueLogin}
    >
      Log in with Scatter
    </button>
    <p className="mx-2 mb-0 pt-2 border-top-2">
      <span>Do not have an account?</span>
      <button className="btn btn-link" onClick={props.backToOptions}>
        Sign up
      </button>
    </p>
  </div>
);

LoginOptions.propTypes = {
  continueLogin: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default LoginOptions;
