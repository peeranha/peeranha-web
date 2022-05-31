import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import CommunitiesSectionWithRatings from './CommunitiesSectionWithRatings';
import TopCommunitiesSection from './TopCommunitiesSection';
import * as routes from '../../routes-config';

const single = isSingleCommunityWebsite();

const TopCommunities = ({
  communities,
  profile,
  questions,
  isTopCommunitiesOnly,
}) => {
  if (!communities || !profile || !communities.length) {
    return null;
  }
  // console.log('profile', profile);
  const ref = useRef(null);
  useEffect(
    () => {
      let offset = 75;
      if (single && window.innerWidth > 576) {
        offset = 113;
      } else if (window.innerWidth < 577) {
        offset = 55;
      }

      if (window.location.hash === '#communities') {
        window.scrollTo(0, ref.current.offsetTop - offset);
      }
    },
    [window.location.hash, questions],
  );

  if (profile.ratings?.length && !isTopCommunitiesOnly) {
    return (
      <CommunitiesSectionWithRatings
        profile={profile}
        communities={communities}
        single={single}
        ref={ref}
      />
    );
  }
  return (
    <TopCommunitiesSection
      communities={communities}
      single={single}
      ref={ref}
    />
  );
};

TopCommunities.propTypes = {
  communities: PropTypes.array,
  profile: PropTypes.object,
  questions: PropTypes.array,
  isTopCommunitiesOnly: PropTypes.bool,
};

export default React.memo(TopCommunities);
