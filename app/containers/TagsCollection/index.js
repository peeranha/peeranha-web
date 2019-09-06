/**
 *
 * TagsCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { goToCreateTagScreen } from 'containers/Tags';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Banner from 'containers/Tags/Banner';

import { createStructuredSelector } from 'reselect';

import messages from './messages';

import Header from './Header';
import List from './List';

export const TagsCollection = /* istanbul ignore next */ ({
  locale,
  communities,
  communitiesLoading,
  profile,
  showLoginModalDispatch,
}) => {
  const openTagForm = e =>
    goToCreateTagScreen({
      locale,
      showLoginModalDispatch,
      profile,
      buttonId: e.currentTarget.id,
    });

  const keywords = communities.map(comm =>
    comm.tags.map(tag => `${comm.name} ${tag.name}`),
  );

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        keywords={keywords}
      />

      <Header openTagForm={openTagForm} />

      <List communities={communities} />

      <Banner openTagForm={openTagForm} />

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

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsCollection);
