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
import { singleCommunityColors } from 'utils/communityManagement';
import { t } from 'i18next';
import { messengerData } from 'containers/ViewQuestion/BotInfo';
import { css } from '@emotion/react';
import { SuiNS } from 'icons/index';

const colors = singleCommunityColors();

export const AuthorName = Span.extend`
  width: max-content;
  min-width: min-content;
  padding-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-content: center;
`;
const UserInfo = ({ author, postTime, locale, isSearchPage, communityId, achievementsCount }) => (
  <p className="mb-3">
    <A to={routes.profileView(author.id)} className="d-inline-flex align-items-center">
      {!isSearchPage && (
        <>
          <AuthorName
            fontSize="14"
            css={
              author.customName &&
              css`
                border-radius: 4px;
                background-color: #eaf7ff;
                padding: 4px 8px;
                margin-right: 8px;
              `
            }
          >
            {author.customName && (
              <SuiNS
                css={css`
                  margin-right: 3px !important;
                `}
              />
            )}
            {isBotAddress(author)
              ? t('post.botCreate', { bot: messengerData[author.messengerType]?.name })
              : getUserName(author.customName || author.displayName, author.id)}
          </AuthorName>
          {!isBotAddress(author) && (
            <>
              <RatingStatus
                rating={getRatingByCommunity(author, communityId)}
                size="sm"
                isRankOff
                customRatingIconColors={customRatingIconColors}
              />
              <AchievementsStatus count={achievementsCount} />
            </>
          )}
        </>
      )}

      <Span
        className="text-capitalize mr-3"
        fontSize="14"
        color={colors.secondaryTextColor || TEXT_SECONDARY}
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
