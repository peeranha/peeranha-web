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
import {
  selectStat,
  selectCommunities,
} from 'containers/DataCacheProvider/selectors';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import messages from './messages';

import * as selectors from './selectors';
import { changeSortingType, getUsers } from './actions';
import reducer from './reducer';
import saga from './saga';

import View from './View';
import { selectIsGlobalAdmin } from '../AccountProvider/selectors';

const single = isSingleCommunityWebsite();

const Users = ({
  locale,
  users,
  usersLoading,
  sorting,
  searchText,
  isLastFetch,
  stat,
  communities,
  getUsersDispatch,
  changeSortingTypeDispatch,
}) => {
  const getMoreUsers = useCallback(() => {
    getUsersDispatch({ loadMore: true });
  }, []);

  const communityInfo = useMemo(() => communities.find(x => x.id === single), [
    communities,
  ]);

  const userCount = useMemo(
    () => (single ? communityInfo?.['users_subscribed'] ?? 0 : stat.usersCount),
    [stat.usersCount, communityInfo],
  );

  const dropdownFilter = useCallback(
    sorting => {
      if (userCount === users.length) {
        changeSortingTypeDispatch(sorting);
      } else {
        getUsersDispatch({ loadMore: false, sorting, reload: true });
      }
    },
    [userCount, communityInfo, users],
  );

  useEffect(() => {
    getUsersDispatch({ loadMore: false, reload: true });
  }, []);

  return (
    <>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
      />

      <View
        userCount={userCount}
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
  limit: PropTypes.number,
  stat: PropTypes.object,
  communities: PropTypes.array,
  changeSortingTypeDispatch: PropTypes.func,
};

export default compose(
  injectReducer({ key: 'users', reducer }),
  injectSaga({ key: 'users', saga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      communities: selectCommunities(),
      users: selectors.selectUsers(),
      usersLoading: selectors.selectUsersLoading(),
      sorting: selectors.selectSorting(),
      searchText: selectors.selectSearchText(),
      isLastFetch: selectors.selectIsLastFetch(),
      stat: selectStat(),
      isGlobalAdmin: selectIsGlobalAdmin(),
    }),
    dispatch => ({
      getUsersDispatch: bindActionCreators(getUsers, dispatch),
      changeSortingTypeDispatch: bindActionCreators(
        changeSortingType,
        dispatch,
      ),
    }),
  ),
)(Users);
