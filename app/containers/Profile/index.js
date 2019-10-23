/**
 *
 * Profile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectAccount,
  makeSelectAccountLoading,
} from 'containers/AccountProvider/selectors';

import { getUserProfile } from 'containers/DataCacheProvider/actions';

import {
  selectUsers,
  selectUsersLoading,
} from 'containers/DataCacheProvider/selectors';

import NoSuchUser from './NoSuchUser';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getUserProfileDispatch(this.props.userId, true);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.userId !== this.props.userId) {
      this.props.getUserProfileDispatch(nextProps.userId, true);
    }
  };

  render() {
    const {
      locale,
      children,
      isProfileLoading,
      accountLoading,
      profile,
    } = this.props;

    const HelmetTitle = `${(profile && profile.display_name) ||
      translationMessages[locale][messages.wrongUser.id]} | ${
      translationMessages[locale][messages.profile.id]
    }`;

    let keywords = '';

    if (profile && profile.profile) {
      keywords = Object.values(profile.profile);
    }

    return (
      <div>
        <Seo
          title={HelmetTitle}
          description={
            translationMessages[locale][messages.profileDescription.id]
          }
          language={locale}
          keywords={keywords}
        />

        <div>
          {!isProfileLoading && !accountLoading && !profile && <NoSuchUser />}

          {(isProfileLoading || accountLoading) && <LoadingIndicator />}

          {!isProfileLoading &&
            !accountLoading &&
            profile &&
            profile.profile &&
            children}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.array,
  userId: PropTypes.string,
  profile: PropTypes.object,
  locale: PropTypes.string,
  isProfileLoading: PropTypes.bool,
  accountLoading: PropTypes.bool,
  getUserProfileDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  isProfileLoading: selectUsersLoading(),
  accountLoading: makeSelectAccountLoading(),
  profile: (state, props) => selectUsers(props.userId)(state),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getUserProfileDispatch: bindActionCreators(getUserProfile, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
