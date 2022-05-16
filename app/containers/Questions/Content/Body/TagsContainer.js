import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import Tags from 'components/TagsList';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';

const single = isSingleCommunityWebsite();

const TagsContainer = ({ communities, communityId, tags }) => (
  <div className="d-flex align-items-center flex-wrap">
    <Tags
      className="my-1"
      tags={tags}
      communityId={communityId}
      communities={communities}
    >
      {!single ? (
        <QuestionCommunity
          className="my-1"
          communities={communities}
          communityId={communityId}
        />
      ) : null}
    </Tags>
  </div>
);

TagsContainer.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
};

export default memo(TagsContainer);
