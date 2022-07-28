import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { appLocales } from 'app/i18-old';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import { APP_MAIN_NAME } from 'utils/constants';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import peeranhaFavicon from '!file-loader?name=[name].[ext]!images/favicon.ico';

const styles = singleCommunityStyles();

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

    <meta property="og:type" content="website" />
    <meta property="og:url" content={window.location.href} />
    <meta property="og:site_name" content={APP_MAIN_NAME} />
    <meta property="og:image" content="/logo.png" />
    <meta property="og:locale" content={language} />

    <meta name="twitter:title" property="og:title" content={title} />
    <meta
      name="twitter:description"
      property="og:description"
      content={description}
    />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@peeranhaio" />
    <meta name="twitter:creator" content="@peeranhaio" />
    <meta name="twitter:domain" content={window.location.hostname} />

    <meta httpEquiv="content-language" content={appLocales} />
    <meta property="article:section" content={description} />
    {keywords && <meta property="article:tag" content={keywords} />}

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

    <link
      rel="shortcut icon"
      type="image/x-icon"
      href={styles?.favicon ?? peeranhaFavicon}
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
