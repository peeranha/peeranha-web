import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getFormattedNum } from 'utils/numbers';
import * as routes from 'routes-config';

const UserInfo = props => (
  <div className="user-info">
    <div className="user-avatar-block">
      <Link
        to={routes.profileView(props.account)}
        href={routes.profileView(props.account)}
      >
        <img className="avatar" src={props.avatar} alt="" />
      </Link>
    </div>
    <div className="rating-name-block">
      <p className="name">
        <Link
          to={routes.profileView(props.account)}
          href={routes.profileView(props.account)}
        >
          {props.name}
        </Link>
      </p>
      <p className="rating">{getFormattedNum(props.rating)}</p>
    </div>
  </div>
);

UserInfo.propTypes = {
  account: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
};

export default UserInfo;
