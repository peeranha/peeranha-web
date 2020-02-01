import React from 'react';
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

import { UsersFetcher, AccountsSortedBy } from 'utils/profileManagement';

import messages from './messages';

import * as selectors from './selectors';
import { getUsers } from './actions';
import reducer from './reducer';
import saga from './saga';

import View from './View';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

export class Users extends React.PureComponent {
  componentDidMount() {
    this.fetcher = null;
    this.initFetcher();

    if (this.fetcher) {
      this.props.getUsersDispatch({ loadMore: false, fetcher: this.fetcher });
    }
  }

  componentDidUpdate() {
    this.initFetcher();
  }

  initFetcher = (sorting = this.props.sorting) => {
    const { limit, eosService } = this.props;

    if (!this.fetcher && eosService) {
      this.fetcher = new UsersFetcher(
        limit,
        limit,
        AccountsSortedBy[sorting],
        eosService,
      );
    }
  };

  getMoreUsers = () => {
    if (this.fetcher) {
      this.props.getUsersDispatch({ loadMore: true, fetcher: this.fetcher });
    }
  };

  dropdownFilter = sorting => {
    this.fetcher = null;
    this.initFetcher(sorting);

    if (this.fetcher) {
      this.props.getUsersDispatch({ sorting, fetcher: this.fetcher });
    }
  };

  inputFilter = () => {
    //    this.props.getUsersDispatch({ searchText });
  };

  render() /* istanbul ignore next */ {
    const {
      locale,
      users,
      usersLoading,
      sorting,
      searchText,
      isLastFetch,
      stat,
      communities,
    } = this.props;

    const singleCommId = isSingleCommunityWebsite();
    const communityInfo = communities.find(x => x.id === singleCommId);

    const userCount = singleCommId
      ? (communityInfo && communityInfo.users_subscribed) || 0
      : stat.user_count;

    return (
      <>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
        />

        <View
          userCount={userCount}
          getMoreUsers={this.getMoreUsers}
          dropdownFilter={this.dropdownFilter}
          inputFilter={this.inputFilter}
          users={users}
          usersLoading={usersLoading}
          sorting={sorting}
          searchText={searchText}
          isLastFetch={isLastFetch}
          locale={locale}
        />
      </>
    );
  }
}

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
};

const mapStateToProps = createStructuredSelector({
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
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getUsersDispatch: bindActionCreators(getUsers, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Users);
