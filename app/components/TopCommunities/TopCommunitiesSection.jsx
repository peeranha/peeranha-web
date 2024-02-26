import { css } from '@emotion/react';
import { singleCommunityColors } from 'utils/communityManagement';
import React, { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import H4 from '../H4';
import Grid from '../Grid';
import CommunityItem from './CommunityItem';
import allCommunitiesIcon from '../../images/createCommunity.svg?inline';
import Span from '../Span';
import { TEXT_PRIMARY } from '../../style-constants';
import A, { ADefault } from '../A';
import * as routes from '../../routes-config';

const colors = singleCommunityColors();

const TopCommunitiesSection = ({ ref, single, communities, locale }) => {
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
        {t('common.top')} <span className="text-lowercase">{t('common.communities')}</span>
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {orderBy(communities, 'postCount', 'desc')
          .slice(0, 9)
          .map((community) => {
            const communityTranslation = community.translations?.find(
              (translation) => translation.language === locale,
            );

            return (
              <CommunityItem
                id={community.id}
                description={communityTranslation?.description || community.description}
                name={communityTranslation?.name || community.name}
                postCount={community.postCount}
                avatar={community.avatar}
                followingUsers={community.followingUsers}
                single={single}
                key={community.id}
              />
            );
          })}

        {communities?.length > 9 && (
          <div className="d-flex align-items-center justify-content-center">
            <AllCommunitiesLink
              className="d-flex align-items-center"
              to={allCommunitiesRoute}
              href={allCommunitiesRoute}
            >
              <img className="mr-2" src={allCommunitiesIcon} alt="icon" />
              <Span css={{ color: '#6F4CFF' }}>{t('common.allCommunities')}</Span>
            </AllCommunitiesLink>
          </div>
        )}
      </Grid>
    </div>
  );
};

TopCommunitiesSection.propTypes = {
  ref: PropTypes.object,
  single: PropTypes.bool,
  communities: PropTypes.array,
  locale: PropTypes.string,
};

export default React.memo(TopCommunitiesSection);
