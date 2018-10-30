import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const IdentityIsRegistred = props => (
  <div>
    <p className="mx-3">
      <FormattedMessage {...messages.selectedIdentity} />
      {` <${props.account}> `}
      <FormattedMessage {...messages.isAlreadyRegistred} />
    </p>
    <hr />
    <button
      onClick={props.continueLogin}
      className="w-100 btn btn-secondary py-2"
    >
      <FormattedMessage {...messages.loginWith} />
      {` <${props.account}> `}
      <FormattedMessage {...messages.identity} />
    </button>
    <hr />
    <button onClick={props.backToOptions} className="w-100 btn btn-link">
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
