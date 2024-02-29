import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { TEXT_SECONDARY } from 'style-constants';

import * as routes from 'routes-config';

import { customRatingIconColors } from 'constants/customRating';

import noAvatar from 'images/ico-user-no-photo.png';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus';
import MediumImage, { MediumImageWrapper } from 'components/Img/MediumImage';

import Span from 'components/Span';
import A from 'components/A';

import { COMMENT_TYPE } from './constants';
import { SuiNS } from 'icons/index';
import { css } from '@emotion/react';

const Block = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: ${({ type }) => (type !== COMMENT_TYPE ? 'column' : 'row')};
  max-width: cacl(100% - 50px - 152px);

  @media only screen and (max-width: 576px) {
    > span {
      max-width: 230px;
    }
  }

  @media only screen and (max-width: 480px) {
    > span {
      max-width: 190px;
    }
  }

  @media only screen and (max-width: 420px) {
    > span {
      max-width: 150px;
    }
  }

  @media only screen and (max-width: 380px) {
    > span {
      max-width: 125px;
    }
  }
`;

export const UserInfo = ({
  rating,
  name,
  avatar,
  account,
  type,
  postTime,
  locale,
  achievementsCount,
  isComment,
  customName,
}) => (
  <A to={routes.profileView(account)} className="d-flex flex-shrink-0">
    {type !== COMMENT_TYPE && (
      <MediumImageWrapper>
        <MediumImage className="mr-2" isBordered src={avatar || noAvatar} alt="avatar" />
      </MediumImageWrapper>
    )}

    <Block type={type}>
      <span className={`d-flex align-items-center ${isComment ? '' : 'mr-2'} mr8`}>
        <Span
          className="mr-2"
          fontSize="14"
          lineHeight="18"
          textOverflow="ellipsis"
          css={
            customName &&
            css`
              border-radius: 4px;
              background-color: #eaf7ff;
              padding: 0 8px;
              margin-right: 8px;
              display: flex;
              align-items: center;
            `
          }
        >
          {customName && (
            <SuiNS
              css={css`
                margin-right: 3px !important;
              `}
            />
          )}
          {customName || name}
        </Span>
        <RatingStatus
          rating={rating}
          size="sm"
          isRankOff
          customRatingIconColors={customRatingIconColors}
        />
        <AchievementsStatus count={achievementsCount} />
      </span>

      <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="18" css={{ color: '#A7A7AD' }}>
        {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
      </Span>
    </Block>
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
};

export default React.memo(UserInfo);
