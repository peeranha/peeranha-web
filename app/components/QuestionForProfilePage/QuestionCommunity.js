import React from 'react';
import PropTypes from 'prop-types';
import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import * as routes from 'routes-config';

import A, { ADefault } from 'components/A';
import Span from 'components/Span';
import Img from 'components/Img';

import { POST_TYPE } from 'utils/constants';

const single = isSingleCommunityWebsite();

const getRouteByPostType = (postType, isFeed, communityId = 0) => {
  if (isFeed) {
    return routes.feed(communityId);
  }
  if (postType === POST_TYPE.tutorial) {
    return routes.tutorials(communityId);
  }
  if (postType === POST_TYPE.expertPost) {
    return routes.expertPosts(communityId);
  }
  return routes.questions(communityId);
};

const QuestionCommunity = ({
  communities,
  communityId,
  className,
  postType,
  isFeed = false,
}) => {
  if (!communities[0]) {
    return null;
  }

  const com = getFollowedCommunities(communities, [+communityId])[0] || {};
  let route = null;
  let Link = A;
  if (single && communityId !== single) {
    route = `${process.env.APP_LOCATION}${getRouteByPostType(
      postType,
      isFeed,
      communityId,
    )}`;
    Link = ADefault;
  } else if (single && communityId === single) {
    route = getRouteByPostType(postType, isFeed);
  } else if (!single) {
    route = getRouteByPostType(postType, isFeed, communityId);
  }

  return (
    <Link
      to={route}
      href={route}
      className={`d-flex align-items-center ${className}`}
    >
      <Img className="mr-1" src={com.avatar} alt="comm_avatar" />
      <Span font-size="14">{com.name}</Span>
    </Link>
  );
};

QuestionCommunity.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  postType: PropTypes.number,
  isFeed: PropTypes.bool,
};

export default QuestionCommunity;
