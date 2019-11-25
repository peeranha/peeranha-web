import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';

import { getUserAvatar } from 'utils/profileManagement';

import { getTimeFromDateToNow } from 'utils/datetime';

import InfinityLoader from 'components/InfinityLoader';
import Base from 'components/Base/BaseRoundedSpecialOne';
import P from 'components/P';
import A from 'components/A';
import Grid from 'components/Grid';
import { IconWithStatus } from 'components/RatingStatus';
import MediumImage from 'components/Img/MediumImage';

const User = Base.extend`
  min-height: 84px;
  display: flex;
  align-items: start;

  > div {
    min-width: 0;
    padding-left: 15px;
    flex: 1;

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
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
      {users.map(x => (
        <A to={routes.profileView(x.user)} key={x.name}>
          <User>
            <MediumImage
              isBordered
              className="flex-shrink-0"
              src={getUserAvatar(x.ipfs_avatar)}
              alt="ipfs_avatar"
            />
            <div>
              <P fontSize="14">{x.display_name}</P>
              <IconWithStatus className="py-1" size="sm" rating={x.rating} />
              <P fontSize="14" color={TEXT_SECONDARY}>
                {getTimeFromDateToNow(x.registration_time, locale)}
              </P>
            </div>
          </User>
        </A>
      ))}
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
