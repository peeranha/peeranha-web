import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import A from 'components/A';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus';

import { TEXT_SECONDARY } from 'style-constants';
import { getRatingByCommunity } from 'utils/profileManagement';
import { customRatingIconColors } from 'constants/customRating';

const UserInfo = ({ author, postTime, locale, isSearchPage, communityId }) => (
  <p className="mb-3">
    <A
      to={routes.profileView(author.id)}
      className="d-inline-flex align-items-center"
    >
      {!isSearchPage && (
        <>
          <Span className="mr-2" fontSize="14">
            {author?.displayName}
          </Span>
          <RatingStatus
            rating={getRatingByCommunity(author, communityId)}
            size="sm"
            isRankOff
            customRatingIconColors={customRatingIconColors}
          />
          <AchievementsStatus count={author.achievements?.length} />
        </>
      )}

      <Span
        className="text-capitalize mr-3"
        fontSize="14"
        color={TEXT_SECONDARY}
      >
        {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
      </Span>
    </A>
  </p>
);

UserInfo.propTypes = {
  author: PropTypes.object,
  postTime: PropTypes.string,
  locale: PropTypes.string,
};

export default memo(UserInfo);
