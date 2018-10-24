import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const LoginOptions = props => (
  <div>
    <button
      className="btn btn-secondary w-100 py-3 mb-4"
      onClick={props.continueLogin}
    >
      <FormattedMessage {...messages.loginWithScatter} />
    </button>
    <p className="mx-2 mb-0 pt-2 border-top-2">
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
