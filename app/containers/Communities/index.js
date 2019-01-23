/**
 *
 * Communities
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import LoadingIndicator from 'components/LoadingIndicator';

import { createCommunityValidator } from './validate';
import messages from './messages';

import CommunitiesView from './CommunitiesView';
import CommunitiesHeader from './CommunitiesHeader';

/* eslint-disable react/prefer-stateless-function */
export class Communities extends React.Component {
  /* eslint consistent-return: 0 */
  goToCreateCommunityScreen = () => {
    const { profile, locale } = this.props;

    if (!profile) {
      this.props.showLoginModalDispatch();
      return null;
    }

    const isValid = createCommunityValidator(
      profile,
      translationMessages[locale],
    );

    if (!isValid) {
      return null;
    }

    createdHistory.push(routes.communities_create());
  };

  render() {
    const { communities, locale } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <CommunitiesHeader
          goToCreateCommunityScreen={this.goToCreateCommunityScreen}
        />

        {communities.length ? (
          <CommunitiesView communities={communities} />
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

Communities.propTypes = {
  communities: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  profile: PropTypes.object,
  showLoginModalDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  profile: makeSelectProfileInfo(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communities);
