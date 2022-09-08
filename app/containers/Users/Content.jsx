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
}) => {
  return (
    <InfinityLoader
      loadNextPaginatedData={getMoreUsers}
      isLoading={usersLoading}
      isLastFetch={isLastFetch}
    >
      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {users.map(x => {
          return (
            <A to={routes.profileView(x.id)} key={x.id}>
              <User>
                <MediumImageWrapper>
                  <MediumImage
                    isBordered
                    className="flex-shrink-0 mr-2"
                    src={getUserAvatar(x.avatar)}
                    alt="avatar"
                  />
                  {!!x?.['integer_properties']?.find(
                    item => item.key === TEMPORARY_ACCOUNT_KEY && item.value,
                  ) && (
                    <TelegramUserLabel
                      id={`temporary-account-${x.user}-label`}
                      locale={locale}
                    />
                  )}
                </MediumImageWrapper>
                <div>
                  <P fontSize="14">{getUserName(x?.displayName, x?.id)}</P>
                  <IconWithStatus
                    className="py-1"
                    size="sm"
                    rating={
                      x?.['ratings']?.length
                        ? x?.['ratings']?.reduce(
                            (max, current) =>
                              max.rating > current.rating ? max : current,
                          ).rating
                        : 0
                    }
                    customRatingIconColors={customRatingIconColors}
                  />
                  <P fontSize="14" color={TEXT_SECONDARY}>
                    {getTimeFromDateToNow(x.creationTime, locale)}
                  </P>
                </div>
              </User>
            </A>
          );
        })}
      </Grid>
    </InfinityLoader>
  );
};

Content.propTypes = {
  getMoreUsers: PropTypes.func,
  users: PropTypes.array,
  usersLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(Content);
