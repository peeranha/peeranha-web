import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import * as routes from '../../routes-config';
import BaseRoundedNoPadding from '../Base/BaseRoundedNoPadding';
import MediumImage from '../Img/MediumImage';
import P from '../P';
import Span from '../Span';
import { TEXT_SECONDARY } from '../../style-constants';
import messages from 'common-messages';
import RatingStatus from '../RatingStatus';
import AStyled from './AStyled';
import ADefaultStyled from './ADefaultStyled';
import FrontSide from './FrontSide';
import BackSide from './BackSide';
import { customRatingIconColors } from 'constants/customRating';

const CommunityItemWithRating = ({
  communities,
  single,
  communityId,
  rating,
}) => {
  const [route, setRoute] = useState(() => routes.questions(communityId));
  const Link = single && communityId !== single ? ADefaultStyled : AStyled;

  useEffect(() => {
    if (single && communityId !== single) {
      setRoute(`${process.env.APP_LOCATION}${route}`);
    }

    if (single && communityId === single) {
      setRoute(routes.questions());
    }
  }, [single, communityId]);

  const community = communities.find((item) => item.id === communityId);

  return (
    <BaseRoundedNoPadding>
      <Link href={route} to={route}>
        <FrontSide>
          {community && (
            <div>
              <MediumImage src={community.avatar} alt="comm_img" />
              <P fontSize="16" bold>
                {community.name}
              </P>
            </div>
          )}

          <div>
            <div>
              <div>
                <Span className="mt-1" fontSize="14" color={TEXT_SECONDARY}>
                  <FormattedMessage id={messages.reputationStatus.id} />
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
                <P fontSize="16" bold>
                  {community.name}
                </P>
                <P>{community.description}</P>
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
};

export default React.memo(CommunityItemWithRating);
