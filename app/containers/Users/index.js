import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import { selectEos } from 'containers/EosioProvider/selectors';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { UsersFetcher, AccountsSortedBy } from 'utils/profileManagement';

import messages from './messages';

import * as selectors from './selectors';
import { changeSortingType, getUsers } from './actions';
import reducer from './reducer';
import saga from './saga';

import View from './View';

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
  limit,
  eosService,
  getUsersDispatch,
  changeSortingTypeDispatch,
}) => {
  const [fetcher, setFetcher] = useState(null);

  const initFetcher = useCallback(
    (sortKey = sorting) => {
      if (!fetcher && eosService) {
        const f = new UsersFetcher(
          limit,
          limit,
          AccountsSortedBy[sortKey],
          eosService,
        );
        return f;
      }

      return fetcher;
    },
    [sorting, eosService, limit, fetcher],
  );

  const getMoreUsers = useCallback(
    () => {
      if (fetcher) {
        getUsersDispatch({ loadMore: true, fetcher });
      }
    },
    [fetcher],
  );

  const communityInfo = useMemo(() => communities.find(x => x.id === single), [
    communities,
  ]);

  const userCount = useMemo(
    () => (single ? communityInfo?.['users_subscribed'] ?? 0 : stat.user_count),
    [stat, communityInfo],
  );

  const dropdownFilter = useCallback(
    sortKey => {
      setFetcher(null);
      const f = initFetcher(sortKey);

      if (userCount === users.length) {
        changeSortingTypeDispatch(sortKey);
        return;
      }

      getUsersDispatch({ sorting: sortKey, fetcher: f });
    },
    [userCount, communityInfo, users, initFetcher],
  );

  useEffect(
    () => {
      const f = initFetcher();
      getUsersDispatch({ loadMore: false, fetcher: f });
    },
    [initFetcher],
  );

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
  eosService: PropTypes.object,
  stat: PropTypes.object,
  communities: PropTypes.array,
  changeSortingTypeDispatch: PropTypes.func,
};

export default compose(
  injectReducer({ key: 'users', reducer }),
  injectSaga({ key: 'users', saga }),
  connect(
    createStructuredSelector({
      eosService: selectEos,
      locale: makeSelectLocale(),
      communities: selectCommunities(),
      users: selectors.selectUsers(),
      usersLoading: selectors.selectUsersLoading(),
      limit: selectors.selectLimit(),
      sorting: selectors.selectSorting(),
      searchText: selectors.selectSearchText(),
      isLastFetch: selectors.selectIsLastFetch(),
      stat: selectStat(),
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
