import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';

import { getSectionCode, getQuestionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';
import Banner from 'components/AskQuestionBanner';

import Header from './Header';
import Content from './Content';
import Aside from './Aside';
import { SECTION_ID } from './constants';

export const Faq = ({ locale, faq }) => {
  const { t } = useTranslation();
  faq.blocks.splice(7, 3);
  faq.blocks.splice(1, 1);
  const faqForDemo = faq;
  const keywords = faq.blocks.map(x => x.blocks.map(y => y.h3));

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={t('common.faqPage.title')}
        description={t('common.faqPage.description')}
        language={locale}
        keywords={keywords}
      />

      <div className="flex-grow-1">
        <Header />
        <Content
          content={faqForDemo}
          route={routes.faq}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
        />
        <Banner />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={faqForDemo}
          route={x => routes.faq(getSectionCode(SECTION_ID, x))}
        />
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
