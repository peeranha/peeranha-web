import React from 'react';
import PropTypes from 'prop-types';

const UserProfileNav = props => (
  <button
    onClick={props.pushToProfile}
    className="btn btn-secondary my-2 my-sm-0"
  >
    Profile
  </button>
);

UserProfileNav.propTypes = {
  pushToProfile: PropTypes.func.isRequired,
};

export default UserProfileNav;
