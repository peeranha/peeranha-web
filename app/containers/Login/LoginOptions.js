import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const LoginOptions = props => (
  <div>
    <button
      className="btn btn-secondary w-100 py-3"
      onClick={props.continueLogin}
    >
      <FormattedMessage {...messages.loginWithScatter} />
    </button>
    <hr />
    <p className="mb-0">
      <FormattedMessage {...messages.doNotHaveAcc} />
      <button className="btn btn-link" onClick={props.backToOptions}>
        <FormattedMessage {...messages.signUp} />
      </button>
    </p>
  </div>
);

LoginOptions.propTypes = {
  continueLogin: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default LoginOptions;
