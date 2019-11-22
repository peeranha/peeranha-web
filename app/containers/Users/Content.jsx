import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';

import { getUserAvatar } from 'utils/profileManagement';

import { getTimeFromDateToNow } from 'utils/datetime';

import InfinityLoader from 'components/InfinityLoader';
import { BaseLink } from 'components/Base/BaseRoundedSpecialOne';
import P from 'components/P';
import Grid from 'components/Grid';
import { IconWithStatus } from 'components/RatingStatus/index';
import MediumImage from 'components/Img/MediumImage';

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
        <BaseLink
          className="d-flex align-items-start"
          to={routes.profileView(x.user)}
          key={x.name}
        >
          <MediumImage
            isBordered
            src={getUserAvatar(x.ipfs_avatar)}
            alt="ipfs_avatar"
          />
          <div className="pl-3">
            <P fontSize="14">{x.display_name}</P>
            <IconWithStatus className="py-1" size="sm" rating={x.rating} />
            <P fontSize="14" color={TEXT_SECONDARY}>
              {getTimeFromDateToNow(x.registration_time, locale)}
            </P>
          </div>
        </BaseLink>
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
