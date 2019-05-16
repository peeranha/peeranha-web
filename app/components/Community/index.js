import React from 'react';
import PropTypes from 'prop-types';

const Community = ({ communities, communityId }) => {
  const community = communities.filter(x => communityId === x.id)[0];

  return (
    <div>
      <span className="badge badge-info mb-1">
        {community && community.name}
      </span>
    </div>
  );
};

Community.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Community;
