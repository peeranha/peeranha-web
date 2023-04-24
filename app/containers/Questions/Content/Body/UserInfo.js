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
import { getUserName } from 'utils/user';
import { isBotAddress } from 'utils/properties';
import { t } from 'i18next';
import { messengerData } from 'containers/ViewQuestion/BotInfo';

export const AuthorName = Span.extend`
  width: max-content;
  min-width: 55px;
  padding-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const UserInfo = ({ author, postTime, locale, isSearchPage, communityId, communities }) => (
  <p className="mb-3">
    <A to={routes.profileView(author.id)} className="d-inline-flex align-items-center">
      {!isSearchPage && (
        <>
          <AuthorName fontSize="14">
            {isBotAddress(author)
              ? t('post.botCreate', { bot: messengerData[author.messengerType].name })
              : getUserName(author.displayName, author.id)}
          </AuthorName>
          {!isBotAddress(author) && (
            <>
              <RatingStatus
                rating={getRatingByCommunity(author, communityId, communities)}
                size="sm"
                isRankOff
                customRatingIconColors={customRatingIconColors}
              />
              <AchievementsStatus count={author.achievements?.length} />
            </>
          )}
        </>
      )}

      <Span className="text-capitalize mr-3" fontSize="14" color={TEXT_SECONDARY}>
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
