import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as routes from 'routes-config';

import { getQuestionCode, getSectionCode, parseMD } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';

import Content from 'containers/Faq/Content';
import Aside from 'containers/Faq/Aside';

import Header from './Header';
import { SECTION_ID } from './constants';
import termsEn from '../../terms-of-service/en.md';
import termsRu from '../../terms-of-service/ru.md';

const TermsOfService = ({ locale }) => {
  const { t } = useTranslation();
  const terms = parseMD(locale === 'en' ? termsEn : termsRu);

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={t('common.termsOfServiceDesc.title')}
        description={t('common.termsOfServiceDesc.description')}
        language={locale}
        index={false}
      />

      <div className="flex-grow-1">
        <Header />
        <Content
          content={terms}
          route={routes.termsAndConditions}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
          collapsedMenu={false}
        />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={terms}
          route={x => routes.termsAndConditions(getSectionCode(SECTION_ID, x))}
        />
      </AsideBox>
    </div>
  );
};

TermsOfService.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(TermsOfService);
