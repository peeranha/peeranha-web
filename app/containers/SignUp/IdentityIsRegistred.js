import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const IdentityIsRegistred = props => (
  <div>
    <p className="border-bottom-2 pb-3 mx-3">
      <FormattedMessage {...messages.selectedIdentity} />
      {` <${props.account}> `}
      <FormattedMessage {...messages.isAlreadyRegistred} />
    </p>
    <button
      onClick={props.continueLogin}
      className="w-100 btn btn-secondary py-2 my-2"
    >
      <FormattedMessage {...messages.loginWith} />
      {` <${props.account}> `}
      <FormattedMessage {...messages.identity} />
    </button>
    <p className="border-or-top-2 my-2">
      <FormattedMessage {...messages.or} />
    </p>
    <button onClick={props.backToOptions} className="w-100 btn btn-link py-2">
      <small>
        {'< '} <FormattedMessage {...messages.backToSignUpOptions} />
      </small>
    </button>
  </div>
);

IdentityIsRegistred.propTypes = {
  account: PropTypes.string.isRequired,
  continueLogin: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default IdentityIsRegistred;
