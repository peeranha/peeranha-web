import React from 'react';
import PropTypes from 'prop-types';

const SignUpPopup = props => (
  <div>
    <button
      className="btn btn-secondary w-100 py-3 mb-4"
      onClick={props.continueSignUp}
    >
      Sign up with Scatter
    </button>
    <p className="mx-2 mb-0 pt-2 border-top-2">
      <span>Already have Peerania account?</span>
      <button onClick={props.backToOptions} className="btn btn-link">
        Log in
      </button>
    </p>
  </div>
);

SignUpPopup.propTypes = {
  backToOptions: PropTypes.func.isRequired,
  continueSignUp: PropTypes.func.isRequired,
};

export default SignUpPopup;
