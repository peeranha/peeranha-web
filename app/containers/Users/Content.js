import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY } from 'style-constants';
import noAvatar from 'images/ico-user-no-photo.png';

import { getTimeFromDateToNow } from 'utils/datetime';

import InfinityLoader from 'components/InfinityLoader';
import Base from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import Input from 'components/Input';
import P from 'components/P';
import { IconWithStatus } from 'components/RatingStatus/index';
import MediumImage from 'components/Img/MediumImage';

/* eslint-disable-next-line */
const InputSearch = /* istanbul ignore next */ ({
  inputFilter,
  searchText,
}) => (
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

const Content = /* istanbul ignore next */ ({
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
    <ul className="row my-3">
      {/* <InputSearch inputFilter={inputFilter} searchText={searchText} /> */}

      {users.map(x => (
        <li key={x.name} className="col-xl-3 mb-3">
          <Base className="d-flex align-items-start">
            <MediumImage
              isBordered
              src={x.ipfs_avatar || noAvatar}
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
        </li>
      ))}
    </ul>
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
