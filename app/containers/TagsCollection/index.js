import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
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

import Header from './Header';
import List from './List';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

export const TagsCollection = ({
  locale,
  communities,
  communitiesLoading,
  redirectToCreateTagDispatch,
  profile,
}) => {
  const { t } = useTranslation();
  const keywords = useMemo(
    () =>
      communities.map(comm => comm.tags.map(tag => `${comm.name} ${tag.name}`)),
    [communities],
  );

  return (
    <div>
      <Seo
        title={t('tags.tagsCollection')}
        description={t('tags.tagsDescription')}
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

function mapDispatchToProps(dispatch) {
  return {
    redirectToCreateTagDispatch: bindActionCreators(
      redirectToCreateTag,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsCollection);
