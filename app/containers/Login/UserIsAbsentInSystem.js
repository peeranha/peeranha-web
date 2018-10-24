import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const UserIsAbsentInSystem = props => (
  <div>
    <p>
      <FormattedMessage {...messages.header} />
    </p>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.selectAnotherIdentity}
    >
      <FormattedMessage {...messages.selectAnotherIdentity} />
    </button>
    <p className="border-or-top-2 my-1">or</p>
    <button
      className="btn btn-link w-100 d-block my-1 mx-auto py-2"
      onClick={props.backToOptions}
    >
      <small>
        {'< '} <FormattedMessage {...messages.requirementToSignUp} />
      </small>
    </button>
  </div>
);

UserIsAbsentInSystem.propTypes = {
  selectAnotherIdentity: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default UserIsAbsentInSystem;
