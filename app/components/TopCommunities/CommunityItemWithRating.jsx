import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import { TEXT_SECONDARY } from 'style-constants';
import { hasCommunitySingleWebsite, graphCommunityColors } from 'utils/communityManagement';

import { customRatingIconColors } from 'constants/customRating';

import BaseRoundedNoPadding from '../Base/BaseRoundedNoPadding';
import MediumImage from '../Img/MediumImage';
import P from '../P';
import Span from '../Span';

import RatingStatus from '../RatingStatus';
import AStyled from './AStyled';
import ADefaultStyled from './ADefaultStyled';
import FrontSide from './FrontSide';
import BackSide from './BackSide';

const graphCommunity = graphCommunityColors();

const CommunityItemWithRating = ({ communities, single, communityId, rating, locale }) => {
  const { t } = useTranslation();
  const [route, setRoute] = useState(() => routes.questions(communityId));
  const Link = single && communityId !== single ? ADefaultStyled : AStyled;
  const communityWebsite = hasCommunitySingleWebsite(communityId);
  useEffect(() => {
    if (single && communityId !== single) {
      setRoute(`${process.env.APP_LOCATION}${route}`);
    }

    if (single && communityId === single) {
      setRoute(routes.questions());
    }
  }, [single, communityId]);

  const community = communities?.find((item) => item.id === communityId);
  const communityTranslation = community?.translations?.find(
    (translation) => translation.language === locale,
  );

  return (
    <BaseRoundedNoPadding>
      <Link href={communityWebsite || route}>
        <FrontSide>
          {community && (
            <div>
              <MediumImage src={community.avatar} alt="comm_img" />
              <P fontSize="16" css={graphCommunity && { color: '#E1E1E4' }}>
                {communityTranslation?.name || community.name}
              </P>
            </div>
          )}

          <div>
            <div>
              <div>
                <Span
                  className="mt-1"
                  fontSize="14"
                  color={TEXT_SECONDARY}
                  css={graphCommunity && { color: '#A7A7AD' }}
                >
                  {t('common.reputationStatus')}
                </Span>
              </div>
              <RatingStatus
                className="py-1"
                size="lg"
                rating={rating}
                isRankOff={false}
                customRatingIconColors={customRatingIconColors}
              />
            </div>
          </div>
        </FrontSide>

        <BackSide>
          <div className="d-flex flex-column justify-content-between">
            {community && (
              <div>
                <P fontSize="16" bold css={graphCommunity && { color: '#E1E1E4' }}>
                  {communityTranslation?.name || community.name}
                </P>
                <P>{communityTranslation?.description || community.description}</P>
              </div>
            )}
          </div>
        </BackSide>
      </Link>
    </BaseRoundedNoPadding>
  );
};

CommunityItemWithRating.propTypes = {
  communities: PropTypes.array,
  single: PropTypes.bool,
  communityId: PropTypes.number,
  rating: PropTypes.number,
  locale: PropTypes.string,
};

export default React.memo(CommunityItemWithRating);
