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

const UserInfo = ({ author, userInfo, postTime, locale, isSearchPage }) => {
  return (
    <p className="mb-3">
      <A
        to={routes.profileView(author)}
        className="d-inline-flex align-items-center"
      >
        {!isSearchPage && (
          <>
            <Span className="mr-2" fontSize="14">
              {userInfo?.['displayName']}
            </Span>
            <RatingStatus rating={userInfo.rating} size="sm" isRankOff />
            <AchievementsStatus count={userInfo.achievementsReached?.length} />
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
};

UserInfo.propTypes = {
  author: PropTypes.string,
  userInfo: PropTypes.object,
  postTime: PropTypes.number,
  locale: PropTypes.string,
};

export default memo(UserInfo);
