import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import orderBy from 'lodash/orderBy';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import allCommunitiesIcon from 'images/createCommunity.svg?external';
import Icon from 'components/Icon';
import A, { ADefault } from 'components/A';
import H4 from 'components/H4';
import Span from 'components/Span';
import Grid from 'components/Grid';
import { CirclesThreeGraph } from 'components/icons';

import CommunityItemWithRating from './CommunityItemWithRating';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const CommunitiesSectionWithRatings = ({ profile, ref, single, communities, locale }) => {
  const { t } = useTranslation();
  const [allCommunitiesRoute, setAllCommunitiesRoute] = useState(() => routes.communities());
  const AllCommunitiesLink = single ? ADefault : A;

  useEffect(() => {
    if (single) {
      setAllCommunitiesRoute(`${process.env.APP_LOCATION}/communities`);
    }
  }, [single]);
  return (
    <div className="overflow-hidden" ref={ref}>
      <H4
        isHeader
        css={css`
          color: ${colors.white || ''};
        `}
      >
        {t('common.communities')}
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {orderBy(profile.ratings, 'rating', 'desc').map((item) => (
          <CommunityItemWithRating
            communityId={item.communityId}
            rating={item.rating}
            single={single}
            communities={communities}
            key={item.communityId}
            locale={locale}
          />
        ))}

        <div className="d-flex align-items-center justify-content-center">
          <AllCommunitiesLink
            className="d-flex align-items-center"
            to={allCommunitiesRoute}
            href={allCommunitiesRoute}
          >
            {graphCommunity ? (
              <CirclesThreeGraph className="mr-2" fill="#6F4CFF" size={[24, 24]} />
            ) : (
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
            )}
            <Span css={{ color: '#6F4CFF' }}>{t('common.allCommunities')}</Span>
          </AllCommunitiesLink>
        </div>
      </Grid>
    </div>
  );
};

CommunitiesSectionWithRatings.propTypes = {
  profile: PropTypes.object,
  ref: PropTypes.object,
  single: PropTypes.bool,
  communities: PropTypes.array,
  locale: PropTypes.string,
};

export default React.memo(CommunitiesSectionWithRatings);
