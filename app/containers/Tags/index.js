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

import { createTagValidator } from './validate';
import messages from './messages';

import TagsView from './TagsView';
import TagsHeader from './TagsHeader';

/* eslint-disable react/prefer-stateless-function */
export class Tags extends React.Component {
  /* eslint consistent-return: 0 */
  goToCreateTagScreen = () => {
    const { profile, locale, match } = this.props;

    if (!profile) {
      this.props.showLoginModalDispatch();
      return null;
    }

    const isValid = createTagValidator(profile, translationMessages[locale]);

    if (!isValid) {
      return null;
    }

    createdHistory.push(routes.tagsCreate(match.params.communityid));
  };

  render() {
    const { communities, locale, match } = this.props;
    const { communityid } = match.params;
    const community = communities.length
      ? communities.filter(x => x.id === +communityid)[0]
      : null;

    return (
      <div className="container">
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <TagsHeader
          communityid={communityid}
          goToCreateTagScreen={this.goToCreateTagScreen}
        />

        {community ? <TagsView tags={community.tags} /> : <LoadingIndicator />}
      </div>
    );
  }
}

Tags.propTypes = {
  communities: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  profile: PropTypes.object,
  match: PropTypes.object,
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
)(Tags);
