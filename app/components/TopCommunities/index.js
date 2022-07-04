import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import history from 'createdHistory';
import CommunitiesSectionWithRatings from './CommunitiesSectionWithRatings';
import TopCommunitiesSection from './TopCommunitiesSection';

const single = isSingleCommunityWebsite();

const getOffset = () => {
  if (single && window.innerWidth > 576) {
    return 113;
  }
  if (window.innerWidth < 577) {
    return 55;
  }
  return 75;
};

const TopCommunities = ({
  communities,
  profile,
  questions,
  isTopCommunitiesOnly,
}) => {
  if (!communities || !profile || !communities.length) {
    return null;
  }

  const refCommunitiesSection = useRef(null);

  useEffect(
    () => {
      if (
        history.default?.location.hash === '#communities' &&
        refCommunitiesSection.current
      ) {
        window.scrollTo(
          0,
          refCommunitiesSection.current.offsetTop - getOffset(),
        );
      }
    },
    [history.default?.location.hash, questions, refCommunitiesSection],
  );

  if (profile.ratings?.length && !isTopCommunitiesOnly) {
    return (
      <CommunitiesSectionWithRatings
        profile={profile}
        communities={communities}
        single={single}
        ref={refCommunitiesSection}
      />
    );
  }
  return (
    <TopCommunitiesSection
      communities={communities}
      single={single}
      ref={refCommunitiesSection}
    />
  );
};

TopCommunities.propTypes = {
  communities: PropTypes.array,
  profile: PropTypes.object,
  questions: PropTypes.array,
  isTopCommunitiesOnly: PropTypes.bool,
};

export default TopCommunities;
