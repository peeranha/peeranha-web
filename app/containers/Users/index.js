import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import messages from './messages';

import * as selectors from './selectors';
import { getUsers } from './actions';
import reducer from './reducer';
import saga from './saga';

import View from './View';

/* 
 *
 * TODO: @dropdownFilter, @inputFilter - while unavailable for backend 
 * Header: users number, sorting
 * Content: users avatar 
 * 
*/

export class Users extends React.PureComponent {
  componentDidMount() {
    this.props.getUsersDispatch({ loadMore: false });
  }

  getMoreUsers = () => {
    this.props.getUsersDispatch({ loadMore: true });
  };

  dropdownFilter = () => {
    //    this.props.getUsersDispatch({ sorting });
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
    } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <View
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
      </React.Fragment>
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
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  users: selectors.selectUsers(),
  usersLoading: selectors.selectUsersLoading(),
  sorting: selectors.selectSorting(),
  searchText: selectors.selectSearchText(),
  isLastFetch: selectors.selectIsLastFetch(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getUsersDispatch: obj => dispatch(getUsers(obj)),
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
