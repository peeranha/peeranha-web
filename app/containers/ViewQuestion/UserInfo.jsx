import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY } from 'style-constants';

import * as routes from 'routes-config';

import noAvatar from 'images/ico-user-no-photo.png';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus';
import MediumImage, { MediumImageWrapper } from 'components/Img/MediumImage';

import Span from 'components/Span';
import A from 'components/A';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';

import { customRatingIconColors } from 'constants/customRating';
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
  isTemporaryAccount,
  isComment,
}) => (
  <A to={routes.profileView(account)} className="d-flex flex-shrink-0">
    {type !== COMMENT_TYPE && (
      <MediumImageWrapper>
        <MediumImage
          className="mr-2"
          isBordered
          src={avatar || noAvatar}
          alt="avatar"
        />
        {isTemporaryAccount && (
          <TelegramUserLabel
            id={`temporary-account-${account}-label`}
            locale={locale}
          />
        )}
      </MediumImageWrapper>
    )}

    <div
      className={`d-flex justify-content-center ${
        type !== COMMENT_TYPE ? 'flex-column' : 'flex-row'
      }`}
    >
      <span className={`d-flex align-items-center ${isComment ? '' : 'mr-2'}`}>
        <Span className="mr-2" fontSize="14" lineHeight="18">
          {name !== null
            ? name
            : account.substring(0, 6) +
              '...' +
              account.substring(account.length - 4)}
        </Span>
        <RatingStatus
          rating={rating}
          size="sm"
          isRankOff
          customRatingIconColors={customRatingIconColors}
        />
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
  postTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  achievementsCount: PropTypes.number,
  isComment: PropTypes.bool,
  isTemporaryAccount: PropTypes.bool,
};

export default React.memo(UserInfo);
