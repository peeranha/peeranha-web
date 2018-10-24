import React from 'react';
import PropTypes from 'prop-types';

const IdentityIsRegistred = props => (
  <div>
    <p className="border-bottom-2 pb-3 mx-3">
      Selected identity {`<${props.account}>`} is already registred
    </p>
    <button
      onClick={props.continueLogin}
      className="w-100 btn btn-secondary py-2 my-2"
    >
      Login with {`<${props.account}>`} identity
    </button>
    <p className="border-or-top-2 my-2">or</p>
    <button onClick={props.backToOptions} className="w-100 btn btn-link py-2">
      <small>{'< '}Back to Sign Up options</small>
    </button>
  </div>
);

IdentityIsRegistred.propTypes = {
  account: PropTypes.string.isRequired,
  continueLogin: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default IdentityIsRegistred;
