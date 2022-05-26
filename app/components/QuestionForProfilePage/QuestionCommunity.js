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

const single = isSingleCommunityWebsite();

const QuestionCommunity = ({
  communities,
  communityId,
  className,
  isFeed,
  isGeneral,
  isExpert,
}) => {
  if (!communities[0]) {
    return null;
  }

  const com = getFollowedCommunities(communities, [+communityId])[0] || {};
  let route = null;
  let Link = A;
  if (single && communityId !== single) {
    route = `${process.env.APP_LOCATION}${routes.feed(communityId)}`;
    Link = ADefault;
  } else if (single && communityId === single) {
    route = routes.feed();
  } else if (!single) {
    route = routes.feed(communityId);
  }

  if (!isFeed) {
    route = routes.tutorials(communityId);

    if (isGeneral) {
      route = routes.questions(communityId);
    }
    if (isExpert) {
      route = routes.expertPosts(communityId);
    }
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
  isFeed: PropTypes.bool,
  isGeneral: PropTypes.bool,
  isExpert: PropTypes.bool,
};

export default QuestionCommunity;
