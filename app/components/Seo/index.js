import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { appLocales } from 'i18n';

const Seo = ({
  title,
  description,
  keywords,
  language,
  articlePublishedTime,
  articleModifiedTime,
  index,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
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
  articleModifiedTime: PropTypes.instanceOf(Date),
  index: PropTypes.bool,
};

export default React.memo(Seo);
