import React from 'react';
import PropTypes from 'prop-types';

import Button from 'containers/Button';

import Wrapper from './Wrapper';
import { COMPLETE_SIGNUP } from './constants';

const UserIsAbsentInSystem = props => (
  <Wrapper>
    <p>No Peerania account exists for selected identity.</p>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.children.selectAnotherIdentity}
    >
      Select another identity
    </button>
    <p className="border-or-top-2 my-1">or</p>
    <Button
      complete={COMPLETE_SIGNUP}
      buttonClass="btn btn-link w-100 d-block my-1 mx-auto py-2"
      buttonContent="< Sign Up for Peerania account"
    />
  </Wrapper>
);

UserIsAbsentInSystem.propTypes = {
  children: PropTypes.object.isRequired,
};

export default UserIsAbsentInSystem;
