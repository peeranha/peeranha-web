import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import CreateCommunityIcon from 'icons/CreateCommunity';

import A, { ADefault } from 'components/A';
import H4 from 'components/H4';
import Span from 'components/Span';
import Grid from 'components/Grid';
import CommunityItemWithRating from './CommunityItemWithRating';

const CommunitiesSectionWithRatings = ({
  profile,
  ref,
  single,
  communities,
}) => {
  const [allCommunitiesRoute, setAllCommunitiesRoute] = useState(() =>
    routes.communities(),
  );
  const AllCommunitiesLink = single ? ADefault : A;

  useEffect(
    () => {
      if (single) {
        setAllCommunitiesRoute(`${process.env.APP_LOCATION}/communities`);
      }
    },
    [single],
  );
  return (
    <div className="overflow-hidden" ref={ref}>
      <H4 isHeader>
        <FormattedMessage id={messages.communities.id} />
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {orderBy(profile.ratings, 'rating', 'desc')
          .slice(0, 9)
          .map(item => (
            <CommunityItemWithRating
              communityId={item.communityId}
              rating={item.rating}
              single={single}
              communities={communities}
            />
          ))}

        {communities.length > 9 && (
          <div className="d-flex align-items-center justify-content-center">
            <AllCommunitiesLink
              className="d-flex align-items-center"
              to={allCommunitiesRoute}
              href={allCommunitiesRoute}
            >
              <CreateCommunityIcon
                className="mr-2"
                fill="#7699FF"
                stroke="#576FED"
              />
              <Span color={TEXT_PRIMARY}>
                <FormattedMessage id={messages.allCommunities.id} />
              </Span>
            </AllCommunitiesLink>
          </div>
        )}
      </Grid>
    </div>
  );
};

CommunitiesSectionWithRatings.propTypes = {
  profile: PropTypes.object,
  ref: PropTypes.object,
  single: PropTypes.bool,
  communities: PropTypes.array,
};

export default React.memo(CommunitiesSectionWithRatings);
