import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Tags from 'components/Tags';
import FollowCommunityButton from 'containers/FollowCommunityButton';

const CommunitiesView = ({ communities }) => (
  <div>
    {_.orderBy(communities, y => y.popularity, ['desc']).map(x => (
      <div
        style={{ boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}
        className="mb-2 p-2"
        key={x.value}
      >
        <div className="mb-1 d-flex justify-content-between align-items-center">
          <span>{x.label}</span>
          <FollowCommunityButton communityIdFilter={x.id} />
        </div>
        <Tags communities={communities} communityId={x.value} />
      </div>
    ))}
  </div>
);

CommunitiesView.propTypes = {
  communities: PropTypes.array.isRequired,
};

export default CommunitiesView;
