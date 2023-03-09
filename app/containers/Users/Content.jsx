import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';

import { getUserAvatar } from 'utils/profileManagement';
import { TEMPORARY_ACCOUNT_KEY } from 'utils/constants';

import { getTimeFromDateToNow } from 'utils/datetime';

import InfinityLoader from 'components/InfinityLoader';
import Base from 'components/Base/BaseRoundedSpecialOne';
import P from 'components/P';
import A from 'components/A';
import Grid from 'components/Grid';
import { IconWithStatus } from 'components/RatingStatus';
import MediumImage, { MediumImageWrapper } from 'components/Img/MediumImage';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';
import { getUserName } from 'utils/user';
import { customRatingIconColors } from 'constants/customRating';

const User = Base.extend`
  min-height: 84px;
  display: flex;
  align-items: start;

  > div:last-child {
    min-width: 0;
    flex: 1;

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  > div:first-child {
    flex-shrink: 0;
    margin-right: 7px;
  }
`;

const Content = ({
  getMoreUsers,
  users,
  usersLoading,
  isLastFetch,
  locale,
}) => (
  <InfinityLoader
    loadNextPaginatedData={getMoreUsers}
    isLoading={usersLoading}
    isLastFetch={isLastFetch}
  >
    <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
      {users.map((user) => {
        const isTemporaryAccount = Boolean(
          user?.integer_properties?.find(
            (item) => item.key === TEMPORARY_ACCOUNT_KEY && item.value,
          ),
        );
        const userRating = user?.ratings?.length
          ? user.ratings.reduce((max, current) =>
              max.rating > current.rating ? max : current,
            ).rating
          : 0;

        return (
          <A to={routes.profileView(user.id)} key={user.id}>
            <User>
              <MediumImageWrapper>
                <MediumImage
                  isBordered
                  className="flex-shrink-0 mr-2"
                  src={getUserAvatar(user.avatar)}
                  alt="avatar"
                />
                {isTemporaryAccount && (
                  <TelegramUserLabel
                    id={`temporary-account-${user.user}-label`}
                    locale={locale}
                  />
                )}
              </MediumImageWrapper>
              <div>
                <P fontSize="14">{getUserName(user?.displayName, user?.id)}</P>
                <IconWithStatus
                  className="py-1"
                  size="sm"
                  rating={userRating}
                  customRatingIconColors={customRatingIconColors}
                />
                <P fontSize="14" color={TEXT_SECONDARY}>
                  {getTimeFromDateToNow(user.creationTime, locale)}
                </P>
              </div>
            </User>
          </A>
        );
      })}
    </Grid>
  </InfinityLoader>
);

Content.propTypes = {
  getMoreUsers: PropTypes.func,
  users: PropTypes.array,
  usersLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(Content);
