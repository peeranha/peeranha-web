import React from 'react';
import PropTypes from 'prop-types';
import { getFollowedCommunities } from 'utils/communityManagement';

import Span from 'components/Span';
import Img from 'components/Img';

const QuestionCommunity = ({ communities, communityId, className }) => {
  if (!communities[0]) {
    return null;
  }

  const com = getFollowedCommunities(communities, [communityId])[0];

  return (
    <Span className={`d-flex align-items-center ${className}`} fontSize="14">
      <Img className="mr-1" src={com.avatar} alt="comm_avatar" />
      <span>{com.name}</span>
    </Span>
  );
};

QuestionCommunity.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default QuestionCommunity;
