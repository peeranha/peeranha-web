import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';

const suggestedCommunitiesRoute = routes.suggestedCommunities();

const CommunitiesHeader = ({ goToCreateCommunityScreen }) => (
  <div className="d-flex justify-content-end pb-3">
    <Link to={suggestedCommunitiesRoute} href={suggestedCommunitiesRoute}>
      <button className="btn btn-secondary ml-2">Suggested communities</button>
    </Link>

    <button
      className="btn btn-secondary ml-2"
      onClick={goToCreateCommunityScreen}
      id={GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID}
    >
      Create community
    </button>
  </div>
);

CommunitiesHeader.propTypes = {
  goToCreateCommunityScreen: PropTypes.func.isRequired,
};

export default CommunitiesHeader;
