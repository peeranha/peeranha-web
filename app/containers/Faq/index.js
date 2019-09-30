/**
 *
 * Faq
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';

import { getSectionCode, getQuestionCode } from 'utils/faqManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';

import messages from './messages';

import Header from './Header';
import Content from './Content';
import Aside from './Aside';
import Banner from './Banner';

export const Faq = /* istanbul ignore next */ ({ locale, faq }) => {
  const translations = translationMessages[locale];
  const keywords = faq.blocks.map(x => x.blocks.map(y => y.h3));

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
        keywords={keywords}
      />

      <div className="flex-grow-1">
        <Header />
        <Content
          content={faq}
          route={routes.appFaq}
          getSectionCode={getSectionCode}
          getQuestionCode={getQuestionCode}
        />
        <Banner />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside content={faq} route={x => routes.appFaq(getSectionCode(x))} />
      </AsideBox>
    </div>
  );
};

Faq.propTypes = {
  locale: PropTypes.string,
  faq: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  faq: selectFaq(),
});

export default connect(
  mapStateToProps,
  null,
)(Faq);
