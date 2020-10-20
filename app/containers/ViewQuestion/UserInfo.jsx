import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_SECONDARY } from 'style-constants';

import * as routes from 'routes-config';

import noAvatar from 'images/ico-user-no-photo.png';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus';
import MediumImage from 'components/Img/MediumImage';
import Span from 'components/Span';
import A from 'components/A';

import { COMMENT_TYPE } from './constants';

export const UserInfo = ({
  rating,
  name,
  avatar,
  account,
  type,
  postTime,
  locale,
  achievementsCount,
}) => (
  <A to={routes.profileView(account)} className="d-flex flex-shrink-0">
    {type !== COMMENT_TYPE && (
      <MediumImage
        className="mr-2"
        isBordered
        src={avatar || noAvatar}
        alt="avatar"
      />
    )}

    <div
      className={`d-flex justify-content-center ${
        type !== COMMENT_TYPE ? 'flex-column' : 'flex-row'
      }`}
    >
      <span className="d-flex align-items-center mr-2">
        <Span className="mr-2" fontSize="14" lineHeight="18">
          {name}
        </Span>
        <RatingStatus rating={rating} size="sm" isRankOff />
        <AchievementsStatus count={achievementsCount} />
      </span>

      <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="18">
        {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
      </Span>
    </div>
  </A>
);

UserInfo.propTypes = {
  account: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  type: PropTypes.string,
  postTime: PropTypes.number,
  locale: PropTypes.string,
  achievementsCount: PropTypes.number,
};

export default React.memo(UserInfo);
