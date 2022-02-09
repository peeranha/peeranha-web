/**
 *
 * Tutorial
 *
 */

import React, { memo } from 'react';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';

import { getQuestionCode, getSectionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectTutorial } from 'containers/DataCacheProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';
import Banner from 'components/AskQuestionBanner';

import Content from './Content';
import Aside from './Aside';

import messages from './messages';

import Header from './Header';

export const Tutorial = ({ locale, tutorial }) => {
  const translations = translationMessages[locale];
  const SECTION_ID = 'tutorial-section';

  if (!tutorial) return null;

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
        index={false}
      />

      <div className="flex-grow-1">
        <Header />
        <Content
          content={tutorial}
          route={routes.tutorials}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
        />
        <Banner />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={tutorial}
          route={x => routes.tutorials(getSectionCode(SECTION_ID, x))}
        />
      </AsideBox>
    </div>
  );
};

Tutorial.propTypes = {
  locale: PropTypes.string,
  tutorial: PropTypes.object,
};

export default memo(
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      tutorial: selectTutorial(),
    }),
    null,
  )(Tutorial),
);
