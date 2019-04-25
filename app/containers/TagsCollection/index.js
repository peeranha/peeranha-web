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

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { createStructuredSelector } from 'reselect';

import messages from './messages';

import View from './View';

const TagsCollection = ({ locale, communities, communitiesLoading }) => (
  <div>
    <Helmet>
      <title>{translationMessages[locale][messages.title.id]}</title>
      <meta
        name="description"
        content={translationMessages[locale][messages.description.id]}
      />
    </Helmet>

    <View communities={communities} />

    {communitiesLoading && <LoadingIndicator />}
  </div>
);

TagsCollection.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  communitiesLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  communitiesLoading: selectCommunitiesLoading(),
});

export default connect(
  mapStateToProps,
  null,
)(TagsCollection);
