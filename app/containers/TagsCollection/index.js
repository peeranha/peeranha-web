import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { bindActionCreators } from 'redux';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { redirectToCreateTag } from 'containers/CreateTag/actions';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { createStructuredSelector } from 'reselect';

import messages from './messages';

import Header from './Header';
import List from './List';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

export const TagsCollection = /* istanbul ignore next */ ({
  locale,
  communities,
  communitiesLoading,
  redirectToCreateTagDispatch,
  profile,
}) => {
  const keywords = useMemo(
    () =>
      communities.map((comm) =>
        comm.tags.map((tag) => `${comm.name} ${tag.name}`),
      ),
    [communities],
  );

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        keywords={keywords}
      />

      <Header openTagForm={redirectToCreateTagDispatch} profile={profile} />

      <List communities={communities} />

      {communitiesLoading ? <LoadingIndicator /> : null}
    </div>
  );
};

TagsCollection.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  communitiesLoading: PropTypes.bool,
  redirectToCreateTagDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  communitiesLoading: selectCommunitiesLoading(),
  profile: makeSelectProfileInfo(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    redirectToCreateTagDispatch: bindActionCreators(
      redirectToCreateTag,
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsCollection);
