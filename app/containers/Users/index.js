import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import messages from 'containers/Users/messages';

import { getUsers } from 'containers/Users/actions';
import reducer from 'containers/Users/reducer';
import saga from 'containers/Users/saga';

import View from 'containers/Users/View';
import { selectIsGlobalAdmin } from 'containers/AccountProvider/selectors';
import * as selectors from './selectors';

const single = isSingleCommunityWebsite();

const Users = ({
  locale,
  users,
  usersLoading,
  sorting,
  searchText,
  isLastFetch,
  getUsersDispatch,
}) => {
  const getMoreUsers = useCallback(
    () => {
      getUsersDispatch({
        loadMore: true,
        communityId: single || 0,
      });
    },
    [getUsersDispatch],
  );

  const dropdownFilter = useCallback(
    sorting => {
      getUsersDispatch({
        loadMore: false,
        sorting,
        reload: true,
        communityId: single || 0,
      });
    },
    [getUsersDispatch],
  );

  useEffect(
    () => {
      getUsersDispatch({
        loadMore: false,
        reload: true,
        communityId: single || 0,
      });
    },
    [getUsersDispatch],
  );

  return (
    <>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
      />

      <View
        userCount={users.length} //TODO rewrite
        getMoreUsers={getMoreUsers}
        dropdownFilter={dropdownFilter}
        users={users}
        usersLoading={usersLoading}
        sorting={sorting}
        searchText={searchText}
        isLastFetch={isLastFetch}
        locale={locale}
      />
    </>
  );
};

Users.propTypes = {
  locale: PropTypes.string,
  getUsersDispatch: PropTypes.func,
  users: PropTypes.array,
  usersLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  sorting: PropTypes.string,
  searchText: PropTypes.string,
  stat: PropTypes.object,
};

export default compose(
  injectReducer({ key: 'users', reducer }),
  injectSaga({ key: 'users', saga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      users: selectors.selectUsers(),
      usersLoading: selectors.selectUsersLoading(),
      sorting: selectors.selectSorting(),
      searchText: selectors.selectSearchText(),
      isLastFetch: selectors.selectIsLastFetch(),
      isGlobalAdmin: selectIsGlobalAdmin(),
    }),
    dispatch => ({
      getUsersDispatch: bindActionCreators(getUsers, dispatch),
    }),
  ),
)(Users);
