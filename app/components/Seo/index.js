import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { appLocales } from 'i18n';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { APP_MAIN_IMG, APP_MAIN_NAME } from 'utils/constants';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

const Seo = ({
  title,
  description,
  keywords,
  language,
  articlePublishedTime,
  articleModifiedTime,
  index,
  communityName,
}) => (
  <Helmet>
    <title>{`${communityName}${title} - Peeranha`}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta property="og:url" content={window.location.href} />
    <meta property="og:site_name" content={APP_MAIN_NAME} />
    <meta property="og:image" content={APP_MAIN_IMG} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:locale" content={language} />
    <meta httpEquiv="content-language" content={appLocales} />
    <meta property="article:section" content={description} />
    {keywords && <meta property="article:tag" content={keywords} />}
    <meta property="og:type" content="article" />

    {articlePublishedTime && (
      <meta property="article:published_time" content={articlePublishedTime} />
    )}

    {articleModifiedTime && (
      <meta property="article:modified_time" content={articleModifiedTime} />
    )}

    <meta
      name="robots"
      content={index === false ? 'noindex, nofollow' : 'index, follow'}
    />
  </Helmet>
);

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.array,
  language: PropTypes.string.isRequired,
  articlePublishedTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  articleModifiedTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  index: PropTypes.bool,
  communityName: PropTypes.string,
};

export default React.memo(
  connect(state => {
    const single = isSingleCommunityWebsite();
    const communities = selectCommunities()(state);
    if (!single || !communities.length) {
      return { communityName: '' };
    }

    const { name } = communities.find(({ id }) => id === single);
    return { communityName: `${name} ` };
  })(Seo),
);
