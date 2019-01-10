import React from 'react';
import PropTypes from 'prop-types';

const FollowCommunityButton = ({
  communityIdFilter,
  followedCommunities,
  followHandler,
}) => {
  if (!followedCommunities) return null;

  const isFollowed = followedCommunities.includes(communityIdFilter);

  return communityIdFilter > 0 ? (
    <button
      className="btn btn-secondary ml-1"
      data-isfollowed={isFollowed}
      onClick={followHandler}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </button>
  ) : null;
};

FollowCommunityButton.propTypes = {
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  followHandler: PropTypes.func,
};

export default FollowCommunityButton;
