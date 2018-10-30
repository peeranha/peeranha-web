import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const SignUpOptions = props => (
  <div>
    <button
      className="btn btn-secondary w-100 py-3"
      onClick={props.continueSignUp}
    >
      <FormattedMessage {...messages.signUpWith} />
    </button>
    <hr />
    <p className="mb-0">
      <FormattedMessage {...messages.alreadyHaveAcc} />
      <button onClick={props.backToOptions} className="btn btn-link">
        <FormattedMessage {...messages.login} />
      </button>
    </p>
  </div>
);

SignUpOptions.propTypes = {
  backToOptions: PropTypes.func.isRequired,
  continueSignUp: PropTypes.func.isRequired,
};

export default SignUpOptions;
