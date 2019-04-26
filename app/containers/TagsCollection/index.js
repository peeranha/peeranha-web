/**
 *
 * TagsCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { translationMessages } from 'i18n';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { goToCreateTagScreen } from 'containers/Tags';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import GoToCreateTagFromBanner from 'containers/Tags/GoToCreateTagFromBanner';

import { createStructuredSelector } from 'reselect';

import messages from './messages';

import Header from './Header';
import List from './List';

const TagsCollection = ({
  locale,
  communities,
  communitiesLoading,
  profile,
  showLoginModalDispatch,
}) => {
  const openTagForm = () =>
    goToCreateTagScreen({ locale, showLoginModalDispatch, profile });

  return (
    <div>
      <Helmet>
        <title>{translationMessages[locale][messages.title.id]}</title>
        <meta
          name="description"
          content={translationMessages[locale][messages.description.id]}
        />
      </Helmet>

      <Header openTagForm={openTagForm} />

      <List communities={communities} />

      <GoToCreateTagFromBanner openTagForm={openTagForm} />

      {communitiesLoading && <LoadingIndicator />}
    </div>
  );
};

TagsCollection.propTypes = {
  locale: PropTypes.string,
  profile: PropTypes.object,
  communities: PropTypes.array,
  communitiesLoading: PropTypes.bool,
  showLoginModalDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  profile: makeSelectProfileInfo(),
  communities: selectCommunities(),
  communitiesLoading: selectCommunitiesLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsCollection);
