import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import Header from './Header';
import Content from './Content';

const View = /* istanbul ignore next */ ({
  getMoreUsers,
  dropdownFilter,
  inputFilter,
  users,
  usersLoading,
  sorting,
  searchText,
  isLastFetch,
  locale,
}) => (
  <div>
    <Header sorting={sorting} dropdownFilter={dropdownFilter} />

    <Content
      getMoreUsers={getMoreUsers}
      inputFilter={inputFilter}
      users={users}
      usersLoading={usersLoading}
      searchText={searchText}
      isLastFetch={isLastFetch}
      locale={locale}
    />

    {usersLoading && <LoadingIndicator />}
  </div>
);

View.propTypes = {
  getMoreUsers: PropTypes.func,
  dropdownFilter: PropTypes.func,
  inputFilter: PropTypes.func,
  users: PropTypes.array,
  usersLoading: PropTypes.bool,
  sorting: PropTypes.string,
  searchText: PropTypes.string,
  isLastFetch: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(View);
