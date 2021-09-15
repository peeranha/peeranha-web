import React from 'react';
import PropTypes from 'prop-types';
import _sortBy from 'lodash/sortBy';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import Header from './Header';
import Content from './Content';

const View = ({
  getMoreUsers,
  dropdownFilter,
  users,
  usersLoading,
  sorting,
  searchText,
  isLastFetch,
  locale,
  userCount,
}) => (
  <div>
    <Header
      userCount={userCount}
      sorting={sorting}
      dropdownFilter={dropdownFilter}
    />

    <Content
      getMoreUsers={getMoreUsers}
      users={users}
      sorting={sorting}
      usersLoading={usersLoading}
      searchText={searchText}
      isLastFetch={isLastFetch}
      locale={locale}
    />

    {usersLoading && !(userCount === users.length) && <LoadingIndicator />}
  </div>
);

View.propTypes = {
  getMoreUsers: PropTypes.func,
  dropdownFilter: PropTypes.func,
  users: PropTypes.array,
  usersLoading: PropTypes.bool,
  sorting: PropTypes.string,
  searchText: PropTypes.string,
  isLastFetch: PropTypes.bool,
  locale: PropTypes.string,
  userCount: PropTypes.number,
};

export default React.memo(View);
