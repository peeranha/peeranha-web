import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';

import { getUserAvatar } from 'utils/profileManagement';

import { getTimeFromDateToNow } from 'utils/datetime';

import InfinityLoader from 'components/InfinityLoader';
import Base from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import Input from 'components/Input';
import P from 'components/P';
import A from 'components/A';
import { IconWithStatus } from 'components/RatingStatus/index';
import MediumImage from 'components/Img/MediumImage';
import { SpecialGridForMobileList } from 'containers/TagsOfCommunity/Content';

/* eslint-disable-next-line */
const InputSearch = ({ inputFilter, searchText }) => (
  <li className="col-xl-3 d-flex">
    <BaseTransparent className="d-flex align-items-center justify-content-center p-2">
      <Input
        input={{ onChange: inputFilter, value: searchText }}
        placeholder="Find user"
        isSearchable
      />
    </BaseTransparent>
  </li>
);

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
    <SpecialGridForMobileList className="row">
      {/* <InputSearch inputFilter={inputFilter} searchText={searchText} /> */}

      {users.map(x => (
        <li key={x.name} className="col-12 col-sm-6 col-md-4 col-xl-3 mb-3">
          <A to={routes.profileView(x.user)}>
            <Base className="d-flex align-items-start">
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
            </Base>
          </A>
        </li>
      ))}
    </SpecialGridForMobileList>
  </InfinityLoader>
);

InputSearch.propTypes = {
  inputFilter: PropTypes.func,
  searchText: PropTypes.string,
};

Content.propTypes = {
  getMoreUsers: PropTypes.func,
  users: PropTypes.array,
  usersLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(Content);
