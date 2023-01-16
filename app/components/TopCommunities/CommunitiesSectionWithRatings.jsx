import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import allCommunitiesIcon from 'images/createCommunity.svg?external';
import Icon from 'components/Icon';
import A, { ADefault } from 'components/A';
import H4 from 'components/H4';
import Span from 'components/Span';
import Grid from 'components/Grid';
import CommunityItemWithRating from './CommunityItemWithRating';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const CommunitiesSectionWithRatings = ({
  profile,
  refCommunitiesSection,
  single,
  communities,
}) => {
  const [allCommunitiesRoute, setAllCommunitiesRoute] = useState(() =>
    routes.communities(),
  );
  const AllCommunitiesLink = single ? ADefault : A;

  useEffect(() => {
    if (single) {
      setAllCommunitiesRoute(`${process.env.APP_LOCATION}/communities`);
    }
  }, [single]);
  return (
    <div className="overflow-hidden" ref={refCommunitiesSection}>
      <H4 isHeader>
        <FormattedMessage id={messages.communities.id} />
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {orderBy(profile.ratings, 'rating', 'desc')
          .slice(0, 9)
          .map((item) => (
            <CommunityItemWithRating
              communityId={item.communityId}
              rating={item.rating}
              single={single}
              communities={communities}
              key={`${item.communityId}-community`}
            />
          ))}

        {communities.length > 9 && (
          <div className="d-flex align-items-center justify-content-center">
            <AllCommunitiesLink
              className="d-flex align-items-center"
              to={allCommunitiesRoute}
              href={allCommunitiesRoute}
            >
              <Icon
                className="mr-2"
                icon={allCommunitiesIcon}
                width="18"
                css={css`
                  circle {
                    stroke: ${colors.btnColor || TEXT_PRIMARY};
                  }
                  path {
                    fill: ${colors.btnColor || TEXT_PRIMARY};
                  }
                `}
              />
              <Span color={colors.btnColor || TEXT_PRIMARY}>
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
  refCommunitiesSection: PropTypes.object,
  single: PropTypes.number,
  communities: PropTypes.array,
};

export default React.memo(CommunitiesSectionWithRatings);
