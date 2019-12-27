import React from 'react';
import PropTypes from 'prop-types';
import { getFollowedCommunities } from 'utils/communityManagement';

import * as routes from 'routes-config';

import A from 'components/A';
import Span from 'components/Span';
import Img from 'components/Img';

const QuestionCommunity = ({ communities, communityId, className }) => {
  if (!communities[0]) {
    return null;
  }

  const com = getFollowedCommunities(communities, [communityId])[0];

  return (
    <A
      to={routes.questions(communityId)}
      className={`d-flex align-items-center ${className}`}
    >
      <Img className="mr-1" src={com.avatar} alt="comm_avatar" />
      <Span font-size="14">{com.name}</Span>
    </A>
  );
};

QuestionCommunity.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default QuestionCommunity;
