import React from 'react';
import PropTypes from 'prop-types';
import messages from './messages';

const FollowCommunityButton = ({
  communityIdFilter,
  followedCommunities,
  followHandler,
  translations,
}) => {
  if (!followedCommunities) return null;

  const isFollowed = followedCommunities.includes(communityIdFilter);

  return communityIdFilter > 0 ? (
    <button
      className="btn btn-secondary ml-1"
      data-isfollowed={isFollowed}
      onClick={followHandler}
    >
      {isFollowed
        ? translations[messages.unfollow.id]
        : translations[messages.follow.id]}
    </button>
  ) : null;
};

FollowCommunityButton.propTypes = {
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  followHandler: PropTypes.func,
  translations: PropTypes.object,
};

export default FollowCommunityButton;
