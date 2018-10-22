import React from 'react';
import PropTypes from 'prop-types';

const UserIsAbsentInSystem = props => (
  <div>
    <p>No Peerania account exists for selected identity.</p>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.selectAnotherIdentity}
    >
      Select another identity
    </button>
    <p className="border-or-top-2 my-1">or</p>
    <button
      className="btn btn-link w-100 d-block my-1 mx-auto py-2"
      onClick={props.backToOptions}
    >
      <small>{'< '} Sign Up for Peerania account</small>
    </button>
  </div>
);

UserIsAbsentInSystem.propTypes = {
  selectAnotherIdentity: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default UserIsAbsentInSystem;
